export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(105,118,138,0.16),rgba(219,226,236,0.1)_42%,rgba(72,92,118,0.14))] dark:bg-[linear-gradient(135deg,rgba(55,67,84,0.28),rgba(8,12,20,0.08)_45%,rgba(38,58,78,0.22))]" />
      <div className="absolute inset-0 grid-bg opacity-55" />
      <div className="absolute left-[18%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-cyan-glow/10 blur-3xl" />
      <div className="absolute right-[-10rem] top-[22%] h-[26rem] w-[26rem] rounded-full bg-blue-glow/10 blur-3xl" />
    </div>
  );
}
