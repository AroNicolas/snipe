import { useState } from "react";
import type { HitEntry, Zone } from "../types/dartboard";
import { ScoreStrip } from "../components/dartboard/ScoreStrip";
import { HoverTooltip } from "../components/dartboard/HoverTooltip";
import { DartboardSVG } from "../components/dartboard/DartboardSVG";
import { HitLog } from "../components/dartboard/HitLog";

let idSeq = 0;

export default function Dartboard() {
  const [hoveredIdx,  setHoveredIdx]  = useState<number | null>(null);
  const [hoveredBull, setHoveredBull] = useState<"bull" | "semi" | null>(null);
  const [hits,        setHits]        = useState<HitEntry[]>([]);
  const [total,       setTotal]       = useState(0);

  function registerHit(pts: number, label: string, zone: Zone) {
    const entry: HitEntry = { id: idSeq++, pts, label, zone };
    setHits((prev) => [entry, ...prev].slice(0, 30));
    setTotal((t) => t + pts);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 p-6 select-none">

      <ScoreStrip total={total} hits={hits} />

      <HoverTooltip hoveredIdx={hoveredIdx} hoveredBull={hoveredBull} />

      <DartboardSVG
        hoveredIdx={hoveredIdx}
        hoveredBull={hoveredBull}
        onSectorEnter={setHoveredIdx}
        onSectorLeave={() => setHoveredIdx(null)}
        onSectorClick={registerHit}
        onBullEnter={setHoveredBull}
        onBullLeave={() => setHoveredBull(null)}
        onBullClick={registerHit}
      />

      <HitLog hits={hits} />

      {hits.length > 0 && (
        <button
          onClick={() => { setHits([]); setTotal(0); }}
          className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-100 text-sm font-medium border border-zinc-700 transition-all"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}