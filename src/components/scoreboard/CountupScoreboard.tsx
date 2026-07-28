import { useGameStore } from "../../store/gameStore";
import { COUNTUP_TOTAL_ROUNDS } from "../../utils/modes/countup";

export function CountupScoreboard() {
  const players           = useGameStore((s) => s.players);
  const countupRoundScores = useGameStore((s) => s.countupRoundScores);
  const countupTotals     = useGameStore((s) => s.countupTotals);
  const currentRound      = useGameStore((s) => s.currentRound);
  const turnOrder         = useGameStore((s) => s.turnOrder);
  const currentTurnIdx    = useGameStore((s) => s.currentTurnIdx);
  const activePid         = turnOrder[currentTurnIdx];

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-400 text-xs uppercase tracking-wide">
            <th className="text-left py-1 px-2">Round</th>
            {players.map((p) => (
              <th key={p.id} className={`text-center py-1 px-2 ${p.id === activePid ? "text-emerald-400" : ""}`}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: COUNTUP_TOTAL_ROUNDS }, (_, i) => (
            <tr key={i} className={`border-t border-zinc-800 ${i + 1 === currentRound ? "bg-emerald-900/10" : ""}`}>
              <td className="py-1.5 px-2 text-zinc-500">{i + 1}</td>
              {players.map((p) => (
                <td key={p.id} className="text-center py-1.5 px-2 text-zinc-200 font-mono">
                  {countupRoundScores[p.id]?.[i] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-700">
            <td className="py-2 px-2 text-zinc-300 font-semibold">Total</td>
            {players.map((p) => (
              <td key={p.id} className="text-center py-2 px-2 text-emerald-400 font-bold font-mono">
                {countupTotals[p.id] ?? 0}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
