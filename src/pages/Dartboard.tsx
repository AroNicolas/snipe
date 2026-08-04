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
import PlayBackground from "../assets/playbackground.jpg";

export default function GamePage() {
  const config       = useGameStore((s) => s.config);
  const throwDart    = useGameStore((s) => s.throwDart);
  const roundEndInfo = useGameStore((s) => s.roundEndInfo);
  const matchEndInfo = useGameStore((s) => s.matchEndInfo);

  if (!config) return <Navigate to="/" replace />;

  const blocked = !!roundEndInfo || !!matchEndInfo;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

    <main className="relative flex-1 flex flex-col items-center gap-5 px-4 py-6 overflow-hidden">

    <div
      className="absolute inset-0 bg-cover bg-center -z-10"
      style={{ backgroundImage: `url(${PlayBackground})` }}
    />

    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10" />


    <div className="relative z-10 w-full max-w-xl">
      <MatchProgress />
    </div>

    <div className="relative z-10">
      <CurrentTurnBanner />
    </div>

    <div className="relative z-10 flex flex-col xl:flex-row items-center xl:items-start gap-8 w-full max-w-5xl justify-center">

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

    <RoundEndModal />
    <MatchEndModal />

  </main>
</div>
);
}
