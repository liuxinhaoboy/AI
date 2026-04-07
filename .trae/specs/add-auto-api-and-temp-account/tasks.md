# Tasks
- [x] Task 1: 自动API池集成
  - [x] SubTask 1.1: 在项目中维护一个可用免费大模型API池（包含国内外接口，如无key可用的公益API代理）。
  - [x] SubTask 1.2: 修改 `useChat.ts` 请求逻辑，支持在未配置自定义API时，自动从API池中随机选择或轮询调用，加入失败自动重试机制。

- [x] Task 2: 临时邮箱/手机号工具开发
  - [x] SubTask 2.1: 调研并接入可用的免费临时邮箱或接码API（如 1secmail 等开源/免费接口）。
  - [x] SubTask 2.2: 开发临时账号工具面板组件，提供生成临时邮箱/手机号的 UI。
  - [x] SubTask 2.3: 在该组件中实现定时刷新或手动刷新收件箱/短信列表的功能，展示接收到的内容。

- [x] Task 3: 界面集成与中文优化
  - [x] SubTask 3.1: 在顶部导航栏或页面显眼位置添加“临时账号工具”的入口。
  - [x] SubTask 3.2: 检查全站提示语，确保所有的 UI 文案和错误提示均为中文。

# Task Dependencies
- [Task 3] depends on [Task 2]