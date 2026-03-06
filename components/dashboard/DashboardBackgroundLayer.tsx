"use client";

/**
 * Layered background: gradient overlay (Layer 2) + blurred abstract shapes (Layer 3).
 * Layer 1 = body bg image (fixed). Renders behind dashboard panels.
 */
export function DashboardBackgroundLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Layer 2: soft gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 60%, rgba(0,112,255,0.03) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50 dark:opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,112,255,0.04) 0%, transparent 50%, rgba(128,90,213,0.03) 100%)",
        }}
      />
      {/* Layer 3: blurred abstract shapes - blue glow */}
      <div
        className="absolute -left-[15%] top-[5%] h-[500px] w-[500px] rounded-full opacity-[0.08] blur-3xl dark:opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #0070ff 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[10%] top-[35%] h-[400px] w-[400px] rounded-full opacity-[0.06] blur-3xl dark:opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, #0070ff 0%, transparent 70%)",
        }}
      />
      {/* Soft purple/blue gradient blob */}
      <div
        className="absolute bottom-[10%] left-[25%] h-[350px] w-[350px] rounded-full opacity-[0.05] blur-3xl dark:opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(128,90,213,0.5) 0%, rgba(0,112,255,0.3) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[20%] top-[15%] h-[280px] w-[280px] rounded-full opacity-[0.06] blur-3xl dark:opacity-[0.09]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,112,255,0.6) 0%, rgba(128,90,213,0.2) 100%)",
        }}
      />
    </div>
  );
}
