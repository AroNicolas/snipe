import type { BestOf } from "../../types/game";
import { OptionButton } from "./OptionButton";

interface Props { onSelect: (b: BestOf) => void; onBack: () => void; }

const OPTIONS: BestOf[] = [1, 3, 5, 7, 11, 15];

export function StepBestOf({ onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-100 mb-1">Match format</h2>
      <p className="text-sm text-zinc-400 mb-4">Best of N rounds.</p>
      <div className="grid grid-cols-3 gap-3">
        {OPTIONS.map((b) => (
          <OptionButton key={b} label={`Best of ${b}`} onClick={() => onSelect(b)} />
        ))}
      </div>
      <button onClick={onBack} className="mt-4 text-sm text-zinc-400 hover:text-zinc-200">← Back</button>
    </div>
  );
}
