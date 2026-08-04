import { useGameStore } from "../../store/gameStore";
import { CRICKET_NUMBERS } from "../../types/game";
import type { CricketNumber } from "../../types/game";

function Marks({ n }: { n: number }) {
  if (n >= 3) return <span className="text-emerald-400 font-bold">⊗</span>;
  if (n === 2) return <span className="text-amber-400 font-bold">✕</span>;
  if (n === 1) return <span className="text-amber-400">/</span>;
  return <span className="text-zinc-700">·</span>;
}

export function CricketScoreboard() {
  const players        = useGameStore((s) => s.players);
  const cricketMarks   = useGameStore((s) => s.cricketMarks);
  const cricketScores  = useGameStore((s) => s.cricketScores);
  const turnOrder      = useGameStore((s) => s.turnOrder);
  const currentTurnIdx = useGameStore((s) => s.currentTurnIdx);
  const activePid      = turnOrder[currentTurnIdx];

  const numLabel = (n: CricketNumber) => n === 25 ? "Bull" : String(n);

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-2 w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-400 text-xs uppercase tracking-wide">
            <th className="text-left py-1 px-2">Player</th>
            {CRICKET_NUMBERS.map((n) => (
              <th key={n} className="text-center py-1 px-2 min-w-[36px]">{numLabel(n)}</th>
            ))}
            <th className="text-center py-1 px-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id} className={`border-t border-zinc-800 ${p.id === activePid ? "bg-emerald-900/10" : ""}`}>
              <td className={`py-2 px-2 font-medium ${p.id === activePid ? "text-emerald-300" : "text-zinc-200"}`}>
                {p.name}
              </td>
              {CRICKET_NUMBERS.map((n) => (
                <td key={n} className="text-center py-2 px-2 text-lg leading-none">
                  <Marks n={cricketMarks[p.id]?.[n] ?? 0} />
                </td>
              ))}
              <td className="text-center py-2 px-2 font-bold font-mono text-emerald-400">
                {cricketScores[p.id] ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
