import type { X01Variant } from "../../types/game";
import { OptionButton } from "./OptionButton";

interface Props { onSelect: (v: X01Variant) => void; onBack: () => void; }

const VARIANTS: { value: X01Variant; badge?: string }[] = [
  { value: 301,  badge: "Beginner" },
  { value: 501,  badge: "Beginner" },
  { value: 701  },
  { value: 901  },
  { value: 1101 },
  { value: 1501 },
];

export function StepX01Variant({ onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-100 mb-1">X01 variant</h2>
      <p className="text-sm text-zinc-400 mb-4">Starting score.</p>
      <div className="grid grid-cols-3 gap-3">
        {VARIANTS.map((v) => (
          <OptionButton key={v.value} label={String(v.value)} badge={v.badge} onClick={() => onSelect(v.value)} />
        ))}
      </div>
      <button onClick={onBack} className="mt-4 text-sm text-zinc-400 hover:text-zinc-200">← Back</button>
    </div>
  );
}
