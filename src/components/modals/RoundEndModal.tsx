import { useGameStore } from "../../store/gameStore";
import { ModalShell } from "./ModalShell";

export function RoundEndModal() {
  const roundEndInfo  = useGameStore((s) => s.roundEndInfo);
  const players       = useGameStore((s) => s.players);
  const acknowledge   = useGameStore((s) => s.acknowledgeRoundEnd);

  if (!roundEndInfo) return null;

  const names = roundEndInfo.winnerPlayerIds
    .map((id) => players.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(" & ");

  return (
    <ModalShell open>
      <div className="text-center">
        <p className="text-emerald-400 text-xs uppercase tracking-widest font-semibold mb-2">
          Round {roundEndInfo.roundNumber} finished
        </p>
        <h2 className="text-2xl font-bold text-zinc-100 mb-6">
          🎯 {names} {roundEndInfo.winnerPlayerIds.length > 1 ? "win" : "wins"} the round {roundEndInfo.roundNumber}
        </h2>
        <button
          onClick={acknowledge}
          className="px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold transition-all"
        >
          OK — Next round
        </button>
      </div>
    </ModalShell>
  );
}
