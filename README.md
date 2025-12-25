# VisionStyle AI - 图片风格转换工具

这是一个基于 React 和 Google Gemini AI 的图片风格转换应用。用户可以上传图片并选择不同的艺术风格（如赛博朋克、吉卜力动画、油画等）进行转换。

## 🛠️ 项目设置与安装

### 1. 克隆项目
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. 安装依赖
本项目使用 npm 进行包管理。
```bash
npm install
```

### 3. 环境配置
在根目录创建 `.env` 文件，并添加你的 Gemini API Key：
```env
VITE_GEMINI_API_KEY=your_api_key_here
```
你可以参考 `.env.example` 文件。

## 🚀 运行项目

### 开发模式
启动本地开发服务器：
```bash
npm run dev
```
访问 `http://localhost:5173` 查看效果。

### 代码检查
运行代码风格和类型检查：
```bash
npm run check
```

### 构建生产版本
构建用于生产环境的静态文件：
```bash
npm run build
```
构建产物将位于 `dist` 目录。

## 📦 自动部署 (GitHub Actions)

本项目已配置 GitHub Actions 自动部署流程。

1. **触发条件**：
   - 当代码推送到 `main` 或 `master` 分支时，自动触发构建和部署。

2. **Secrets 配置 (关键)**：
   - 为了在 GitHub Actions 构建过程中能够使用 Gemini API，你需要配置 GitHub Secrets。
   - 进入 GitHub 仓库页面。
   - 点击 **Settings** -> **Secrets and variables** -> **Actions**。
   - 点击 **New repository secret**。
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: 填入你的 Google Gemini API Key。

3. **部署目标**：
   - 构建后的页面将自动部署到 `gh-pages` 分支。
   - 请确保在 GitHub 仓库设置中 (**Settings** -> **Pages**)，Build and deployment Source 设置为 `Deploy from a branch`，并且分支选择 `gh-pages` / `(root)`。

## 📁 忽略文件说明 (.gitignore)

`.gitignore` 文件已配置，自动忽略以下内容：
- `node_modules/` (依赖包)
- `.env`, `.env.local` (环境变量/密钥)
- `dist/` (构建产物)
- 系统临时文件 (.DS_Store 等)

## 📝 技术栈

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Google GenAI SDK** (`@google/genai`)

## 👨‍💻 作者

LZH
