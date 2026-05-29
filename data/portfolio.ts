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
  intro:
    "我关注的是把一个想法做成可运行、可维护、可部署的系统：从前端交互、后端服务、实时通信，到 AI 工作流和自动化部署。",
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
      "把模型供应商、会话上下文和前端流式渲染拆成清晰边界",
      "使用 Redis 管理短期记忆、会话状态与上下文裁剪",
      "服务可容器化部署，方便继续接入 RAG 或 Agent 工具调用"
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
      "车辆状态、任务队列和地图状态通过 WebSocket 保持同步",
      "路径规划考虑地图约束、转向代价和任务优先级",
      "页面重点不是炫技，而是让调度状态能被快速判断"
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
      "网关负责统一入口、鉴权边界和服务路由",
      "Redis 与 MQ 用于缓存、异步流程和削峰处理",
      "通过 Docker Compose 固化本地开发和部署拓扑"
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
      "把 Agent 执行拆成步骤、工具、状态和输出流",
      "前端展示执行轨迹，便于调试模型行为",
      "适合快速验证 AI 应用中的流程编排想法"
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
    excerpt: "记录流式响应、取消请求、错误边界和前端状态更新里容易被忽略的小问题。"
  },
  {
    title: "Redis 在 AI 应用里不只是缓存",
    date: "2026 年 4 月",
    readTime: "约 6 分钟",
    tags: ["Redis", "上下文", "后端"],
    excerpt: "从会话记忆、限流、临时状态和队列几个角度，整理 Redis 在模型应用中的实际用法。"
  },
  {
    title: "实时调度系统为什么要围绕反馈设计",
    date: "2026 年 3 月",
    readTime: "约 9 分钟",
    tags: ["WebSocket", "调度系统", "Hybrid A*"],
    excerpt: "当地图、任务和车辆状态持续变化时，系统设计的重点会从功能完成转向状态可信。"
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
  { title: "工程笔记", text: "记录部署、后端边界、前端架构和 AI 应用里的实际经验。", icon: NotebookText }
];

export const aboutPoints = [
  { icon: Code2, title: "我更喜欢完整系统", text: "前端、接口、数据、流式输出、部署和文档最好能互相对齐。" },
  { icon: GitBranch, title: "边做边记录", text: "博客更像工程笔记，不追求宏大叙事，优先记录真实项目里的取舍。" },
  { icon: ServerCog, title: "关注可运行性", text: "项目能部署、能排查、能迭代，才算真正进入工程状态。" },
  { icon: Sparkles, title: "AI 是工程的一层", text: "模型本身只是起点，真正重要的是状态、工具、界面和反馈闭环。" }
];
