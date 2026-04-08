# vue-mall

一个基于 `Vue 3 + TypeScript + Vite` 的电商前端项目，包含首页、分类、商品详情、购物车、结算支付、会员中心等完整商城流程。

## 项目特性

- Vue 3 组合式 API 开发
- TypeScript 类型约束
- Vite 构建与本地开发
- Vue Router 页面路由管理
- Pinia 状态管理（含本地持久化）
- Element Plus 组件库（支持自动按需引入）
- Axios 请求封装与统一拦截处理

## 功能模块

- 首页：轮播、分类入口、商品分区展示
- 分类页：一级分类、二级分类、商品列表
- 商品详情：规格选择、加入购物车
- 购物车：增删改查、全选、金额统计
- 订单流程：结算、支付、支付结果页
- 用户中心：个人信息、订单列表
- 登录鉴权：登录状态持久化、401 自动清理并跳转登录

## 技术栈

- `vue@3.5.x`
- `typescript@5.8.x`
- `vite@6.x`
- `vue-router@4.5.x`
- `pinia@3.x`
- `element-plus@2.9.x`
- `axios@1.8.x`
- `sass`

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认本地地址：`http://127.0.0.1:5173`

### 3. 构建生产包

```bash
npm run build
```

### 4. 本地预览生产包

```bash
npm run preview
```

## 常用脚本

- `npm run dev`：启动开发服务器
- `npm run build`：类型检查并打包
- `npm run build-only`：仅执行打包
- `npm run type-check`：TypeScript 类型检查
- `npm run lint`：ESLint 检查并自动修复
- `npm run format`：格式化 `src/` 下代码

## 项目结构

```text
vue-mall
├─ public/                  # 静态资源
├─ src/
│  ├─ assets/               # 图片与基础样式
│  ├─ components/           # 全局/通用组件（如 Sku、ImageView）
│  ├─ composables/          # 组合式逻辑封装
│  ├─ plugins/              # Vue 插件注册
│  ├─ router/               # 路由配置
│  ├─ services/             # 接口请求封装
│  ├─ stores/               # Pinia 状态管理
│  ├─ styles/               # 全局样式与变量
│  ├─ views/                # 页面模块
│  ├─ App.vue               # 根组件
│  └─ main.ts               # 应用入口
├─ index.html
├─ vite.config.ts
└─ package.json
```

## 接口与鉴权说明

- 默认接口基地址：`http://pcapi-xiaotuxian-front-devtest.itheima.net`
- 请求拦截器会自动携带用户 `token`
- 响应拦截器在 `401` 时会清空登录信息并跳转 `/login`

## 开发说明

- 项目使用 `@` 指向 `src` 目录
- Element Plus 通过 `unplugin-auto-import` 与 `unplugin-vue-components` 自动导入
- 全局 SCSS 变量和 Element 样式在 `vite.config.ts` 中自动注入
