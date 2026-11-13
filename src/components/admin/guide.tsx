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
  // Top bar + footer: where the site-wide contact details show
  settings: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={BG} />
      <rect x="0" y="0" width="320" height="16" rx="10" fill={DARK} />
      <Line x={14} y={6} w={52} h={4} hot />
      <Line x={74} y={6} w={74} h={4} hot />
      <rect x="0" y="16" width="320" height="18" fill="#fff" />
      <rect x="12" y="22" width="26" height="6" rx="3" fill={HOT} />
      <Line x={40} y={52} w={150} h={8} />
      <Line x={40} y={68} w={220} />
      <Line x={40} y={78} w={190} />
      <rect x="0" y="104" width="320" height="76" fill={DARK} />
      <Line x={20} y={120} w={70} h={5} hot />
      <Line x={20} y={132} w={110} h={4} hot />
      <Line x={20} y={141} w={90} h={4} hot />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={214 + i * 24} cy={134} r="8" fill="none" stroke={HOT} strokeWidth="2" />
      ))}
      <Line x={20} y={164} w={120} h={3} />
      <Marker x={162} y={8} n={1} />
      <Marker x={146} y={134} n={2} />
      <Marker x={190} y={134} n={3} />
    </>
  ),
  // Home page hero
  homeHero: (
    <>
      <Chrome />
      <rect x="0" y="16" width="320" height="164" fill={DARK} />
      <rect x={24} y={34} width={70} height={12} rx="6" fill="none" stroke={HOT} strokeWidth="1.5" />
      <Line x={24} y={58} w={150} h={10} />
      <Line x={24} y={74} w={110} h={10} hot />
      <Line x={24} y={98} w={160} h={4} />
      <Line x={24} y={107} w={130} h={4} />
      <rect x={24} y={126} width={64} height={18} rx="9" fill={HOT} />
      <rect x={96} y={126} width={64} height={18} rx="9" fill="none" stroke="#fff" />
      <Box x={212} y={36} w={88} h={124} />
      <Line x={222} y={48} w={50} h={5} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={222} y={62 + i * 22} width={68} height={14} rx="4" fill="none" stroke={i ? HOT : BLOCK} strokeWidth="1.5" />
      ))}
      <rect x={222} y={132} width={68} height={16} rx="8" fill={HOT} />
      <Marker x={106} y={40} n={1} />
      <Marker x={190} y={70} n={2} />
      <Marker x={198} y={103} n={3} />
      <Marker x={174} y={135} n={4} />
      <Marker x={302} y={92} n={5} />
    </>
  ),
  // About block: image left, text right
  about: (
    <>
      <Chrome />
      <Box x={20} y={34} w={120} h={126} hot fill={BLOCK} />
      <rect x={84} y={126} width={48} height={26} rx="6" fill="#fff" stroke={HOT} strokeWidth="1.5" />
      <Line x={166} y={36} w={44} h={4} hot />
      <Line x={166} y={48} w={126} h={9} hot />
      <Line x={166} y={70} w={130} />
      <Line x={166} y={80} w={120} />
      <Line x={166} y={90} w={100} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={170} cy={110 + i * 11} r="3" fill={HOT} />
          <Line x={178} y={108 + i * 11} w={80 + i * 8} h={4} />
        </g>
      ))}
      <rect x={166} y={144} width={62} height={16} rx="8" fill={HOT} />
      <Marker x={80} y={84} n={1} />
      <Marker x={154} y={48} n={2} />
      <Marker x={154} y={82} n={3} />
      <Marker x={154} y={121} n={4} />
      <Marker x={242} y={152} n={5} />
    </>
  ),
  // Centred heading above a block
  heading: (
    <>
      <Chrome />
      <Line x={134} y={36} w={52} h={4} hot />
      <Line x={80} y={50} w={160} h={10} hot />
      <Line x={70} y={70} w={180} h={4} hot />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={24 + i * 94} y={94} w={84} h={66} />
      ))}
      <Marker x={120} y={38} n={1} />
      <Marker x={66} y={55} n={2} />
      <Marker x={264} y={72} n={3} />
      <Marker x={160} y={127} n={4} />
    </>
  ),
  // Link preview card in a chat app
  share: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={BG} />
      <rect x="60" y="14" width="200" height="152" rx="12" fill="#fff" stroke={BLOCK} />
      <rect x="70" y="24" width="180" height="84" rx="8" fill={DARK} stroke={HOT} strokeWidth="2" />
      <Line x={96} y={56} w={128} h={8} />
      <Line x={96} y={72} w={90} h={5} />
      <Line x={70} y={118} w={150} h={7} hot />
      <Line x={70} y={134} w={176} h={4} />
      <Line x={70} y={143} w={140} h={4} />
      <Line x={70} y={155} w={70} h={3} />
      <Marker x={46} y={66} n={1} />
      <Marker x={46} y={121} n={2} />
      <Marker x={46} y={140} n={3} />
    </>
  ),
  // Footer strip, newsletter and link columns
  footer: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={BG} />
      <Line x={40} y={14} w={160} />
      <Line x={40} y={24} w={120} />
      <rect x="0" y="40" width="320" height="140" fill={DARK} />
      <Line x={20} y={54} w={130} h={8} hot />
      <Line x={20} y={68} w={100} h={4} hot />
      <rect x={236} y={52} width={66} height={18} rx="9" fill={HOT} />
      <line x1="0" x2="320" y1="84" y2="84" stroke="#2b2b66" />
      <Line x={20} y={98} w={60} h={5} hot />
      <rect x={20} y={110} width={84} height={14} rx="7" fill="none" stroke={BLOCK} />
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <Line x={138 + c * 58} y={98} w={36} h={5} hot />
          {[0, 1, 2, 3].map((r) => (
            <Line key={r} x={138 + c * 58} y={112 + r * 11} w={30 + ((r + c) % 3) * 6} h={3} />
          ))}
        </g>
      ))}
      <Marker x={166} y={61} n={1} />
      <Marker x={116} y={117} n={2} />
      <Marker x={304} y={128} n={3} />
    </>
  ),
  // Legal page: contents box left, sections right
  legal: (
    <>
      <Chrome />
      <rect x="0" y="16" width="320" height="34" fill={DARK} />
      <Line x={24} y={30} w={110} h={8} />
      <Box x={20} y={62} w={92} h={104} />
      <Line x={30} y={72} w={40} h={3} />
      <Line x={30} y={80} w={56} h={5} hot />
      {[0, 1, 2, 3, 4].map((i) => (
        <Line key={i} x={30} y={98 + i * 12} w={50 + (i % 2) * 16} h={3} />
      ))}
      <Box x={124} y={62} w={176} h={104} />
      <Line x={136} y={74} w={100} h={7} hot />
      <Line x={136} y={90} w={150} />
      <Line x={136} y={100} w={140} />
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={140} cy={117 + i * 10} r="2" fill={HOT} />
          <Line x={148} y={115 + i * 10} w={110} h={4} />
        </g>
      ))}
      <Line x={136} y={144} w={90} h={7} />
      <Marker x={98} y={82} n={1} />
      <Marker x={250} y={77} n={2} />
      <Marker x={288} y={112} n={3} />
    </>
  ),
  // Tabbed "what we handle" block
  tabs: (
    <>
      <Chrome />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={24 + i * 70} y={34} width={62} height={18} rx="9" fill={i === 1 ? HOT : "#fff"} stroke={BLOCK} />
      ))}
      <Box x={24} y={64} w={272} h={100} />
      <Line x={38} y={78} w={120} h={8} hot />
      <Line x={38} y={96} w={130} />
      <Line x={38} y={106} w={110} />
      <Line x={38} y={116} w={120} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={196} cy={82 + i * 20} r="5" fill={HOT} />
          <Line x={208} y={80 + i * 20} w={66 + (i % 2) * 10} h={4} />
        </g>
      ))}
      <Marker x={125} y={30} n={1} />
      <Marker x={170} y={82} n={2} />
      <Marker x={30} y={136} n={3} />
      <Marker x={286} y={150} n={4} />
    </>
  ),
  // Case study card
  caseStudy: (
    <>
      <Chrome />
      <Box x={18} y={34} w={88} h={130} />
      <Box x={116} y={34} w={88} h={130} hot />
      <Box x={214} y={34} w={88} h={130} />
      <rect x={122} y={40} width={76} height={50} rx="4" fill={BLOCK} />
      <rect x={126} y={98} width={34} height={10} rx="5" fill={HOT} />
      <Line x={126} y={116} w={66} h={6} hot />
      <Line x={126} y={130} w={68} h={4} />
      <Line x={126} y={139} w={56} h={4} />
      <Marker x={160} y={65} n={1} />
      <Marker x={172} y={103} n={2} />
      <Marker x={112} y={119} n={3} />
      <Marker x={112} y={139} n={4} />
    </>
  ),
  // Review card
  testimonial: (
    <>
      <Chrome />
      <Box x={60} y={34} w={200} h={130} hot />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={80 + i * 12} cy={50} r="4" fill={HOT} />
      ))}
      <Line x={74} y={66} w={170} />
      <Line x={74} y={77} w={160} />
      <Line x={74} y={88} w={130} />
      <circle cx={88} cy={132} r="13" fill={DARK} />
      <Line x={110} y={124} w={70} h={6} hot />
      <Line x={110} y={137} w={96} h={4} />
      <Marker x={46} y={78} n={1} />
      <Marker x={152} y={50} n={2} />
      <Marker x={222} y={132} n={3} />
    </>
  ),
  // Blog card + article
  blogCard: (
    <>
      <Chrome />
      <Box x={18} y={34} w={120} h={130} hot />
      <rect x={24} y={40} width={108} height={54} rx="4" fill={BLOCK} />
      <Line x={26} y={102} w={60} h={4} />
      <Line x={26} y={114} w={100} h={7} hot />
      <Line x={26} y={130} w={104} h={4} />
      <Line x={26} y={139} w={84} h={4} />
      <Box x={170} y={34} w={132} h={130} />
      <Line x={180} y={46} w={80} h={7} />
      <Line x={180} y={62} w={112} />
      <Line x={180} y={72} w={104} />
      <Line x={180} y={88} w={64} h={6} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={184} cy={106 + i * 11} r="2" fill={HOT} />
          <Line x={192} y={104 + i * 11} w={80} h={4} />
        </g>
      ))}
      <Marker x={78} y={67} n={1} />
      <Marker x={100} y={104} n={2} />
      <Marker x={150} y={117} n={3} />
      <Marker x={150} y={137} n={4} />
      <Marker x={290} y={150} n={5} />
    </>
  ),
  // Country pills
  flags: (
    <>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={DARK} />
      <Line x={110} y={48} w={100} h={5} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={34 + i * 88} y={74} width={76} height={30} rx="15" fill="none" stroke={i === 0 ? HOT : BLOCK} strokeWidth="1.5" />
          <rect x={46 + i * 88} y={83} width={16} height={12} rx="2" fill={i === 0 ? HOT : BLOCK} />
          <Line x={68 + i * 88} y={86} w={30} h={6} hot={i === 0} />
        </g>
      ))}
      <Marker x={54} y={122} n={1} />
      <Marker x={84} y={122} n={2} />
    </>
  ),
  // Icon cards
  featureCards: (
    <>
      <Chrome />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={20 + i * 96} y={44} w={86} h={110} hot={i === 0} />
          <circle cx={40 + i * 96} cy={66} r="10" fill={i === 0 ? HOT : BLOCK} />
          <Line x={30 + i * 96} y={88} w={56} h={6} hot={i === 0} />
          <Line x={30 + i * 96} y={104} w={66} h={4} />
          <Line x={30 + i * 96} y={113} w={58} h={4} />
          <Line x={30 + i * 96} y={122} w={48} h={4} />
        </g>
      ))}
      <Marker x={66} y={66} n={1} />
      <Marker x={98} y={91} n={2} />
      <Marker x={98} y={116} n={3} />
    </>
  ),
  // Numbered process steps
  steps: (
    <>
      <Chrome />
      <line x1="50" x2="270" y1="62" y2="62" stroke={BLOCK} strokeDasharray="4 4" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={50 + i * 73} cy={62} r="13" fill={i === 0 ? HOT : DARK} />
          <text x={50 + i * 73} y={66} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
            {i + 1}
          </text>
          <Line x={26 + i * 73} y={90} w={48} h={6} hot={i === 0} />
          <Line x={22 + i * 73} y={106} w={56} h={4} />
          <Line x={26 + i * 73} y={115} w={46} h={4} />
        </g>
      ))}
      <Marker x={50} y={38} n={1} />
      <Marker x={50} y={136} n={2} />
      <Marker x={123} y={136} n={3} />
    </>
  ),
  // Moving row of award badges
  badges: (
    <>
      <Chrome />
      <Line x={110} y={36} w={100} h={7} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Box x={-10 + i * 88} y={64} w={78} h={70} hot={i === 1} />
          <circle cx={29 + i * 88} cy={84} r="9" fill={i === 1 ? HOT : BLOCK} />
          <Line x={4 + i * 88} y={102} w={50} h={6} hot={i === 1} />
          <Line x={8 + i * 88} y={116} w={42} h={4} />
        </g>
      ))}
      <Marker x={144} y={84} n={1} />
      <Marker x={117} y={150} n={2} />
      <Marker x={147} y={150} n={3} />
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
