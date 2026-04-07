# 自动API获取与临时账号工具 Spec

## Why
用户希望工具能够实现真正的“即开即用”，即使不配置任何API Key也能自动寻找并使用国内外的免费API接口。此外，用户可能需要注册一些平台，因此希望内置一个自动生成临时邮箱或电话号码并接收消息的小工具。

## What Changes
- 集成自动获取可用免费API（国内外）的逻辑池或代理池。
- 在工具中增加“临时邮箱/手机号”生成与接收验证码的辅助功能模块。
- 确保全站文案为纯中文。

## Impact
- Affected specs: `free-ai-chat-tool` (核心对话功能增强)
- Affected code:
  - `src/hooks/useChat.ts` (API请求逻辑增强)
  - `src/components/Header.tsx` 或新加侧边栏/弹窗 (入口)
  - `src/components/TempAccountTool.tsx` (新组件)

## ADDED Requirements
### Requirement: 自动获取免费API
系统应当内置或自动拉取一批可用的国内外免费API节点，并在请求时自动轮询/重试。

#### Scenario: 用户直接提问
- **WHEN** 用户未配置任何API Key并发送问题
- **THEN** 系统自动从内置的免费API池中选择一个可用的节点进行请求，并返回AI回答。

### Requirement: 临时邮箱/电话号码生成工具
系统应当提供一个辅助面板或页面，供用户生成临时邮箱/手机号，并能查收收到的验证码/邮件。

#### Scenario: 接收验证码
- **WHEN** 用户打开临时账号工具并点击“生成”
- **THEN** 系统调用公开的临时邮箱/接码API，显示一个临时账号，并提供刷新收件箱的功能。
