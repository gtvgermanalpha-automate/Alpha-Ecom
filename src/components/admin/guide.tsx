import * as React from "react";

/**
 * "Where does this show up?" panels for the dashboard editor: a small picture of
 * the page with the part being edited highlighted, plus numbered directions.
 * A field opts in through `guide` in the CMS registry.
 */
export type FieldGuide = { diagram: string; title: string; steps: string[] };

const BG = "#f4f6fd";
const BLOCK = "#d9dff2";
const DARK = "#111144";
const HOT = "#f98513";

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={HOT} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">
        {n}
      </text>
    </g>
  );
}

const Line = ({ x, y, w, h = 5, hot = false }: { x: number; y: number; w: number; h?: number; hot?: boolean }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={hot ? HOT : BLOCK} />
);

const Box = ({ x, y, w, h, hot = false, fill = "#fff" }: { x: number; y: number; w: number; h: number; hot?: boolean; fill?: string }) => (
  <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={hot ? HOT : BLOCK} strokeWidth={hot ? 2 : 1} />
);

/** Thin top bar so every picture reads as "a page of the website". */
const Chrome = () => (
  <>
    <rect x="0" y="0" width="320" height="180" rx="10" fill={BG} />
    <rect x="0" y="0" width="320" height="16" rx="10" fill="#fff" />
    <rect x="10" y="5" width="26" height="6" rx="3" fill={HOT} />
    <rect x="130" y="6" width="60" height="4" rx="2" fill={BLOCK} />
  </>
);

const DIAGRAMS: Record<string, React.ReactNode> = {
  // Service card used on the home page, Services page and menus
  tile: (
    <>
      <Chrome />
      <Box x={20} y={36} w={86} h={120} />
      <Box x={117} y={36} w={86} h={120} hot />
      <Box x={214} y={36} w={86} h={120} />
      <rect x={129} y={48} width={34} height={14} rx="3" fill={BLOCK} />
      <Line x={129} y={72} w={48} h={6} hot />
      <Line x={129} y={86} w={62} />
      <Line x={129} y={96} w={54} />
      <Line x={129} y={116} w={40} />
      <Line x={129} y={126} w={46} />
      <Line x={129} y={136} w={36} />
      <Marker x={121} y={55} n={1} />
      <Marker x={121} y={75} n={2} />
      <Marker x={121} y={91} n={3} />
      <Marker x={121} y={126} n={4} />
    </>
  ),
  // Google search result
  seo: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill="#fff" stroke={BLOCK} />
      <rect x="20" y="18" width="200" height="18" rx="9" fill={BG} stroke={BLOCK} />
      <Line x={20} y={56} w={90} h={4} />
      <Line x={20} y={68} w={210} h={8} hot />
      <Line x={20} y={86} w={270} />
      <Line x={20} y={96} w={230} />
      <Line x={20} y={124} w={80} h={4} />
      <Line x={20} y={136} w={180} h={8} />
      <Line x={20} y={154} w={250} />
      <Marker x={246} y={72} n={1} />
      <Marker x={304} y={91} n={2} />
    </>
  ),
  // Dark banner at the top of a page
  hero: (
    <>
      <Chrome />
      <rect x="0" y="16" width="320" height="96" fill={DARK} />
      <Line x={24} y={34} w={50} h={4} />
      <Line x={24} y={48} w={190} h={10} hot />
      <Line x={24} y={64} w={130} h={10} hot />
      <Line x={24} y={86} w={170} h={4} />
      <Line x={24} y={95} w={140} h={4} />
      <Box x={24} y={126} w={130} h={40} />
      <Box x={166} y={126} w={130} h={40} />
      <Marker x={232} y={58} n={1} />
      <Marker x={210} y={92} n={2} />
    </>
  ),
  // Heading / paragraph size
  sizes: (
    <>
      <Chrome />
      <text x="24" y="62" fontSize="13" fontWeight="800" fill={DARK}>Small heading</text>
      <text x="24" y="96" fontSize="19" fontWeight="800" fill={DARK}>Medium heading</text>
      <text x="24" y="138" fontSize="26" fontWeight="800" fill={HOT}>Large heading</text>
      <Line x={24} y={152} w={220} h={4} />
      <Line x={24} y={162} w={180} h={4} />
      <Marker x={300} y={96} n={1} />
      <Marker x={300} y={157} n={2} />
    </>
  ),
  // Overview: text left, graphic right
  overview: (
    <>
      <Chrome />
      <Line x={24} y={36} w={170} h={10} hot />
      <Line x={24} y={62} w={150} />
      <Line x={24} y={72} w={160} />
      <Line x={24} y={82} w={120} />
      <Line x={24} y={100} w={150} />
      <Line x={24} y={110} w={90} />
      <rect x={24} y={130} width={84} height={22} rx="11" fill={HOT} />
      <Box x={212} y={40} w={88} h={110} />
      <rect x={236} y={52} width={40} height={14} rx="3" fill={BLOCK} />
      <rect x={228} y={116} width={10} height={20} rx="2" fill={BLOCK} />
      <rect x={244} y={104} width={10} height={32} rx="2" fill={BLOCK} />
      <rect x={260} y={92} width={10} height={44} rx="2" fill={BLOCK} />
      <rect x={276} y={78} width={10} height={58} rx="2" fill={DARK} />
      <Marker x={12} y={41} n={1} />
      <Marker x={12} y={84} n={2} />
      <Marker x={120} y={141} n={3} />
    </>
  ),
  // The three section layouts side by side
  layouts: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={BG} />
      {/* Cards */}
      <text x="54" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Cards</text>
      <Line x={24} y={30} w={60} h={6} hot />
      {[0, 1].map((r) =>
        [0, 1].map((c) => <Box key={`${r}${c}`} x={10 + c * 46} y={48 + r * 46} w={42} h={40} />)
      )}
      <rect x={30} y={146} width={48} height={14} rx="7" fill={HOT} />
      {/* List */}
      <text x="160" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>List</text>
      <Line x={112} y={48} w={40} h={6} hot />
      <Line x={112} y={62} w={36} h={4} />
      <Line x={112} y={71} w={30} h={4} />
      <rect x={112} y={86} width={34} height={12} rx="6" fill={HOT} />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={160} y={44 + i * 32} w={48} h={26} />
      ))}
      {/* Steps */}
      <text x="266" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill={DARK}>Steps</text>
      <Line x={238} y={30} w={56} h={6} hot />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={224 + i * 30} y={52} w={26} h={70} />
          <circle cx={237 + i * 30} cy={66} r="6" fill={DARK} />
          <text x={237 + i * 30} y={69} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">
            {i + 1}
          </text>
        </g>
      ))}
      <rect x={242} y={136} width={48} height={14} rx="7" fill={HOT} />
      <line x1="104" x2="104" y1="10" y2="170" stroke={BLOCK} />
      <line x1="216" x2="216" y1="10" y2="170" stroke={BLOCK} />
    </>
  ),
  // FAQ accordion
  faq: (
    <>
      <Chrome />
      <Line x={90} y={34} w={140} h={9} hot />
      <Box x={50} y={56} w={220} h={110} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Line x={62} y={68 + i * 26} w={i === 0 ? 120 : 100 + i * 14} h={6} hot={i === 0} />
          <path d={`M252 ${68 + i * 26} l4 4 l4 -4`} fill="none" stroke={HOT} strokeWidth="1.5" />
          {i < 3 ? <line x1="50" x2="270" y1={82 + i * 26} y2={82 + i * 26} stroke={BLOCK} /> : null}
        </g>
      ))}
      <Marker x={244} y={38} n={1} />
      <Marker x={38} y={71} n={2} />
    </>
  ),
  // Dark closing banner near the bottom
  banner: (
    <>
      <Chrome />
      <Line x={40} y={30} w={120} />
      <Line x={40} y={40} w={90} />
      <rect x="24" y="58" width="272" height="100" rx="12" fill={DARK} />
      <Line x={90} y={78} w={140} h={10} hot />
      <Line x={76} y={100} w={168} h={4} />
      <Line x={96} y={109} w={128} h={4} />
      <rect x={92} y={126} width={64} height={18} rx="9" fill={HOT} />
      <rect x={164} y={126} width={64} height={18} rx="9" fill="none" stroke="#fff" />
      <Marker x={246} y={83} n={1} />
      <Marker x={260} y={105} n={2} />
    </>
  ),
};

export function GuidePanel({ guide }: { guide: FieldGuide }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-habanero/30 bg-habanero-50 p-4 sm:flex-row sm:items-center">
      <svg
        viewBox="0 0 320 180"
        role="img"
        aria-label={`Where "${guide.title}" appears on the page`}
        className="w-full shrink-0 rounded-lg shadow-soft sm:w-64"
      >
        {DIAGRAMS[guide.diagram] ?? DIAGRAMS.hero}
      </svg>
      <div>
        <p className="text-sm font-bold text-navy">{guide.title}</p>
        <ol className="mt-2 space-y-1.5 text-sm text-navy/80">
          {guide.steps.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-habanero text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
