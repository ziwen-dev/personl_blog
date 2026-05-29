"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ArrowUpRight, BookOpenText, CheckCircle2, Code2, GitBranch, Mail, Moon, Send, Sparkles, Sun, Timer, Users } from "lucide-react";
import { useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { GlowButton } from "@/components/button";
import { useTheme } from "@/components/theme-provider";
import { WaterSurface } from "@/components/water-ripple";
import {
  aboutPoints,
  architectureNodes,
  articles,
  experiments,
  profile,
  projects,
  stackGroups,
  tabs,
  type TabId
} from "@/data/portfolio";

const transition: Transition = { duration: 0.26, ease: [0.22, 1, 0.36, 1] };

export function PortfolioShell() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 py-4 md:px-6 md:py-6">
      <AnimatedBackground />
      <WaterSurface />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-32px)] max-w-7xl flex-col gap-5">
        <Header activeTab={activeTab} onChange={setActiveTab} theme={theme} onThemeToggle={toggleTheme} />

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 14, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.995 }}
            transition={transition}
            className="panel flex-1 overflow-y-auto rounded-[2rem] p-5 md:p-8 lg:p-10"
          >
            {activeTab === "overview" && <Overview onChange={setActiveTab} />}
            {activeTab === "projects" && <ProjectsView />}
            {activeTab === "blog" && <BlogView />}
            {activeTab === "architecture" && <ArchitectureView />}
            {activeTab === "experiments" && <ExperimentsView />}
            {activeTab === "about" && <AboutView />}
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}

function Header({
  activeTab,
  onChange,
  theme,
  onThemeToggle
}: {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}) {
  return (
    <header className="glass rounded-[1.75rem] px-4 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <button onClick={() => onChange("overview")} className="flex items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-background/50 text-sm font-semibold">
            ZW
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">智能系统笔记</span>
            <span className="text-xs text-muted">个人博客 / 工程作品 / 架构记录</span>
          </span>
        </button>

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition ${
                activeTab === item.id ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {activeTab === item.id ? (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-background/35 px-4 text-sm text-muted transition hover:text-foreground"
          >
            <GitBranch size={16} /> Github
          </a>
          <button
            onClick={onThemeToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-background/35 text-muted transition hover:text-foreground"
            aria-label="切换主题"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mb-7 max-w-3xl">
      <div className="mb-4 inline-flex rounded-full border border-line bg-background/40 px-3 py-1.5 text-xs font-medium text-cyan-glow">
        {eyebrow}
      </div>
      <h1 className="section-title text-gradient font-semibold">{title}</h1>
      <p className="mt-4 text-base leading-8 text-muted">{text}</p>
    </div>
  );
}

function Overview({ onChange }: { onChange: (tab: TabId) => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="py-4">
        <div className="mb-5 inline-flex w-fit rounded-full border border-line bg-background/40 px-4 py-2 text-sm text-muted">
          {profile.subtitle}
        </div>
        <h1 className="display-title text-gradient max-w-3xl font-semibold">{profile.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">{profile.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={() => onChange("projects")} className="rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">
            查看项目
          </button>
          <button onClick={() => onChange("blog")} className="rounded-full border border-line bg-background/35 px-5 py-3 text-sm font-semibold text-foreground">
            阅读博客
          </button>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="rounded-full border border-line bg-background/35 px-5 py-3 text-sm font-semibold text-foreground">
            Github
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line bg-background/35 px-3 py-1.5 text-sm text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {profile.status.map((item) => (
            <div key={item.label} className="rounded-3xl border border-line bg-background/40 p-5">
              <div className="text-sm text-muted">{item.label}</div>
              <div className="mt-2 text-lg font-semibold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-line bg-background/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">最近在整理</span>
            <BookOpenText className="text-cyan-glow" size={20} />
          </div>
          <div className="grid gap-3">
            {articles.slice(0, 3).map((article) => (
              <button key={article.title} onClick={() => onChange("blog")} className="block w-full rounded-2xl bg-foreground/[0.04] p-3 text-left transition hover:bg-foreground/[0.07]">
                <div className="text-sm font-medium text-foreground">{article.title}</div>
                <div className="mt-1 text-xs text-muted">{article.readTime}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <>
      <PageTitle eyebrow="精选项目" title="更像工程记录，而不是作品集模板。" text="每个项目都围绕一个真实系统问题展开：流式 AI、实时调度、微服务基础设施和 Agent 工作流。" />
      <div className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="group relative overflow-hidden rounded-3xl border border-line bg-background/40 p-5 transition hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
            <div className="relative">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-background/45 text-cyan-glow">
                    <project.icon size={23} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground md:text-2xl">{project.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">{project.subtitle}</p>
                  </div>
                </div>
                <ArrowUpRight className="shrink-0 text-muted transition group-hover:text-cyan-glow" size={20} />
              </div>
              <div className="mb-5 grid grid-cols-2 gap-2">
                {project.modules.map((module) => (
                  <div key={module} className="rounded-2xl border border-line bg-background/38 px-3 py-2 text-sm text-muted">
                    {module}
                  </div>
                ))}
              </div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-background/38 px-3 py-1.5 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {project.highlights.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-muted">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-glow" size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function BlogView() {
  return (
    <>
      <PageTitle eyebrow="技术博客" title="最近写的几篇。" text="主要是项目里遇到的问题和一些实现记录。" />
      <div className="grid gap-4 xl:grid-cols-2">
        {articles.map((article) => (
          <article key={article.title} className="rounded-3xl border border-line bg-background/40 p-6 transition hover:-translate-y-1 hover:border-cyan-glow/35">
            <div className="flex items-center justify-between text-sm text-muted">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold leading-tight text-foreground md:text-2xl">{article.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line bg-background/35 px-3 py-1.5 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ArchitectureView() {
  return (
    <TechStackShowcase />
  );
}

function TechStackShowcase() {
  const [arranged, setArranged] = useState(false);
  const floatingPositions = [
    { x: "3%", y: "7%", rotate: -3 },
    { x: "35%", y: "4%", rotate: 2 },
    { x: "67%", y: "8%", rotate: -2 },
    { x: "6%", y: "55%", rotate: 2 },
    { x: "36%", y: "51%", rotate: -2 },
    { x: "67%", y: "55%", rotate: 2 }
  ];
  const arrangedPositions = [
    { x: "2%", y: "7%" },
    { x: "35%", y: "7%" },
    { x: "68%", y: "7%" },
    { x: "2%", y: "56%" },
    { x: "35%", y: "56%" },
    { x: "68%", y: "56%" }
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-glow/10 blur-3xl dark:bg-blue-glow/[0.05]" />
      <div className="absolute -left-28 bottom-[-10rem] h-80 w-80 rounded-full bg-cyan-glow/8 blur-3xl dark:bg-cyan-glow/[0.04]" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-glow/15 bg-blue-glow/8 px-4 py-2 text-xs font-medium text-blue-glow dark:border-blue-glow/20 dark:bg-blue-glow/[0.08] dark:text-blue-glow">
            <span className="h-2 w-2 rounded-full bg-blue-glow" />
            系统 · 架构 · 工程实践
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            常用技术栈。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted dark:text-white/58">
            按平时做项目会用到的方向简单分了一下，方便快速查看和选择。
          </p>
          <div className="mt-7 flex flex-wrap gap-6 text-sm text-muted dark:text-white/52">
            <div className="flex items-center gap-2">
              <Users className="text-blue-glow" size={18} />
              <span>6 大方向</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="text-blue-glow" size={18} />
              <span>30+ 技术标签</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-blue-glow" size={18} />
              <span>持续更新</span>
            </div>
          </div>
        </div>

        <div className="relative hidden h-56 lg:block">
          <div className="absolute right-12 top-3 h-44 w-36 rotate-12 rounded-3xl border border-white/60 bg-white/38 shadow-[0_18px_50px_rgba(65,82,140,0.18)] backdrop-blur dark:border-white/[0.08] dark:bg-[#151d2b]/70 dark:shadow-[0_18px_50px_rgba(0,0,0,0.24)]" />
          <div className="absolute right-28 top-12 h-36 w-44 -rotate-6 rounded-3xl border border-white/60 bg-white/36 p-6 shadow-[0_18px_50px_rgba(65,82,140,0.16)] backdrop-blur dark:border-white/[0.08] dark:bg-[#121a27]/75 dark:shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
            <div className="h-4 w-28 rounded-full bg-foreground/8 dark:bg-white/10" />
            <div className="mt-4 h-4 w-36 rounded-full bg-foreground/8 dark:bg-white/10" />
            <div className="mt-4 h-4 w-24 rounded-full bg-foreground/8 dark:bg-white/10" />
          </div>
          <div className="absolute right-4 top-0 flex h-24 w-24 rotate-6 items-center justify-center rounded-3xl border border-white/65 bg-gradient-to-br from-blue-glow/45 to-cyan-glow/20 text-white shadow-[0_18px_45px_rgba(64,97,255,0.28)] backdrop-blur dark:border-blue-glow/20 dark:from-blue-glow/24 dark:to-cyan-glow/10 dark:text-blue-glow dark:shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <Code2 size={42} />
          </div>
          <motion.span
            className="absolute right-72 top-20 h-8 w-8 rounded-full border border-white/50 bg-blue-glow/20 shadow-[0_0_25px_rgba(64,97,255,0.24)] dark:border-blue-glow/20 dark:bg-blue-glow/10 dark:shadow-[0_0_18px_rgba(90,130,255,0.12)]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative mt-8" onMouseEnter={() => setArranged(true)} onMouseLeave={() => setArranged(false)}>
        <div className="grid gap-5 md:hidden">
          {stackGroups.map((group, index) => (
            <StackTechCard key={group.title} group={group} index={index} />
          ))}
        </div>

        <div className="relative hidden h-[640px] md:block">
          {stackGroups.map((group, index) => {
            const free = floatingPositions[index];
            const aligned = arrangedPositions[index];
            return (
              <motion.div
                key={group.title}
                className="absolute w-[30%] min-w-[235px] max-w-[295px]"
                animate={{
                  left: arranged ? aligned.x : free.x,
                  top: arranged ? aligned.y : free.y,
                  rotate: arranged ? 0 : free.rotate,
                  scale: arranged ? 1 : index % 2 === 0 ? 1.015 : 0.995
                }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.025 }}
              >
                <motion.div
                  animate={arranged ? { y: 0 } : { y: [0, index % 2 === 0 ? -10 : 10, 0] }}
                  transition={
                    arranged
                      ? { duration: 0.28 }
                      : { duration: 4.6 + index * 0.32, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <StackTechCard group={group} index={index} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-5 flex flex-col gap-3 rounded-3xl border border-line bg-background/40 p-4 text-sm text-muted dark:border-white/[0.08] dark:bg-[#0d1420] dark:text-white/55 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="text-blue-glow" size={20} />
          <span>专注项目实现、系统设计和日常记录。</span>
        </div>
        <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-blue-glow">
          联系我 <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}

function StackTechCard({
  group,
  index
}: {
  group: (typeof stackGroups)[number];
  index: number;
}) {
  return (
    <article className="group relative flex h-[268px] flex-col overflow-hidden rounded-3xl border border-line bg-[color-mix(in_srgb,var(--background)_88%,white_12%)] p-6 shadow-[0_10px_28px_var(--shadow)] transition dark:border-white/[0.08] dark:bg-[#111826] dark:shadow-[0_14px_36px_rgba(0,0,0,0.34)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-glow/65 to-transparent dark:via-blue-glow/35" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(145deg,rgba(255,255,255,0.035),transparent_44%,rgba(73,111,255,0.035))] dark:block" />
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-glow/10 blur-2xl transition group-hover:bg-cyan-glow/15 dark:bg-blue-glow/[0.055] dark:group-hover:bg-cyan-glow/[0.075]" />
      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-glow/10 text-blue-glow ring-1 ring-blue-glow/15 dark:bg-blue-glow/[0.11] dark:text-blue-glow dark:ring-blue-glow/18">
          <group.icon size={23} />
        </div>
        <span className="rounded-full border border-line bg-background/45 px-2.5 py-1 text-xs text-muted dark:border-white/10 dark:bg-white/[0.035] dark:text-white/45">
          0{index + 1}
        </span>
      </div>
      <h2 className="relative mt-6 text-2xl font-semibold text-foreground dark:text-white/86">{group.title}</h2>
      <div className="relative mt-4 flex min-h-[78px] flex-wrap content-start gap-2">
        {group.items.slice(0, 5).map((item) => (
          <span key={item} className="rounded-full border border-line bg-foreground/[0.035] px-3 py-1.5 text-xs text-muted dark:border-white/10 dark:bg-white/[0.035] dark:text-white/52">
            {item}
          </span>
        ))}
      </div>
      <div className="relative mt-auto h-1.5 overflow-hidden rounded-full bg-foreground/[0.06] dark:bg-white/[0.06]">
        <span className="block h-full w-[58%] rounded-full bg-gradient-to-r from-blue-glow to-cyan-glow dark:from-blue-glow/80 dark:to-cyan-glow/70" />
      </div>
    </article>
  );
}

function ExperimentsView() {
  return (
    <>
      <PageTitle eyebrow="AI 实验" title="一些小实验。" text="有些是半成品，有些只是为了验证一个功能点。" />
      <div className="grid gap-4 md:grid-cols-2">
        {experiments.map((item) => (
          <div key={item.title} className="rounded-3xl border border-line bg-background/40 p-6">
            <item.icon className="mb-6 text-emerald-glow" size={26} />
            <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function AboutView() {
  return (
    <>
      <PageTitle eyebrow="关于我" title="关于这个站。" text="这里会放一些项目、文章和日常记录。" />
      <div className="grid gap-4 md:grid-cols-2">
        {aboutPoints.map((point) => (
          <div key={point.title} className="rounded-3xl border border-line bg-background/40 p-6">
            <point.icon className="mb-6 text-cyan-glow" size={26} />
            <h2 className="text-xl font-semibold text-foreground">{point.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{point.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-line bg-background/40 p-6">
        <h2 className="text-2xl font-semibold text-foreground">联系</h2>
        <p className="mt-3 text-sm leading-7 text-muted">有项目或想法可以直接联系我。</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GlowButton href="mailto:hello@example.com">
            <Mail size={17} /> hello@example.com
          </GlowButton>
          <GlowButton href="https://github.com/" target="_blank" rel="noreferrer" variant="ghost">
            <GitBranch size={17} /> Github
          </GlowButton>
          <GlowButton href="#" variant="ghost">
            <Send size={17} /> 联系我
          </GlowButton>
        </div>
      </div>
    </>
  );
}
