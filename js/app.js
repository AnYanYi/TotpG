// 工具函数
function getCurrentSeconds() {
  return Math.round(new Date().getTime() / 1000.0);
}

function stripSpaces(str) {
  return str.replace(/\s/g, '');
}

function truncateTo(str, digits) {
  if (str.length <= digits) {
    return str;
  }
  return str.slice(-digits);
}

function parseURLSearch(search) {
  if (!search) return {};
  
  const queryParams = search.substr(1).split('&').reduce(function (q, query) {
    if (!query) return q;
    
    const chunks = query.split('=');
    const key = chunks[0];
    if (!key) return q;
    
    let value = decodeURIComponent(chunks[1] || '');
    value = isNaN(Number(value)) ? value : Number(value);
    return (q[key] = value, q);
  }, {});

  return queryParams;
}

// 错误处理函数
function showError(message) {
  console.error('TOTP 错误:', message);
  // 可以在这里添加用户友好的错误提示
}

// Vue 应用
const app = Vue.createApp({
  data() {
    return {
      secret_key: 'JBSWY3DPEHPK3PXP',
      digits: 6,
      period: 30,
      algorithm: 'SHA1',
      updatingIn: 30,
      token: null,
      clipboardButton: null,
      intervalHandle: null,
      isValidKey: true,
      lastError: null,
    };
  },

  mounted() {
    this.getKeyFromUrl();
    this.getQueryParameters();
    this.update();

    // 每秒更新
    this.intervalHandle = setInterval(this.update, 1000);

    // 初始化剪贴板功能
    try {
      this.clipboardButton = new ClipboardJS('#clipboard-button');
      
      // 添加复制成功/失败的反馈
      this.clipboardButton.on('success', (e) => {
        console.log('验证码已复制到剪贴板');
        e.clearSelection();
      });
      
      this.clipboardButton.on('error', (e) => {
        console.error('复制失败:', e.action);
        showError('复制到剪贴板失败');
      });
    } catch (error) {
      showError('初始化剪贴板功能失败: ' + error.message);
    }
  },

  // Vue 3 中使用 beforeUnmount 替代 destroyed
  beforeUnmount() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
    
    if (this.clipboardButton) {
      this.clipboardButton.destroy();
    }
  },

  computed: {
    totp() {
      try {
        if (!this.secret_key || this.secret_key.trim() === '') {
          this.isValidKey = false;
          return null;
        }

        const cleanKey = stripSpaces(this.secret_key.toUpperCase());
        
        // 验证 Base32 格式
        if (!/^[A-Z2-7]+=*$/.test(cleanKey)) {
          this.isValidKey = false;
          this.lastError = '密钥格式无效，请使用 Base32 格式';
          return null;
        }

        this.isValidKey = true;
        this.lastError = null;

        return new OTPAuth.TOTP({
          algorithm: this.algorithm,
          digits: parseInt(this.digits),
          period: parseInt(this.period),
          secret: OTPAuth.Secret.fromBase32(cleanKey),
        });
      } catch (error) {
        this.isValidKey = false;
        this.lastError = '生成 TOTP 对象失败: ' + error.message;
        showError(this.lastError);
        return null;
      }
    }
  },

  methods: {
    update() {
      try {
        this.updatingIn = this.period - (getCurrentSeconds() % this.period);
        
        if (this.totp && this.isValidKey) {
          this.token = truncateTo(this.totp.generate(), this.digits);
        } else {
          this.token = null;
        }
      } catch (error) {
        this.lastError = '更新验证码失败: ' + error.message;
        showError(this.lastError);
        this.token = null;
      }
    },

    getKeyFromUrl() {
      try {
        const key = document.location.hash.replace(/[#\/]+/, '');
        if (key.length > 0) {
          this.secret_key = decodeURIComponent(key);
        }
      } catch (error) {
        showError('从 URL 获取密钥失败: ' + error.message);
      }
    },

    getQueryParameters() {
      try {
        const queryParams = parseURLSearch(window.location.search);

        if (queryParams.key) {
          this.secret_key = queryParams.key;
        }

        if (queryParams.digits && queryParams.digits >= 4 && queryParams.digits <= 10) {
          this.digits = parseInt(queryParams.digits);
        }

        if (queryParams.period && queryParams.period >= 15 && queryParams.period <= 300) {
          this.period = parseInt(queryParams.period);
        }

        if (queryParams.algorithm && ['SHA1', 'SHA256', 'SHA512'].includes(queryParams.algorithm)) {
          this.algorithm = queryParams.algorithm;
        }
      } catch (error) {
        showError('解析 URL 参数失败: ' + error.message);
      }
    },

    // 新增：手动刷新验证码
    refreshToken() {
      this.update();
    },

    // 新增：清空密钥
    clearKey() {
      this.secret_key = '';
      this.token = null;
      this.isValidKey = true;
      this.lastError = null;
    }
  },

  // 监听器：当关键参数改变时重新生成
  watch: {
    secret_key() {
      this.update();
    },
    digits() {
      this.update();
    },
    period() {
      this.update();
    },
    algorithm() {
      this.update();
    }
  }
});

app.mount('#app');