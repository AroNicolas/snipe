import type { HitEntry } from "../../types/dartboard";
import { zoneAccent } from "../../utils/colors";

interface Props {
  hits: HitEntry[];
}

export function HitLog({ hits }: Props) {
  if (hits.length === 0) return null;

  return (
    <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 max-h-36 overflow-y-auto flex flex-col gap-1">
      {hits.map((h) => (
        <div key={h.id} className="flex justify-between text-sm">
          <span className={`${zoneAccent(h.zone)} font-medium`}>{h.label}</span>
          <span className="text-zinc-100 font-semibold">+{h.pts}</span>
        </div>
      ))}
    </div>
  );
}