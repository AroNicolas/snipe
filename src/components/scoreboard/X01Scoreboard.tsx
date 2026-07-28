import { useGameStore } from "../../store/gameStore";

export function X01Scoreboard() {
  const players        = useGameStore((s) => s.players);
  const x01Scores      = useGameStore((s) => s.x01Scores);
  const turnOrder      = useGameStore((s) => s.turnOrder);
  const currentTurnIdx = useGameStore((s) => s.currentTurnIdx);
  const config         = useGameStore((s) => s.config);
  const currentThrows  = useGameStore((s) => s.currentThrows);
  const activePid      = turnOrder[currentTurnIdx];

  const turnPoints = currentThrows.reduce((s, t) => s + t.points, 0);

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
        Goal : {config?.x01Variant} → 0
      </p>
      <div className="grid grid-cols-2 gap-3">
        {players.map((p) => {
          const isActive  = p.id === activePid;
          const preview   = isActive ? Math.max(0, x01Scores[p.id] - turnPoints) : null;
          return (
            <div
              key={p.id}
              className={`rounded-xl px-4 py-3 text-center border ${
                isActive ? "border-emerald-600 bg-emerald-900/20" : "border-zinc-700 bg-zinc-800"
              }`}
            >
              <p className={`text-xs font-medium mb-1 ${isActive ? "text-emerald-400" : "text-zinc-400"}`}>
                {p.name}
              </p>
              <p className={`text-3xl font-bold font-mono ${isActive ? "text-emerald-300" : "text-zinc-100"}`}>
                {x01Scores[p.id]}
              </p>
              {isActive && turnPoints > 0 && (
                <p className="text-xs text-zinc-500 mt-1">→ {preview}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
