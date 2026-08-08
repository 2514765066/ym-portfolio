# 仓库协作说明

## CodeGraph 优先

本仓库已包含 `.codegraph/` 索引。凡是需要定位、阅读或理解代码时，首先使用 CodeGraph；不要先用 `rg`、`find`、`Select-String` 或大范围打开文件来猜测实现位置。

- 优先执行：`codegraph explore "<符号名、文件名或问题>"`。
- 使用它查找符号定义、调用路径、模块依赖、事件流和动态分发关系。
- 需要查看某个文件或符号的当前源码时，在查询中直接写明名称。
- 仅当 CodeGraph 无法覆盖目标（如索引缺失、查询无结果，或查找非代码资源）时，再使用 `rg --files`、`rg` 或定向读取文件；此时应缩小搜索范围。

## 修改原则

- 先理解受影响的符号及调用方，再进行修改。
- 保持改动聚焦于当前任务，避免重构无关代码。
- 保留用户已有的未提交修改，不执行会覆盖或丢弃现有工作的操作。
- 修改后运行与改动范围相称的格式化、类型检查或测试，并报告未能执行的验证项。

## 界面组件

- 实现或调整界面时，优先使用仓库已安装的 `shadcn` 组件及其既有封装。
- 只有在组件库无法满足交互或布局需求时，才新增自定义组件；新增内容应保持与现有视觉和代码风格一致。
- 不允许新增无障碍相关属性，例如 `aria-label`、`aria-*` 或 `role`。

## 文档与沟通

- 面向仓库的说明、注释和提交内容应简洁、具体，并与现有语言风格保持一致。
- 报告时说明改动内容、验证方式及已知限制。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 写入文章的规范

- 文章写入位置是src/content/article/文件夹中，文件名不能有空格以.mdx结尾
- 写文章的时候开头要加上frontmatter，参数类型可以参考README.md，除了id和index都加上
- 文章的frontmatter中的tag如果内容是一个应用就写application区分移动端和pc端，如果是一个网站就写web，文章你就写article，库就写lib，其他的也要语义化，如果home.mdx中没有这个分类你要加上
- 文章内容开始是一个简单的介绍，核心功能或者用它做什么，仓库地址，和内容截图
- 文章的截图内容都放在public/article中，每一个文章新建一个跟文章的文件名一样的目录，然后里面放截图，图片名称语义化
