"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { ArrowUpRight, BookOpenText, CheckCircle2, GitBranch, Mail, Moon, Send, Sun } from "lucide-react";
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

        <section className="panel flex-1 overflow-hidden rounded-[2rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14, scale: 0.992 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.995 }}
              transition={transition}
              className="h-full max-h-none overflow-y-auto p-5 md:p-8 lg:p-10"
            >
              {activeTab === "overview" && <Overview onChange={setActiveTab} />}
              {activeTab === "projects" && <ProjectsView />}
              {activeTab === "blog" && <BlogView />}
              {activeTab === "architecture" && <ArchitectureView />}
              {activeTab === "experiments" && <ExperimentsView />}
              {activeTab === "about" && <AboutView />}
            </motion.div>
          </AnimatePresence>
        </section>
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
      <PageTitle eyebrow="技术博客" title="记录工程实践，沉淀系统思考。" text="这里的文章更偏工程笔记：记录实现过程、踩坑、系统边界和一些可复用的判断。" />
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
    <>
      <PageTitle eyebrow="系统架构" title="技术栈不是列表，而是一组可组合的能力。" text="围绕前端、后端、AI 应用、基础设施、调度规划和交付部署，整理常用技术与工程能力。" />
      <FloatingStackCards />
    </>
  );
}

function FloatingStackCards() {
  const [ordered, setOrdered] = useState(false);
  const floating = [
    { x: "6%", y: "10%", rotateZ: -4 },
    { x: "37%", y: "8%", rotateZ: 2 },
    { x: "68%", y: "13%", rotateZ: -3 },
    { x: "10%", y: "58%", rotateZ: 3 },
    { x: "40%", y: "52%", rotateZ: -2 },
    { x: "70%", y: "59%", rotateZ: 2 }
  ];
  const orderedPositions = [
    { x: "4%", y: "10%" },
    { x: "36%", y: "10%" },
    { x: "68%", y: "10%" },
    { x: "4%", y: "58%" },
    { x: "36%", y: "58%" },
    { x: "68%", y: "58%" }
  ];

  return (
    <div
      className="relative min-h-[620px] overflow-hidden rounded-3xl border border-line bg-background/55 p-5"
      onMouseEnter={() => setOrdered(true)}
      onMouseLeave={() => setOrdered(false)}
    >
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/10 blur-3xl" />
      <div className="relative z-10 mb-4 h-2" />

      <div className="relative h-[620px]" style={{ transformStyle: "preserve-3d" }}>
        {stackGroups.map((group, index) => {
          const free = floating[index];
          const aligned = orderedPositions[index];
          return (
            <motion.div
              key={group.title}
              className="absolute w-[27%] min-w-[220px] max-w-[255px]"
              style={{ transformOrigin: "center center" }}
              animate={{
                left: ordered ? aligned.x : free.x,
                top: ordered ? aligned.y : free.y,
                rotateZ: ordered ? 0 : free.rotateZ,
                scale: ordered ? 1 : index % 2 === 0 ? 1.02 : 0.99
              }}
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.025 }}
            >
              <motion.div
                className="group relative overflow-hidden rounded-3xl border border-line bg-[color-mix(in_srgb,var(--background)_88%,white_12%)] p-5 shadow-[0_10px_28px_var(--shadow)] dark:bg-[color-mix(in_srgb,var(--background)_86%,white_6%)]"
                animate={
                  ordered
                    ? { y: 0 }
                    : {
                        y: [0, index % 2 === 0 ? -10 : 10, 0]
                      }
                }
                transition={
                  ordered
                    ? { duration: 0.3 }
                    : { duration: 4.8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%,rgba(255,255,255,0.04)_70%,transparent)] opacity-60 dark:opacity-20" />
                <motion.div
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-glow/10 blur-2xl"
                  animate={{ opacity: ordered ? 0.28 : [0.2, 0.48, 0.2] }}
                  transition={{ duration: 3.4, repeat: ordered ? 0 : Infinity, ease: "easeInOut" }}
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-glow/20 bg-cyan-glow/10 text-cyan-glow">
                      <group.icon size={22} />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{group.title}</h2>
                  </div>
                  <span className="rounded-full border border-line bg-background/45 px-2.5 py-1 text-xs text-muted">
                    0{index + 1}
                  </span>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {group.items.slice(0, ordered ? group.items.length : 4).map((item) => (
                    <span key={item} className="rounded-full border border-line bg-foreground/[0.035] px-2.5 py-1 text-xs text-muted">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-glow via-blue-glow to-emerald-glow"
                    animate={{ x: ordered ? "30%" : ["-70%", "110%"] }}
                    transition={ordered ? { duration: 0.45 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "58%" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ExperimentsView() {
  return (
    <>
      <PageTitle eyebrow="AI 实验" title="一些还在生长的小东西。" text="实验区不追求完整包装，更关注一个想法能否被验证，以及它能不能进入下一个正式项目。" />
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
      <PageTitle eyebrow="关于我" title="这是一个个人开发者站，不是商业官网。" text="我希望这里能留下项目、文章和架构思考，而不是堆砌技术名词。" />
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
        <p className="mt-3 text-sm leading-7 text-muted">如果你想聊 AI 应用、全栈系统、调度平台或工程化实现，可以从这里开始。</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GlowButton href="mailto:hello@example.com">
            <Mail size={17} /> hello@example.com
          </GlowButton>
          <GlowButton href="https://github.com/" target="_blank" rel="noreferrer" variant="ghost">
            <GitBranch size={17} /> Github
          </GlowButton>
          <GlowButton href="#" variant="ghost">
            <Send size={17} /> 发送想法
          </GlowButton>
        </div>
      </div>
    </>
  );
}
