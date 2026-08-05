# YM Portfolio

## Cloudflare Pages 部署

本项目使用 Next.js 静态导出。Markdown 文章只会在 Cloudflare Pages 的构建阶段从仓库读取，线上访问时由 Cloudflare CDN 提供已生成的静态文件，不依赖运行时文件系统或数据库。

在 Cloudflare Dashboard 中创建 Pages 项目并连接 GitHub 仓库，使用以下设置：

| 配置项       | 值              |
| ------------ | --------------- |
| 生产分支     | `main`          |
| 构建命令     | `npm run build` |
| 构建输出目录 | `out`           |

推送到 `main` 会自动发布到生产环境；拉取请求会生成预览部署。

## 发布文章

1. 在 `public/article/<slug>/` 新建或编辑 `index.md`。
2. 使用以下 Frontmatter：

```md
---
title: 文章标题
description: 文章简介
tag: article
img: /article/<slug>/assets/example-cover.webp
updateTime: 2026-08-05
---

这里是 Markdown 正文。
```

3. 将该文章的图片、附件等资源放入 `public/article/<slug>/assets/`。Markdown 正文可使用相对路径 `./assets/example-image.webp`；首页卡片封面继续使用 Frontmatter 中的站内绝对路径。
4. 提交并推送到 `main`。Cloudflare Pages 构建成功后，文章会在首页出现，并发布到 `/article/<slug>/`。

`updateTime` 必须是可被 JavaScript 解析的有效日期；首页按该日期倒序排列。文章提交即公开，V1 不支持草稿、定时发布或网页后台编辑。
