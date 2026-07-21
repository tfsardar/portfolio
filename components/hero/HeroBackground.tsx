"use client";

export default function HeroBackground() {
  return (
    <>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none bg-grid bg-[size:42px_42px] opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      {/* Aurora Glow */}
      <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute top-0 right-[-120px] h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[130px]" />

      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[150px]" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, white 1px, transparent 0), radial-gradient(circle at 75% 75%, white 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Radial Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.35)_65%,rgba(0,0,0,.85)_100%)] pointer-events-none" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </>
  );
}