import { useGameStore } from "../../store/gameStore";

export function DartboardControls() {
  const cancelLastThrow = useGameStore((s) => s.cancelLastThrow);
  const registerMiss    = useGameStore((s) => s.registerMiss);
  const currentThrows   = useGameStore((s) => s.currentThrows);

  return (
    <div className="flex gap-3">
      <button
        onClick={cancelLastThrow}
        disabled={currentThrows.length === 0}
        className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-100 text-sm font-medium border border-zinc-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ↩ Cancel
      </button>
      <button
        onClick={registerMiss}
        className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-red-900 active:scale-95 text-zinc-100 text-sm font-medium border border-zinc-700 transition-all"
      >
        ✗ Miss
      </button>
    </div>
  );
}
