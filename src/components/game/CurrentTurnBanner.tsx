import { useGameStore } from "../../store/gameStore";

export function CurrentTurnBanner() {
  const players       = useGameStore((s) => s.players);
  const turnOrder     = useGameStore((s) => s.turnOrder);
  const currentTurnIdx = useGameStore((s) => s.currentTurnIdx);
  const currentThrows = useGameStore((s) => s.currentThrows);
  const currentRound  = useGameStore((s) => s.currentRound);
  const config        = useGameStore((s) => s.config);

  const pid    = turnOrder[currentTurnIdx];
  const player = players.find((p) => p.id === pid);
  if (!player) return null;

  const maxThrows = 3;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {config && config.mode !== "countup" && (
        <p className="text-xs text-zinc-500 uppercase tracking-widest">Round {currentRound}</p>
      )}
      {config && config.mode === "countup" && (
        <p className="text-xs text-zinc-500 uppercase tracking-widest">
          Round {currentRound} / 8
        </p>
      )}

      <div className="px-5 py-1.5 rounded-full bg-emerald-700/20 border border-emerald-700/50 text-emerald-400 text-sm font-semibold">
        {player.name} turn
      </div>

      <div className="flex gap-2">
        {Array.from({ length: maxThrows }, (_, i) => {
          const t = currentThrows[i];
          return (
            <div
              key={i}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center text-xs font-mono font-semibold ${
                t
                  ? t.zone === "miss"
                    ? "bg-zinc-900 border-red-700 text-red-400"
                    : "bg-zinc-800 border-emerald-600 text-emerald-300"
                  : "bg-zinc-900 border-zinc-700 text-zinc-600"
              }`}
            >
              {t ? (t.zone === "miss" ? "✗" : t.points) : "—"}
            </div>
          );
        })}
      </div>
    </div>
  );
}
