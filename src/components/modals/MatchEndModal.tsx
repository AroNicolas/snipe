import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../store/gameStore";
import { useConfigStore } from "../../store/configStore";
import { ModalShell } from "./ModalShell";
import { Confetti } from "./Confetti";

export function MatchEndModal() {
  const navigate         = useNavigate();
  const matchEndInfo     = useGameStore((s) => s.matchEndInfo);
  const players          = useGameStore((s) => s.players);
  const config           = useGameStore((s) => s.config);
  const startMatch       = useGameStore((s) => s.startMatch);
  const resetForCustom   = useGameStore((s) => s.resetForNewCustomGame);
  const openConfig       = useConfigStore((s) => s.openModal);

  if (!matchEndInfo) return null;

  const names = matchEndInfo.winnerPlayerIds
    .map((id) => players.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(" & ");

  function handleNewGame() {
    if (!config) return;
    startMatch(config);
  }

  function handleCustomGame() {
    resetForCustom();
    navigate("/");
    openConfig();
  }

  return (
    <>
      <Confetti />
      <ModalShell open>
        <div className="text-center">
          <p className="text-emerald-400 text-xs uppercase tracking-widest font-semibold mb-2">
            🏆 Match over
          </p>
          <h2 className="text-3xl font-bold text-zinc-100 mb-8">
            Winner: {names}
          </h2>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleNewGame}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold transition-all"
            >
              New Game
            </button>
            <button
              onClick={handleCustomGame}
              className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-100 font-semibold border border-zinc-700 transition-all"
            >
              New Game With Custom Options
            </button>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
