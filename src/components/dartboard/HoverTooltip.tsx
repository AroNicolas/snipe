import { ALL_SECTORS } from "./DartboardSVG";
import { sectorLabel } from "../../utils/colors";

interface Props {
  hoveredIdx: number | null;
  hoveredBull: "bull" | "semi" | null;
}

export function HoverTooltip({ hoveredIdx, hoveredBull }: Props) {
  return (
    <div className="h-6 text-sm font-medium text-zinc-300">
      {hoveredBull === "bull" && (
        <span className="text-red-400">Bull's-eye — 50 pts</span>
      )}
      {hoveredBull === "semi" && (
        <span className="text-green-400">Demi-bull — 25 pts</span>
      )}
      {hoveredIdx !== null && hoveredBull === null && (() => {
        const s = ALL_SECTORS[hoveredIdx];
        const pts = s.value * s.multiplier;
        return (
          <span>
            <span className={
              s.zone === "triple" ? "text-amber-400" :
              s.zone === "double" ? "text-emerald-400" :
              "text-zinc-200"
            }>
              {sectorLabel(s)}
            </span>
            <span className="text-zinc-400 ml-2">— {pts} pts</span>
          </span>
        );
      })()}
    </div>
  );
}