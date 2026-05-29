import {
  Bot,
  Boxes,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  NotebookText,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";

export const tabs = [
  { id: "overview", label: "首页" },
  { id: "projects", label: "项目" },
  { id: "blog", label: "博客" },
  { id: "architecture", label: "架构" },
  { id: "experiments", label: "实验" },
  { id: "about", label: "关于" }
] as const;

export type TabId = (typeof tabs)[number]["id"];

export const profile = {
  title: "笔记、项目与智能系统",
  subtitle: "全栈开发工程师 / AI 应用开发者 / 智能系统工程师",
  intro: "这里放一些项目、笔记和最近在折腾的东西。",
  tags: ["AI 应用", "SpringBoot", "实时系统", "工程笔记"],
  status: [
    { label: "当前关注", value: "AI Agent / SSE" },
    { label: "常用后端", value: "Java / SpringBoot" },
    { label: "系统方向", value: "调度 / 路径规划" }
  ]
};

export const projects = [
  {
    title: "AI 对话平台",
    subtitle: "面向 AI 应用的流式对话、模型切换与上下文管理平台。",
    icon: Bot,
    tags: ["OpenAI 兼容接口", "SSE 流式输出", "Redis", "Docker", "多模型切换"],
    highlights: [
      "支持流式输出和多模型切换",
      "使用 Redis 保存会话状态",
      "Docker 部署，方便本地和服务器环境迁移"
    ],
    modules: ["前端会话", "模型网关", "上下文记忆", "流式接口"],
    color: "from-sky-400/16 via-blue-400/8 to-transparent"
  },
  {
    title: "物流调度系统",
    subtitle: "围绕实时地图、任务队列和路径规划构建的调度控制台。",
    icon: Route,
    tags: ["WebSocket", "Hybrid A*", "任务调度", "实时地图", "路径规划"],
    highlights: [
      "WebSocket 实时同步车辆和任务状态",
      "Hybrid A* 路径规划",
      "实时地图和调度看板"
    ],
    modules: ["实时地图", "调度器", "路径引擎", "状态同步"],
    color: "from-teal-400/16 via-sky-400/8 to-transparent"
  },
  {
    title: "微服务基础平台",
    subtitle: "基于 SpringCloud 的网关、权限、缓存与业务服务基础工程。",
    icon: Network,
    tags: ["SpringCloud", "Gateway", "Redis", "MQ", "MySQL", "Docker Compose"],
    highlights: [
      "网关、权限、业务服务拆分",
      "Redis、MQ、MySQL 组合使用",
      "Docker Compose 本地编排"
    ],
    modules: ["网关", "权限", "业务服务", "基础设施"],
    color: "from-indigo-400/16 via-sky-400/8 to-transparent"
  },
  {
    title: "AI 工作流平台",
    subtitle: "用于实验 Agent 步骤、工具调用和执行过程可视化的工作台。",
    icon: Workflow,
    tags: ["AI Agent", "工具调用", "SSE", "工作流", "执行追踪"],
    highlights: [
      "Agent 步骤编排",
      "工具调用记录",
      "流式输出和执行轨迹展示"
    ],
    modules: ["Agent", "工具", "轨迹", "界面"],
    color: "from-violet-400/16 via-blue-400/8 to-transparent"
  }
];

export const articles = [
  {
    title: "AI 对话应用里的 SSE 流应该怎么组织",
    date: "2026 年 5 月",
    readTime: "约 7 分钟",
    tags: ["AI 工程", "SSE", "React"],
    excerpt: "整理 SSE 接口、前端状态和取消请求的一些处理方式。"
  },
  {
    title: "Redis 在 AI 应用里不只是缓存",
    date: "2026 年 4 月",
    readTime: "约 6 分钟",
    tags: ["Redis", "上下文", "后端"],
    excerpt: "会话、限流、临时状态和队列，几个项目里常用到的 Redis 用法。"
  },
  {
    title: "实时调度系统为什么要围绕反馈设计",
    date: "2026 年 3 月",
    readTime: "约 9 分钟",
    tags: ["WebSocket", "调度系统", "Hybrid A*"],
    excerpt: "地图、任务和车辆状态持续变化时，调度页面要先把状态显示清楚。"
  },
  {
    title: "Docker + Nginx 部署前的小清单",
    date: "2026 年 2 月",
    readTime: "约 5 分钟",
    tags: ["Docker", "Nginx", "Linux"],
    excerpt: "把一个全栈项目放到 Linux 服务器前，我通常会检查的配置、端口、日志和回滚点。"
  }
];

export const stackGroups = [
  { title: "后端", icon: ServerCog, items: ["Java", "SpringBoot", "SpringCloud", "Gateway", "权限系统", "REST API"] },
  { title: "前端", icon: Globe2, items: ["Vue", "React", "Next.js", "TailwindCSS", "WebSocket", "可视化界面"] },
  { title: "AI 应用", icon: BrainCircuit, items: ["AI Agent", "SSE 流式输出", "OpenAI API", "工具调用", "RAG", "工作流"] },
  { title: "基础设施", icon: Database, items: ["Redis", "MySQL", "MQ", "Linux", "Nginx", "日志与监控"] },
  { title: "调度规划", icon: Route, items: ["任务调度", "Hybrid A*", "实时地图", "路径规划", "状态同步"] },
  { title: "交付部署", icon: CloudCog, items: ["Docker", "Compose", "自动化部署", "CI/CD", "发布记录", "运维脚本"] }
];

export const architectureNodes = [
  { id: "前端界面", icon: Layers3, x: "8%", y: "22%" },
  { id: "网关层", icon: ShieldCheck, x: "32%", y: "22%" },
  { id: "微服务", icon: Boxes, x: "58%", y: "22%" },
  { id: "Redis / MQ / MySQL", icon: Database, x: "35%", y: "64%" },
  { id: "AI 服务", icon: BrainCircuit, x: "72%", y: "58%" },
  { id: "调度系统", icon: Route, x: "8%", y: "66%" }
];

export const experiments = [
  { title: "Agent 运行时", text: "尝试把工具调用、步骤状态和流式输出整理成更容易调试的结构。", icon: BrainCircuit },
  { title: "路径规划实验", text: "围绕 Hybrid A*、地图约束和任务优先级做一些调度模拟。", icon: Route },
  { title: "实时界面", text: "研究 WebSocket、乐观更新和高频状态变化下的界面可读性。", icon: Zap },
  { title: "工程笔记", text: "部署、接口、前端结构和 AI 应用相关记录。", icon: NotebookText }
];

export const aboutPoints = [
  { icon: Code2, title: "做项目", text: "前端、后端、数据库和部署都会碰。" },
  { icon: GitBranch, title: "写记录", text: "主要记一些项目里的实现和问题。" },
  { icon: ServerCog, title: "跑服务", text: "Linux、Docker、Nginx 这些日常会用。" },
  { icon: Sparkles, title: "试 AI", text: "对话、Agent、SSE 和工具调用都在做。" }
];
