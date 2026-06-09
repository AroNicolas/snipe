import type { HitEntry } from "../../types/dartboard";

interface Props {
  total: number;
  hits: HitEntry[];
}

export function ScoreStrip({ total, hits }: Props) {
  const best = hits.reduce((m, h) => Math.max(m, h.pts), 0) || 0;

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {[
        { label: "Score",   value: total       },
        { label: "Flèches", value: hits.length  },
        { label: "Meilleur", value: best        },
      ].map(({ label, value }) => (
        <div key={label} className="bg-zinc-800 rounded-xl px-5 py-3 text-center min-w-[88px] border border-zinc-700">
          <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium">{label}</p>
          <p className="text-2xl font-semibold text-zinc-100 font-mono mt-0.5">{value}</p>
        </div>
      ))}
    </div>
  );
}