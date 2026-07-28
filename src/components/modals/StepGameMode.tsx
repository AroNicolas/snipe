import type { GameMode } from "../../types/game";

interface Props { onSelect: (m: GameMode) => void; onBack: () => void; }

const OPTIONS: { value: GameMode; label: string; desc: string }[] = [
  { value: "countup", label: "Count-Up", desc: "8 rounds, score cumulé"          },
  { value: "x01",     label: "X01",      desc: "301 à 1501, descendre à zéro"    },
  { value: "cricket", label: "Cricket",  desc: "15–20 & Bull, fermer les cases"  },
];

export function StepGameMode({ onSelect, onBack }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-100 mb-1">Game mode</h2>
      <p className="text-sm text-zinc-400 mb-4">Choose a variant.</p>
      <div className="flex flex-col gap-3">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            onClick={() => onSelect(o.value)}
            className="flex flex-col items-start rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-emerald-800 hover:border-emerald-500 active:scale-95 transition-all py-3 px-4 text-left"
          >
            <span className="text-zinc-100 font-semibold">{o.label}</span>
            <span className="text-xs text-zinc-400">{o.desc}</span>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-4 text-sm text-zinc-400 hover:text-zinc-200">← Back</button>
    </div>
  );
}
