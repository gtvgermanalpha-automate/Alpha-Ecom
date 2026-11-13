/**
 * Decorative growth chart shown beside the overview on service pages.
 * Purely illustrative (no real figures), so it is hidden from screen readers.
 */
export function GrowthChart({ className }: { className?: string }) {
  const bars = [34, 48, 44, 66, 84, 108];
  const barW = 26;
  const gap = 16;
  const baseY = 150;
  const x0 = 28;
  const points = bars.map((h, i) => [x0 + i * (barW + gap) + barW / 2, baseY - h - 16] as const);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const [lx, ly] = points[points.length - 1];

  return (
    <svg viewBox="0 0 300 170" className={className} role="presentation" aria-hidden>
      {/* grid */}
      {[30, 70, 110, 150].map((y) => (
        <line key={y} x1="16" x2="284" y1={y} y2={y} className="stroke-aster-100" strokeWidth="1" />
      ))}
      {/* bars */}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={x0 + i * (barW + gap)}
          y={baseY - h}
          width={barW}
          height={h}
          rx="6"
          className={i === bars.length - 1 ? "fill-navy" : i >= 3 ? "fill-aster" : "fill-aster-200"}
        />
      ))}
      {/* trend line */}
      <path d={line} fill="none" className="stroke-habanero" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" className="fill-white stroke-habanero" strokeWidth="3" />
      ))}
      {/* arrow head */}
      <path
        d={`M${lx + 6} ${ly - 20} l16 -4 l-4 16`}
        fill="none"
        className="stroke-habanero"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={`M${lx + 4} ${ly - 6} L${lx + 20} ${ly - 22}`} className="stroke-habanero" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
