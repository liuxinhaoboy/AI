# Tasks
- [x] Task 1: 项目初始化
  - [x] SubTask 1.1: 使用 Vite 创建 React + TypeScript 项目
  - [x] SubTask 1.2: 安装 Tailwind CSS 及相关依赖 (react-markdown, lucide-react等)
  - [x] SubTask 1.3: 配置基础样式和全局变量

- [x] Task 2: 核心 UI 组件开发
  - [x] SubTask 2.1: 开发顶部导航栏 (包含应用名称和主题切换)
  - [x] SubTask 2.2: 开发消息气泡组件 (区分 User 和 Assistant，集成 Markdown 渲染)
  - [x] SubTask 2.3: 开发底部输入区组件 (支持多行输入、自适应高度和发送按钮)

- [x] Task 3: 状态管理与数据持久化
  - [x] SubTask 3.1: 创建自定义 Hook (useChat) 管理对话历史记录
  - [x] SubTask 3.2: 实现与 localStorage 的同步保存

- [x] Task 4: API 接口集成
  - [x] SubTask 4.1: 封装调用免登录大模型 API 的请求逻辑
  - [x] SubTask 4.2: 实现流式/非流式响应的解析并更新对话状态

- [x] Task 5: 优化与测试
  - [x] SubTask 5.1: 处理移动端和桌面端的响应式适配
  - [x] SubTask 5.2: 增加错误处理和加载状态动画

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]