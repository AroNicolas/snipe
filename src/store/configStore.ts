import { create } from "zustand";
import type { BestOf, GameConfig, GameMode, PlayerCount, X01Variant } from "../types/game";

type Step = "players" | "mode" | "x01-variant" | "best-of";

interface ConfigStore {
  isModalOpen: boolean;
  step: Step;
  playerCount: PlayerCount | null;
  mode: GameMode | null;
  x01Variant: X01Variant | null;
  bestOf: BestOf | null;

  openModal: () => void;
  closeModal: () => void;
  setPlayerCount: (c: PlayerCount) => void;
  setMode: (m: GameMode) => void;
  setX01Variant: (v: X01Variant) => void;
  setBestOf: (b: BestOf) => void;
  goToStep: (s: Step) => void;
  buildConfig: () => GameConfig | null;
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  isModalOpen: false,
  step: "players",
  playerCount: null,
  mode: null,
  x01Variant: null,
  bestOf: null,

  openModal: () =>
    set({ isModalOpen: true, step: "players", playerCount: null, mode: null, x01Variant: null, bestOf: null }),
  closeModal: () => set({ isModalOpen: false }),

  setPlayerCount: (c) => set({ playerCount: c, step: "mode" }),

  setMode: (m) => {
    if (m === "countup") set({ mode: m });
    else if (m === "x01") set({ mode: m, step: "x01-variant" });
    else set({ mode: m, step: "best-of" });
  },

  setX01Variant: (v) => set({ x01Variant: v, step: "best-of" }),
  setBestOf: (b) => set({ bestOf: b }),
  goToStep: (s) => set({ step: s }),

  buildConfig: () => {
    const { playerCount, mode, x01Variant, bestOf } = get();
    if (!playerCount || !mode) return null;
    if (mode === "countup") return { playerCount, mode, bestOf: 1 };
    if (mode === "x01" && x01Variant && bestOf) return { playerCount, mode, x01Variant, bestOf };
    if (mode === "cricket" && bestOf) return { playerCount, mode, bestOf };
    return null;
  },
}));
