# 王金龙 · AI 应用开发工程师 作品集

> 用技术解决真实问题，让 AI 更好地服务每一个普通人。

一个面向 AI 应用工程师（王金龙）的个人作品集网站，集中展示其在 **RAG、Agent 编排、大模型微调与后端架构** 方向的项目经历与技术能力。站点采用单页滚动叙事结构，辅以大量精心打磨的交互动效（WebGL 流体光标、文字碎裂、3D 名片、滚动浮动标题等），强调「从模型能力到业务价值」的工程落地主张。

---

## 技术栈

| 类别 | 选型                                                 |
| ---- | ---------------------------------------------------- |
| 框架 | React 19.1                                           |
| 构建 | Vite 6.1 + `@vitejs/plugin-react`                    |
| 样式 | Tailwind CSS 4（`@tailwindcss/vite`）                |
| 动画 | framer-motion 12、GSAP 3.15（含 ScrollTrigger）      |
| 图形 | WebGL2（流体光标 / 高光按钮）、Canvas 2D（模糊文字） |
| 图标 | lucide-react                                         |
| 字体 | MrBedfort（手写签名字体）                            |

> GSAP 被拆为独立 chunk，在滚动标题接近视口时才请求；项目弹窗、碎裂标题和流体光标也采用按需加载。

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发（监听 127.0.0.1）
pnpm dev

# 生产构建（自动生成 404.html）
pnpm build

# 本地预览构建产物
pnpm preview
```

---

## 资源加载与运行性能

已完成图片、字体和首屏脚本优化，原始 PNG 与上传字体保留，可重复生成。

| 指标 | 优化前 | 优化后 | 减少 |
| --- | ---: | ---: | ---: |
| 两张使用中的人物图（原尺寸） | 2,251,215 B | 121,060 B | 94.6% |
| WJL 字体 | 37,252 B | 1,760 B | 95.3% |
| 同步入口 JS（含静态依赖） | 579,048 B | 456,919 B | 21.1% |
| 同步入口 JS 的 gzip 估算 | 195,744 B | 148,106 B | 24.3% |

- Hero 提供 480 / 800 / 1085px WebP，About 提供 480 / 882px WebP；设置尺寸、`srcSet`、`sizes` 和异步解码。Hero 使用与图片完全相同的响应式 preload，避免重复请求；About 继续懒加载。
- `ScrollFloat.jsx` 保留完整文字和原布局，接近视口时加载 `scrollMotionRuntime.js` 与 GSAP。多个标题共用一个布局观察器，刷新在滚动结束后执行，避免打断原生锚点跳转。
- 项目区接近视口或卡片聚焦/悬停时预取弹窗代码；联系标题接近视口时加载碎裂效果。网络失败由边界处理，保留页面主体和可读文字。
- 导航、按钮的 GPU 初始化延迟到页面资源加载后的空闲时段；流体引擎在首次有效鼠标操作后加载。既有动画参数保持不变。
- 滚动位置状态集中在 `PageNavigation`，Navbar 使用 memo，避免全页组件随滚动进度重复渲染。

复查命令：

```bash
npm run build
npm run check:performance
# 重新生成静态资源（开发机需有 cwebp 与 fonttools/pyftsubset）：
npm run assets:images
npm run assets:font
```

`performance-results.json` 保存体积对比与预算检查结果。`performance-network-check.json` 保存生产构建的冷启动请求与可选脚本失败回退验证：初始仅一个主 JS，请求中不包含 GSAP、弹窗、碎裂标题或流体引擎，Hero 图仅请求一次。

这些是文件体积与本地请求验证结果，未当作 Lighthouse 分数或线上加载时间。部署后的 Brotli/gzip、缓存响应头与实际网络速度需在对应托管平台验证。

---

## 页面结构

整站为单页应用，包含 5 个滚动分区，由侧边 `SectionRail` 实时指示当前位置：

| 序号 | 分区                    | 说明                                                    |
| ---- | ----------------------- | ------------------------------------------------------- |
| 01   | **首页 Hero**           | 卡通形象、闪光姓名/职位标题、CTA 按钮、社交链接、特性栏 |
| 02   | **关于我 About**        | 3D 倾斜名片、个人简介、三项核心指标数据                 |
| 03   | **项目经历 Projects**   | 4 个代表项目卡片，点击居中弹窗查看介绍、架构与成果                |
| 04   | **技能栈 Capabilities** | 6 类能力（Agent / RAG / 模型 / 后端 / 架构 / 音视频）               |
| 05   | **联系方式 Footer**     | 碎裂标题动效、邮箱链接、回到顶部                        |

非首页路径（如 `/xxx`）会渲染懒加载的 `NotFound` 404 页面。

---

## 目录结构

```
portfolio/
├── index.html                      # HTML 入口：标题、meta、字体预加载、#root 挂载点
├── package.json                    # 依赖与脚本（dev/build/preview）
├── package-lock.json               # 依赖锁定
├── vite.config.js                  # Vite 配置：React + Tailwind 插件、gsap 分块
├── .gitignore                      # 忽略 node_modules、dist、.DS_Store
├── layout-interactions-preview.png # 布局与交互预览参考图
│
├── src/
│   ├── main.jsx                    # React 入口：createRoot 渲染 <App />，引入全局样式
│   ├── App.jsx                     # 根组件：主页 / 404 路由分发、组合所有分区
│   ├── data.js                     # 数据源：个人信息 profile、项目列表 projects、能力列表 capabilities
│   ├── navigation.js               # 导航配置：5 个分区的 id 与中英文标签
│   ├── style.css                   # 全局样式（Tailwind 基础 + 自定义工具类）
│   │
│   ├── hooks/
│   │   └── usePagePosition.js      # 滚动位置 Hook：计算当前分区索引与页面滚动进度
│   │
│   └── components/
│       ├── Navbar.jsx              # 顶部导航栏：Logo、分区锚点、下载简历、移动端汉堡菜单
│       ├── Hero.jsx                # 首页英雄区：形象、闪光标题、CTA、社交链接、特性栏
│       ├── About.jsx               # 关于我：3D 名片 + 简介 + 核心指标
│       ├── Projects.jsx            # 项目展示：整卡点击网格 + 原生详情弹窗
│       ├── Capabilities.jsx        # 技能栈：六类能力，桌面网格 / 手机横滑
│       ├── Footer.jsx              # 页脚：碎裂标题、邮箱、版权、回到顶部
│       ├── NotFound.jsx            # 404 页面：模糊 404 文字、返回首页/上一页
│       ├── SectionRail.jsx         # 侧边滚动指示：当前分区、进度滑块、快捷跳转
│       ├── BrandLogo.jsx           # 品牌 Logo 组件（WJL）
│       ├── InteractiveSurface.jsx  # 鼠标跟随高光容器（装饰性 pointer light）
│       │
│       ├── Reveal.jsx              # 滚动进入视口动画包装器（framer-motion）
│       ├── ScrollFloat.jsx         # 滚动驱动的逐字浮动标题（GSAP ScrollTrigger）
│       ├── ScrollFloat.css         # ScrollFloat 配套样式
│       ├── ShinyText.jsx           # 循环闪光文字效果（背景渐变动画）
│       ├── FuzzyText.jsx           # Canvas 模糊抖动文字效果（404 页使用）
│       ├── ShatterHeadline.jsx     # 可点击碎裂并重组的标题（framer-motion + clip-path）
│       ├── ShatterHeadline.css     # ShatterHeadline 配套样式
│       ├── shatterGeometry.js      # 碎裂碎片几何数据生成（种子化三角网格）
│       ├── ProfileCard.jsx         # 3D 倾斜个人名片（弹簧物理 + 眩光）
│       ├── ProfileCard.css         # ProfileCard 配套样式
│       ├── SpecularButton.jsx      # WebGL 高光描边按钮（鼠标跟随光斑）
│       ├── SpecularButton.css      # SpecularButton 配套样式
│       ├── SplashCursor.jsx        # 流体光标懒加载入口（按需启用 WebGL 引擎）
│       └── SplashCursorEngine.jsx  # WebGL2 流体模拟光标引擎（适配自 React Bits）
│
├── public/                         # 静态资源（原样复制到 dist 根目录）
│   ├── favicon.svg
│   ├── jinlong-wang-resume.pdf     # 可下载的简历 PDF
│   ├── fonts/
│   │   └── MrBedfort-Regular.ttf   # 手写签名字体
│   └── images/
│       ├── portrait.png            # 原始肖像
│       ├── portrait-illustration.png  # 肖像插画版
│       ├── portrait-cutout.png     # Hero 区抠图形象
│       ├── profile-portrait-front.png # About 名片用正面形象
│       ├── hero-poster.webp        # Hero 视频封面
│       ├── hero-motion.mp4         # Hero 3D 旋转动画背景视频
│       ├── project-mcp.svg         # 项目概念封面：多 Agent 共享服务集群
│       ├── project-voice.svg       # 项目概念封面：AI 实时语音对话客服
│       ├── project-content.svg     # 项目概念封面：自媒体内容运营 Agent
│       └── project-clips.svg       # 项目概念封面：AI 直播切片 Agent
│
├── scripts/                        # 构建与资源生成脚本
│   ├── create-404.mjs              # 构建后将 dist/index.html 复制为 dist/404.html
│   ├── generate_visuals.py         # 用 numpy + ffmpeg 生成 Hero 3D 动画视频与封面
│   └── generate_covers.py          # 生成 4 个项目概念 SVG 封面图
│
└── dist/                           # 生产构建产物（.gitignore 已忽略）
    ├── index.html
    ├── 404.html
    ├── assets/                     # JS/CSS chunk（含 gsap 独立 chunk）
    ├── fonts/
    └── images/
```

---

## 核心模块说明

### 应用入口与路由

- **`src/main.jsx`** — React 挂载入口，引入全局 `style.css`。
- **`src/App.jsx`** — 根据 `window.location.pathname` 判断是否为首页：
  - 首页渲染 `PortfolioPage`，组合 Navbar / SectionRail / Hero / About / Projects / Capabilities / Footer / SplashCursor，并用 `MotionConfig reducedMotion="user"` 全局尊重用户的减少动效偏好。
  - 非首页懒加载 `NotFound` 组件。

### 数据与导航

- **`src/data.js`** — 集中维护 `profile`（姓名、邮箱、GitHub、博客、肖像、简介）、`projects`（4 个项目的名称、分类、描述、技术标签、架构要点）、`capabilities`（4 项能力的图标、标题、描述）。
- **`src/navigation.js`** — 定义 5 个分区的 `id` / `label` / `shortLabel`，供 Navbar 与 SectionRail 共享。

### 交互 Hook

- **`src/hooks/usePagePosition.js`** — 监听 `scroll` / `resize` / `ResizeObserver`，通过 `requestAnimationFrame` 节流计算：
  - `activeIndex`：当前可视分区索引
  - `progress`：整页滚动进度百分比（0–100）

### 主要分区组件

| 组件               | 职责                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| `Navbar.jsx`       | 顶部导航，含品牌 Logo、分区锚点、下载简历按钮；移动端支持汉堡菜单与 Esc 关闭           |
| `Hero.jsx`         | 首屏：卡通形象 + `ShinyText` 闪光标题 + `SpecularButton` CTA + 社交链接 + 4 项特性卡片 |
| `About.jsx`        | 个人介绍：`ProfileCard` 3D 名片 + 简介 + 3 项量化指标（可跳转到对应项目）              |
| `Projects.jsx`     | 项目网格：整卡点击打开 `ProjectDialog`，由 `AnimatePresence` 管理弹窗进入与退出          |
| `Capabilities.jsx` | 6 类能力与技术标签，每张关联到对应项目；桌面三列两行、平板两列、手机手动横滑                                                |
| `Footer.jsx`       | 联系区：`ShatterHeadline` 碎裂标题 + 邮箱 + 版权 + 回到顶部                            |
| `NotFound.jsx`     | 404 页：`FuzzyText` 渲染 404，提供返回首页/上一页                                      |

### 技能分类与响应式展示

`Capabilities.jsx` 使用 `data.js` 中的六类能力数据：Agent 与工作流、RAG 与检索、模型训练与推理、后端与数据、服务架构与部署、前端与音视频。每张卡片展示一句能力说明、已有技术标签及相关项目入口；模型类链接明确指向推理优化项目。

- 桌面（≥1024px）三列两行，平板（768–1023px）两列，手机（<768px）使用原生横向滚动与 CSS Scroll Snap。
- 六个分类入口始终可见。桌面使用原生锚点定位；手机仅滚动卡片轨道，支持左右按钮和实时位置指示，无自动播放。
- 手机轨道支持方向键与 Home / End，按钮在首尾禁用；滚动和尺寸变化通过 rAF 节流同步当前卡片。
- 卡片进入视口时淡入；减少动效设置下静态展示，分类切换立即定位。区域样式位于 `Capabilities.css`。

### 项目卡片与详情弹窗

- `Projects.jsx`：两列项目卡片，以简介和成果为主；首次进入视口 25% 时从下方 24px 淡入，同排错开 100ms。
- `ProjectVisual.jsx`：四种 SVG 概念示意（共享服务、检索链路、内容工作流、视频切片），明确标注并非实际产品截图。
- `ProjectDialog.jsx`：使用原生 `<dialog>.showModal()` 进入浏览器顶层，确保导航与鼠标墨水位于遮罩下方。面板最大宽度 1040px，详情内部滚动，手机端改为单列。
- 支持关闭按钮、遮罩点击和 Esc；Tab / Shift+Tab 在弹窗内循环。打开时锁定背景滚动，关闭退出动画完成后恢复焦点和原滚动位置。
- `Projects.css` 管理该区域样式，`data.js` 维护简介、关键实现、成果与技术栈。原来的 `project-*` 锚点保留，其他模块仍可跳转到对应卡片。

### 桌面导航动效

顶部五个分区使用适配自 React Bits 的 `GooeyNav.tsx`：白底、黑色胶囊、白色选中文字，无外框。点击使用 5 个液滴、16px 扩散、420ms 的聚合过渡；正常滚动切换分区时仅平滑移动胶囊。点击较远分区时，会暂时保持目标选中态，避免滚动途中反复触发动效；手动滚动或滚动完成会恢复位置同步。

原生锚点、键盘操作和 `aria-current="location"` 保留。手机端继续使用折叠菜单；减少动效或 WebGL2 不可用时显示普通选中胶囊。动效空闲时停止逐帧渲染，页面隐藏时停止动画，WebGL 上下文丢失时回退。

### 动效与视觉组件

| 组件                                          | 技术                          | 效果                                             |
| --------------------------------------------- | ----------------------------- | ------------------------------------------------ |
| `Reveal.jsx`                                  | framer-motion `whileInView`   | 元素进入视口时上移淡入                           |
| `ScrollFloat.jsx`                             | GSAP + ScrollTrigger          | 逐字随滚动上浮显现，支持中文断行标点处理         |
| `ShinyText.jsx`                               | CSS 渐变 + rAF                | 文字表面循环扫光，支持鼠标跟随                   |
| `FuzzyText.jsx`                               | Canvas 2D                     | 文字逐行抖动模糊（404 页）                       |
| `ShatterHeadline.jsx` + `shatterGeometry.js`  | framer-motion + CSS clip-path | 标题碎裂为三角碎片并重组，支持鼠标吸引与点击击碎 |
| `ProfileCard.jsx`                             | 弹簧物理 + CSS 变量           | 3D 倾斜名片、眩光随鼠标移动、入场动画            |
| `SpecularButton.jsx`                          | WebGL2                        | 按钮边缘高光光斑随鼠标环绕                       |
| `SplashCursor.jsx` + `SplashCursorEngine.jsx` | WebGL2 流体模拟               | 桌面端鼠标流体墨水拖尾，带点击溅射               |
| `InteractiveSurface.jsx`                      | CSS 变量 + pointermove        | 卡片表面跟随鼠标的局部高光                       |

> 所有动效均通过 `prefers-reduced-motion` 媒体查询做了降级处理，尊重无障碍偏好。

### 资源生成脚本

- **`scripts/generate_visuals.py`** — 使用 numpy 计算带噪声的 3D 环面，逐帧渲染后通过 ffmpeg 编码为 `hero-motion.mp4`，首帧导出为 `hero-poster.webp`。
- **`scripts/generate_covers.py`** — 程序化生成 4 个项目的概念 SVG 封面（`project-mcp/voice/content/clips.svg`），包含渐变、阴影、文字排版。
- **`scripts/create-404.mjs`** — 在 `vite build` 之后执行，将 `dist/index.html` 复制为 `dist/404.html`，以便静态托管服务对未知路径返回 SPA 入口并呈现 404 视图。

### 静态资源

- **`public/fonts/MrBedfort-Regular.ttf`** — Hero 区手写签名字体（`Wang Jinlong`）。
- **`public/images/`** — 肖像插画（多个版本适配不同场景）、Hero 视频及封面、4 个项目概念图。
- **`public/jinlong-wang-resume.pdf`** — 导航栏与 Hero 区「下载简历」按钮的目标文件。

---

## 构建产物

`pnpm build` 会：

1. 由 Vite 打包 JS/CSS 到 `dist/assets/`，其中 gsap 相关代码拆为独立 chunk。
2. 将 `public/` 下的静态资源原样复制到 `dist/`。
3. 执行 `scripts/create-404.mjs` 生成 `dist/404.html`。

---

## 作者

王金龙 · AI Application Engineer

- GitHub: [adventurer002](https://github.com/adventurer002)
- Blog: [rffj.top](https://rffj.top)
- Email: Dh20020327@163.com
