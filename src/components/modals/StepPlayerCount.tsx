import type { PlayerCount } from "../../types/game";
import { OptionButton } from "./OptionButton";

interface Props { onSelect: (c: PlayerCount) => void; }

const OPTIONS: { value: PlayerCount; label: string }[] = [
  { value: "1p",  label: "Solo" },
  { value: "1v1", label: "1 vs 1"   },
  { value: "2v2", label: "2 vs 2"   },
];

export function StepPlayerCount({ onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-100 mb-1">Player number</h2>
      <p className="text-sm text-zinc-400 mb-4">Choose the game format.</p>
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((o) => (
          <OptionButton key={o.value} label={o.label} onClick={() => onSelect(o.value)} />
        ))}
      </div>
    </div>
  );
}
