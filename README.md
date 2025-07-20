# 🔐 TOTP 验证码生成器

一个基于 Web 的时间一次性密码（TOTP）验证码生成器，支持双因素认证（2FA）。所有计算都在客户端本地完成，确保您的密钥安全性。

> **项目说明**：本项目基于 [jaden/totp-generator](https://github.com/jaden/totp-generator) 进行了界面美化和功能改进，采用了现代化的设计风格和更好的用户体验。

## ✨ 特性

### 🆕 本版本改进
- 🎨 **现代化界面**：重新设计的美观界面，采用渐变背景和毛玻璃效果
- � **响应式设计**：完美适配移动端和桌面端
- 🔄 **进度条显示**：实时显示验证码剩余有效时间
- 🛡️ **错误处理**：完善的错误提示和异常处理机制
- 🌟 **动效优化**：流畅的交互动效和视觉反馈

### 核心功能
- �🔒 **本地安全**：所有 TOTP 计算都在浏览器本地完成，密钥不会上传到任何服务器
- ⏰ **实时更新**：验证码每秒自动更新，显示剩余有效时间
- 📋 **一键复制**：点击复制按钮快速将验证码复制到剪贴板
- ⚙️ **灵活配置**：支持自定义验证码位数、更新周期和算法
- 🔗 **URL 参数**：支持通过 URL 参数传递配置，方便分享和预设
- 🌐 **离线使用**：纯静态页面，可离线使用

## 🚀 在线使用

1. 访问在线版本：[GitHub Pages](https://tbbbk.com)
2. 输入您的 Base32 格式密钥
3. 验证码将自动生成并每 30 秒更新一次
4. 点击复制按钮将验证码复制到剪贴板

## 🔧 配置参数

### 表单配置
- **密钥 (Secret Key)**：Base32 格式的密钥字符串
- **验证码位数**：验证码长度，通常为 6 位
- **更新周期**：验证码更新间隔，通常为 30 秒

### URL 参数配置
您可以通过 URL 参数预设配置：

```
https://example.com/index.html?key=YOUR_SECRET&digits=6&period=30&algorithm=SHA1
```

支持的参数：
- `key`：Base32 格式的密钥
- `digits`：验证码位数（4-10）
- `period`：更新周期（15-300秒）
- `algorithm`：哈希算法（SHA1/SHA256/SHA512）

### Hash 参数
也可以将密钥放在 URL 的 hash 部分：
```
https://example.com/index.html#YOUR_SECRET_KEY
```

## 🛠️ 技术栈

- **前端框架**：Vue 3
- **CSS 框架**：Bulma 0.9.4
- **图标**：Font Awesome 6.0
- **TOTP 库**：OTPAuth 9.1.3
- **剪贴板**：ClipboardJS 2.0.6

## 📁 项目结构

```
TotpG/
├── index.html              # 主页面
├── css/
│   └── bulma-0.9.4.min.css # CSS 框架
├── js/
│   ├── app.js              # 主要应用逻辑
│   └── assets/             # 第三方库
│       ├── vue-3.4.20.global.prod.js
│       ├── otpauth-9.1.3.min.js
│       └── clipboard-2.0.6.min.js
├── img/
│   └── clippy.svg          # 复制按钮图标
└── favicon.ico
```

## 🔒 安全说明

- ✅ 所有 TOTP 计算都在客户端执行
- ✅ 密钥不会发送到任何远程服务器
- ✅ 支持离线使用
- ✅ 开源代码，可自行审查
- ⚠️ 请妥善保管您的密钥
- ⚠️ 建议在私密环境中使用

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢 [jaden/totp-generator](https://github.com/jaden/totp-generator) 提供的原始项目
- 感谢 [OTPAuth](https://github.com/hectorm/otpauth) 提供的 TOTP 实现
- 感谢 [Bulma](https://bulma.io/) 提供的 CSS 框架
- 感谢 [Vue.js](https://vuejs.org/) 提供的前端框架


## ❓ 常见问题

### Q: 如何获得密钥？
A: 密钥通常由支持 2FA 的服务提供，如 Google、GitHub、Steam 等。在设置两因素认证时会显示一个二维码，扫描后可以看到密钥字符串。

### Q: 密钥格式是什么？
A: 密钥应该是 Base32 格式，通常包含字母 A-Z 和数字 2-7，长度通常为 16 或 32 个字符。

### Q: 为什么验证码不正确？
A: 请检查：
1. 密钥是否正确（Base32 格式）
2. 系统时间是否准确
3. 验证码位数是否与服务要求一致
4. 更新周期是否正确（通常为 30 秒）

### Q: 可以同时管理多个账户吗？
A: 目前版本一次只能显示一个账户的验证码。您可以通过书签保存不同的 URL 参数来快速切换。

---

⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！
