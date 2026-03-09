const LIGHT_CARD_BASE =
  "rounded-xl border border-black/5 bg-white/80 backdrop-blur-sm shadow-[0_4px_10px_rgba(15,23,42,0.05)]";

const LIGHT_CARD_HOVER =
  "transition-transform duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:bg-white";

const DARK_CARD_BASE =
  "dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]";

const DARK_CARD_HOVER =
  "dark:hover:shadow-[0_20px_60px_rgba(0,112,255,0.2)]";

/**
 * Shared surface style for interactive cards in light mode.
 * - Light: soft white surface, subtle border, depth and lift on hover
 * - Dark: keeps existing translucent dark styling and hover glow
 */
export const cardSurfaceClass = [
  LIGHT_CARD_BASE,
  LIGHT_CARD_HOVER,
  DARK_CARD_BASE,
  DARK_CARD_HOVER,
].join(" ");

