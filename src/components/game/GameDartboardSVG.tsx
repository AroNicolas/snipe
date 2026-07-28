import { useState } from "react";
import { CX, CY, R, SECTORS_ORDER, polarToCart, buildSectors } from "../../utils/geometry";
import { fillColor, hoverFill } from "../../utils/colors";
import { makeThrow, makeBullThrow } from "../../utils/resolveThrow";
import { CRICKET_NUMBERS } from "../../types/game";
import type { GameMode, Throw } from "../../types/game";

const ALL_SECTORS = buildSectors();
const SLICE_DEG   = 360 / 20;
const OFFSET_DEG  = -90 - SLICE_DEG / 2;
const OUTER_RADIUS        = R.DOUBLE_OUT + 30;
const NUMBER_LABEL_RADIUS = (R.DOUBLE_OUT + OUTER_RADIUS) / 2;

const NUMBER_LABELS = SECTORS_ORDER.map((value, i) => {
  const angle = OFFSET_DEG + i * SLICE_DEG + SLICE_DEG / 2;
  return { value, ...polarToCart(CX, CY, NUMBER_LABEL_RADIUS, angle) };
});

interface Props {
  mode: GameMode;
  onThrow: (t: Throw) => void;
  disabled?: boolean;
}

export function GameDartboardSVG({ mode, onThrow, disabled = false }: Props) {
  const [hoveredIdx,  setHoveredIdx]  = useState<number | null>(null);
  const [hoveredBull, setHoveredBull] = useState<"bull" | "semi" | null>(null);

  const isCricket = mode === "cricket";
  const isActive  = (value: number) =>
    !isCricket || (CRICKET_NUMBERS as readonly number[]).includes(value);

  function handleSector(value: number, multiplier: number, zoneKind: "single" | "triple" | "double") {
    if (disabled || !isActive(value)) return;
    onThrow(makeThrow(value, multiplier, zoneKind));
  }

  function handleBull(kind: "bull" | "semi") {
    if (disabled) return;
    onThrow(makeBullThrow(kind));
  }

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full max-w-[440px] drop-shadow-2xl"
      aria-label="Dartboard"
      role="img"
    >
      {/* Outer surround */}
      <circle cx={CX} cy={CY} r={OUTER_RADIUS} fill="#111" stroke="#444" strokeWidth="2" />

      {/* Sectors */}
      {ALL_SECTORS.map((s, i) => {
        const active  = isActive(s.value) && !disabled;
        const hovered = hoveredIdx === i && active;
        // Sectors from buildSectors() are always single/triple/double, never bull/semi/miss
        const zoneKind = s.zone as "single" | "triple" | "double";
        return (
          <path
            key={i}
            d={s.path}
            fill={hovered ? hoverFill(s.zone, s.isRed) : fillColor(s.zone, s.isRed)}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="0.5"
            opacity={active ? 1 : 0.3}
            className={active ? "cursor-pointer transition-colors duration-100" : "cursor-not-allowed"}
            onMouseEnter={() => { if (active) setHoveredIdx(i); }}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => handleSector(s.value, s.multiplier, zoneKind)}
          />
        );
      })}

      {/* Semi-bull (outer) */}
      <circle
        cx={CX} cy={CY} r={R.SEMI_BULL}
        fill={hoveredBull === "semi" && !disabled ? "#16a34a" : "#166534"}
        stroke="#111" strokeWidth="1"
        className={disabled ? "cursor-not-allowed" : "cursor-pointer transition-colors duration-100"}
        onMouseEnter={() => setHoveredBull("semi")}
        onMouseLeave={() => setHoveredBull(null)}
        onClick={() => handleBull("semi")}
      />

      {/* Bull's-eye (inner) */}
      <circle
        cx={CX} cy={CY} r={16}
        fill={hoveredBull === "bull" && !disabled ? "#ef4444" : "#b91c1c"}
        stroke="#111" strokeWidth="1"
        className={disabled ? "cursor-not-allowed" : "cursor-pointer transition-colors duration-100"}
        onMouseEnter={() => setHoveredBull("bull")}
        onMouseLeave={() => setHoveredBull(null)}
        onClick={() => handleBull("bull")}
      />

      {/* Wire dividers */}
      {SECTORS_ORDER.map((_, i) => {
        const angle = OFFSET_DEG + i * SLICE_DEG;
        const inner = polarToCart(CX, CY, R.SEMI_BULL,  angle);
        const outer = polarToCart(CX, CY, R.DOUBLE_OUT, angle);
        return (
          <line
            key={`w${i}`}
            x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
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
          key={value} x={x} y={y}
          textAnchor="middle" dominantBaseline="central"
          fontSize="16" fontWeight="bold" fontFamily="Georgia, serif"
          fill={isActive(value) ? "#f0e4c0" : "#444"}
          style={{ pointerEvents: "none" }}
        >
          {value}
        </text>
      ))}

      {/* Cricket hint */}
      {isCricket && (
        <text
          x={CX} y={488} textAnchor="middle"
          fontSize="11" fill="#6b7280"
          style={{ pointerEvents: "none" }}
        >
          Cricket — active zones : 15 · 16 · 17 · 18 · 19 · 20 · Bull
        </text>
      )}
    </svg>
  );
}
