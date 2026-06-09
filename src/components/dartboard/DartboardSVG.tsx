import { CX, CY, R, SECTORS_ORDER, polarToCart, buildSectors } from "../../utils/geometry";
import { fillColor, hoverFill, sectorLabel } from "../../utils/colors";
import type { Zone } from "../../types/dartboard";

export const ALL_SECTORS = buildSectors();

const sliceDeg = 360 / 20;
const offsetDeg = -90 - sliceDeg / 2;

const NUMBER_LABELS = SECTORS_ORDER.map((value, i) => {
  const angle = offsetDeg + i * sliceDeg + sliceDeg / 2;
  const pos = polarToCart(CX, CY, R.NUMBERS, angle);
  return { value, ...pos };
});

interface Props {
  hoveredIdx: number | null;
  hoveredBull: "bull" | "semi" | null;
  onSectorEnter: (i: number) => void;
  onSectorLeave: () => void;
  onSectorClick: (pts: number, label: string, zone: Zone) => void;
  onBullEnter: (b: "bull" | "semi") => void;
  onBullLeave: () => void;
  onBullClick: (pts: number, label: string, zone: Zone) => void;
}

export function DartboardSVG({
  hoveredIdx,
  hoveredBull,
  onSectorEnter,
  onSectorLeave,
  onSectorClick,
  onBullEnter,
  onBullLeave,
  onBullClick,
}: Props) {
  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full max-w-[440px] drop-shadow-2xl"
      aria-label="Cible de flèchettes"
      role="img"
    >
      {/* Outer surround */}
      <circle cx={CX} cy={CY} r={R.DOUBLE_OUT + 14} fill="#111" stroke="#444" strokeWidth="2" />

      {/* All numbered sectors */}
      {ALL_SECTORS.map((s, i) => (
        <path
          key={i}
          d={s.path}
          fill={hoveredIdx === i ? hoverFill(s.zone, s.isRed) : fillColor(s.zone, s.isRed)}
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="0.5"
          className="cursor-pointer transition-colors duration-100"
          onMouseEnter={() => onSectorEnter(i)}
          onMouseLeave={onSectorLeave}
          onClick={() => onSectorClick(s.value * s.multiplier, sectorLabel(s), s.zone)}
        />
      ))}

      {/* Semi-bull */}
      <circle
        cx={CX} cy={CY} r={R.SEMI_BULL}
        fill={hoveredBull === "semi" ? "#16a34a" : "#166534"}
        stroke="#111" strokeWidth="1"
        className="cursor-pointer transition-colors duration-100"
        onMouseEnter={() => onBullEnter("semi")}
        onMouseLeave={onBullLeave}
        onClick={() => onBullClick(25, "Demi-bull", "semi")}
      />

      {/* Bull's-eye */}
      <circle
        cx={CX} cy={CY} r={16}
        fill={hoveredBull === "bull" ? "#ef4444" : "#b91c1c"}
        stroke="#111" strokeWidth="1"
        className="cursor-pointer transition-colors duration-100"
        onMouseEnter={() => onBullEnter("bull")}
        onMouseLeave={onBullLeave}
        onClick={() => onBullClick(50, "Bull's-eye", "bull")}
      />

      {/* Sector wire lines */}
      {SECTORS_ORDER.map((_, i) => {
        const angle = offsetDeg + i * sliceDeg;
        const inner = polarToCart(CX, CY, R.SEMI_BULL, angle);
        const outer = polarToCart(CX, CY, R.DOUBLE_OUT, angle);
        return (
          <line
            key={`wire-${i}`}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="rgba(60,60,60,0.7)" strokeWidth="0.8"
            pointerEvents="none"
          />
        );
      })}

      {/* Ring outlines */}
      {[R.SEMI_BULL, R.TRIPLE_IN, R.TRIPLE_OUT, R.DOUBLE_IN, R.DOUBLE_OUT].map((r) => (
        <circle
          key={r} cx={CX} cy={CY} r={r}
          fill="none" stroke="rgba(60,60,60,0.7)" strokeWidth="0.8"
          pointerEvents="none"
        />
      ))}

      {/* Number labels */}
      {NUMBER_LABELS.map(({ value, x, y }) => (
        <text
          key={value}
          x={x} y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="16"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          fill="#f0e4c0"
          style={{ pointerEvents: "none" }}
        >
          {value}
        </text>
      ))}
    </svg>
  );
}