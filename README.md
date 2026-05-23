# Wiles's Base

个人作品集单页网站，用于展示简介、技能栈、项目与联系方式。

## 特性

- 单页布局：首页、关于我、技能、项目、联系方式
- 首屏逐字淡入与区块滚动触发动画（`useIntersectionObserver`）
- 技能按前端 / 后端 / 工具分类筛选
- 项目卡片展示技术栈与 GitHub 外链
- 联系方式支持一键复制邮箱

## 技术栈

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 7
- [Tailwind CSS](https://tailwindcss.com/) 3

## 快速开始

需要 Node.js 18+（建议 20+）。

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:5173）
npm run dev

# 类型检查并构建
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

构建输出目录为 `dist/`，可部署到任意静态托管服务（如 GitHub Pages、Vercel、Netlify）。

## 项目结构

```
├── public/                 # 静态资源（favicon、项目封面等）
├── src/
│   ├── components/         # 页面区块组件
│   ├── data/
│   │   ├── projects.ts     # 项目列表数据
│   │   └── skills.ts       # 技能列表数据
│   ├── hooks/
│   │   └── useIntersectionObserver.ts  # 滚动进入/离开动画
│   ├── assets/             # 图标、头像等
│   ├── index.css           # Tailwind 与自定义动画
│   └── App.tsx             # 页面组装与平滑滚动
└── docs/plans/             # 滚动动画等设计说明
```

## 自定义内容

### 项目

编辑 `src/data/projects.ts`，按 `Project` 类型增删条目：

| 字段 | 说明 |
|------|------|
| `title` | 项目名称 |
| `description` | 简短描述 |
| `techStack` | 技术标签数组 |
| `imageUrl` | 封面图路径（建议放在 `public/projects/`） |
| `link` | GitHub 或项目地址 |

### 技能

编辑 `src/data/skills.ts`。展示顺序可在 `src/components/Skills.tsx` 的 `skillOrder` 中调整；图标映射在同文件的 `skillIcons`。

### 其他资源

- 关于页头像：`src/assets/about/profile.jpg`
- 简历下载：将 PDF 放到 `public/resume.pdf`（About 区块「下载 PDF 简介」链接）

## 环境要求

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器，支持 HMR |
| `npm run build` | `tsc -b` + `vite build` |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | ESLint 检查 |

## 相关链接

- GitHub：[@DevWiles](https://github.com/DevWiles)

## License

私有项目（`package.json` 中 `"private": true`）。如需开源，请自行补充许可证文件。
