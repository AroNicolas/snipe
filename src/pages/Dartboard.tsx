import { Navigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { GameDartboardSVG } from "../components/game/GameDartboardSVG";
import { DartboardControls } from "../components/game/DartboardControls";
import { CurrentTurnBanner } from "../components/game/CurrentTurnBanner";
import { Scoreboard }        from "../components/scoreboard/Scoreboard";
import { MatchProgress }     from "../components/scoreboard/MatchProgress";
import { RoundEndModal }     from "../components/modals/RoundEndModal";
import { MatchEndModal }     from "../components/modals/MatchEndModal";
import Navbar from "../components/Navbar";

export default function GamePage() {
  const config       = useGameStore((s) => s.config);
  const throwDart    = useGameStore((s) => s.throwDart);
  const roundEndInfo = useGameStore((s) => s.roundEndInfo);
  const matchEndInfo = useGameStore((s) => s.matchEndInfo);

  if (!config) return <Navigate to="/" replace />;

  const blocked = !!roundEndInfo || !!matchEndInfo;

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center gap-5 px-4 py-6">

        <div className="w-full max-w-xl">
          <MatchProgress />
        </div>

        <CurrentTurnBanner />

        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 w-full max-w-5xl justify-center">

          <div className="flex flex-col items-center gap-4">
            <GameDartboardSVG
              mode={config.mode}
              onThrow={throwDart}
              disabled={blocked}
            />
            <DartboardControls />
          </div>

          <div className="w-full max-w-lg xl:max-w-sm flex flex-col gap-4">
            <Scoreboard />
          </div>
        </div>

      </main>

      <RoundEndModal />
      <MatchEndModal />
    </div>
  );
}
