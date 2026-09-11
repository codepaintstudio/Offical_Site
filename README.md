# 码绘工作室官网

基于 React、TypeScript、Vite、Tailwind CSS 和 GSAP 的静态官网。

## 本地开发

安装 Bun 后，在仓库根目录执行：

```sh
bun install --frozen-lockfile
bun run dev
```

开发地址：http://localhost:5173。

## 检查与构建

```sh
bun run typecheck
bun run build
bun run preview
```

部署时将 `apps/public-web/dist` 作为静态网站发布目录。

## 内容维护

- 页面与动画：`apps/public-web/src/scenes/`
- 团队、项目、导师、成果及报名邮箱：`apps/public-web/src/data/content.ts`
- 全局样式：`apps/public-web/src/index.css`

报名入口通过邮件客户端发送申请，网站无需后端、数据库或环境变量。
