import { useNavigate } from "react-router-dom";
import { useConfigStore } from "../../store/configStore";
import { useGameStore } from "../../store/gameStore";
import { ModalShell } from "./ModalShell";
import { StepPlayerCount } from "./StepPlayerCount";
import { StepGameMode } from "./StepGameMode";
import { StepX01Variant } from "./StepX01Variant";
import { StepBestOf } from "./StepBestOf";
import type { GameMode } from "../../types/game";

export function GameSetupModal() {
  const navigate = useNavigate();
  const { isModalOpen, step, setPlayerCount, setMode, setX01Variant, setBestOf, goToStep, closeModal } =
    useConfigStore();
  const startMatch = useGameStore((s) => s.startMatch);

  function launch() {
    const config = useConfigStore.getState().buildConfig();
    if (!config) return;
    startMatch(config);
    closeModal();
    navigate("/start");
  }

  function handleMode(mode: GameMode) {
    setMode(mode);
    if (mode === "countup") {
      useConfigStore.setState({ mode: "countup" });
      const config = useConfigStore.getState().buildConfig();
      if (config) { startMatch(config); closeModal(); navigate("/start"); }
    }
  }

  return (
    <ModalShell open={isModalOpen} onClose={closeModal}>
      {step === "players" && (
        <StepPlayerCount onSelect={setPlayerCount} />
      )}

      {step === "mode" && (
        <StepGameMode
          onSelect={handleMode}
          onBack={() => goToStep("players")}
        />
      )}

      {step === "x01-variant" && (
        <StepX01Variant
          onSelect={setX01Variant}
          onBack={() => goToStep("mode")}
        />
      )}

      {step === "best-of" && (
        <StepBestOf
          onSelect={(b) => { setBestOf(b); launch(); }}
          onBack={() => {
            const mode = useConfigStore.getState().mode;
            goToStep(mode === "x01" ? "x01-variant" : "mode");
          }}
        />
      )}
    </ModalShell>
  );
}
