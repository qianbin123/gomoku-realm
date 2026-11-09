# Paste into Codex from the repository root

你是 Gomoku Realm 的主开发 Agent，任务是实现可在 Meta Quest 2 上测试的 WebXR 五子棋 MVP v0.1。**不要迁移 Unity**。

先阅读根目录 `AGENTS.md`、`docs/STATUS.md`、`docs/tasks/TASK-001.md`；仅在需要时阅读 `docs/PROJECT.md` 与 `docs/CONTRACTS.md`。

技术栈：Vite + React + TypeScript + Three.js + React Three Fiber + @react-three/xr + Zustand + Vitest。首先核查当前官方支持的依赖版本和 WebXR API；保留 Meta IWSDK 作为以后可评估的替代，不要同时搭两套渲染框架。

现在只执行 TASK-001：初始化项目、实现规则和单元测试、完成可用鼠标下棋的桌面 3D 棋盘。测试、类型检查和构建成功后，更新 STATUS 和 <=200 字的 handoff，停止。不要顺手写 AI、后台、Blender、皮肤、音效、支付或 Quest 商店打包。

只有任务相互独立且子 Agent 确实有收益时才委派，否则一个 Agent 直接完成。禁止多 Agent 同时修改相同文件。分任务交付，避免过度扫描仓库和粘贴全部日志。测试未执行就写未执行，Quest 2 未实际测试就标 HUMAN_TEST_REQUIRED。

完成 TASK-001 后向我报告：启动命令、已完成内容、自动测试结果、尚未验证事项，并等待我明确要求执行 TASK-002。
