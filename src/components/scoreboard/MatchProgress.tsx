import { useGameStore } from "../../store/gameStore";
import { isTeamMode, teamLabel } from "../../utils/playerSetup";

export function MatchProgress() {
  const config            = useGameStore((s) => s.config);
  const players           = useGameStore((s) => s.players);
  const roundWins         = useGameStore((s) => s.roundWins);
  const teamRoundWinCount = useGameStore((s) => s.teamRoundWinCount);

  if (!config || config.mode === "countup") return null;

  const team      = isTeamMode(config.playerCount);
  const needed    = Math.ceil(config.bestOf / 2);
  const labelFor  = (tid: 0 | 1) =>
    team ? teamLabel(players, tid) : players.find((p) => p.teamId === tid)?.name ?? "";

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
        Match — Best of {config.bestOf} · First to {needed}
      </p>
      <div className="flex justify-around mb-3">
        {([0, 1] as const).map((tid) => (
          <div key={tid} className="text-center">
            <p className="text-sm text-zinc-300 font-medium">{labelFor(tid)}</p>
            <p className="text-4xl font-bold text-emerald-400">{teamRoundWinCount[tid]}</p>
          </div>
        ))}
      </div>
      {roundWins.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center pt-2 border-t border-zinc-800">
          {roundWins.map((rw) => (
            <span
              key={rw.roundNumber}
              className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                rw.teamId === 0
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              R{rw.roundNumber}: {labelFor(rw.teamId)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
