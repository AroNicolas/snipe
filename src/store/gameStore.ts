import { create } from "zustand";
import type { StoreApi } from "zustand";
import type { GameConfig, Player, Throw, CricketMarksState, MatchRoundWin } from "../types/game";
import { buildPlayers, isTeamMode } from "../utils/playerSetup";
import { initCricketMarks, applyCricketThrow, hasClosedAll, hasTeamClosedAll } from "../utils/modes/cricket";
import { applyX01Turn, isX01TurnComplete } from "../utils/modes/x01";
import { isTurnComplete as isCountupDone, sumThrows, COUNTUP_TOTAL_ROUNDS } from "../utils/modes/countup";

// ─── Modal info types ────────────────────────────────────────────────────────

export interface RoundEndInfo {
  roundNumber: number;
  winnerPlayerIds: number[];
  winningTeamId: 0 | 1 | null;
}

export interface MatchEndInfo {
  winnerPlayerIds: number[];
  winningTeamId: 0 | 1 | null;
}

// ─── Store state ─────────────────────────────────────────────────────────────

interface GameStore {
  config: GameConfig | null;
  players: Player[];
  turnOrder: number[];

  currentRound: number;
  currentTurnIdx: number;
  currentThrows: Throw[];

  countupRoundScores: Record<number, number[]>;
  countupTotals: Record<number, number>;

  x01Scores: Record<number, number>;

  cricketMarks: CricketMarksState;
  cricketScores: Record<number, number>;
  cricketSnapshots: { marks: CricketMarksState; scores: Record<number, number> }[];

  roundWins: MatchRoundWin[];
  teamRoundWinCount: Record<0 | 1, number>;

  roundEndInfo: RoundEndInfo | null;
  matchEndInfo: MatchEndInfo | null;

  startMatch: (config: GameConfig) => void;
  throwDart: (t: Throw) => void;
  cancelLastThrow: () => void;
  registerMiss: () => void;
  acknowledgeRoundEnd: () => void;
  resetForNewCustomGame: () => void;
}

// ─── Internal helper types ───────────────────────────────────────────────────

type Set = StoreApi<GameStore>["setState"];
type Get = StoreApi<GameStore>["getState"];

// ─── Initial live state (reused on match reset / new round) ─────────────────

function emptyLiveState() {
  return {
    currentRound: 1,
    currentTurnIdx: 0,
    currentThrows: [] as Throw[],
    countupRoundScores: {} as Record<number, number[]>,
    countupTotals: {} as Record<number, number>,
    x01Scores: {} as Record<number, number>,
    cricketMarks: {} as CricketMarksState,
    cricketScores: {} as Record<number, number>,
    cricketSnapshots: [] as { marks: CricketMarksState; scores: Record<number, number> }[],
    roundWins: [] as MatchRoundWin[],
    teamRoundWinCount: { 0: 0, 1: 0 } as Record<0 | 1, number>,
    roundEndInfo: null as RoundEndInfo | null,
    matchEndInfo: null as MatchEndInfo | null,
  };
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set, get) => ({
  config: null,
  players: [],
  turnOrder: [],
  ...emptyLiveState(),

  startMatch: (config) => {
    const { players, turnOrder } = buildPlayers(config.playerCount);

    const countupRoundScores: Record<number, number[]> = {};
    const countupTotals: Record<number, number> = {};
    const x01Scores: Record<number, number> = {};
    const cricketScores: Record<number, number> = {};

    players.forEach((p) => {
      countupRoundScores[p.id] = [];
      countupTotals[p.id] = 0;
      x01Scores[p.id] = config.mode === "x01" ? config.x01Variant! : 0;
      cricketScores[p.id] = 0;
    });

    set({
      config, players, turnOrder,
      ...emptyLiveState(),
      countupRoundScores, countupTotals, x01Scores, cricketScores,
      cricketMarks: config.mode === "cricket" ? initCricketMarks(players) : {},
    });
  },

  throwDart: (t) => {
    const state = get();
    const { config, players, currentThrows, currentTurnIdx, turnOrder } = state;
    if (!config || state.roundEndInfo || state.matchEndInfo) return;

    const activePlayerId = turnOrder[currentTurnIdx];

    // ── Cricket ──────────────────────────────────────────────────────────────
    if (config.mode === "cricket") {
      const snapshot = {
        marks: JSON.parse(JSON.stringify(state.cricketMarks)) as CricketMarksState,
        scores: { ...state.cricketScores },
      };
      const marksCopy: CricketMarksState = JSON.parse(JSON.stringify(state.cricketMarks));
      const { pointsScored } = applyCricketThrow(marksCopy, players, activePlayerId, t);
      const newScores = {
        ...state.cricketScores,
        [activePlayerId]: state.cricketScores[activePlayerId] + pointsScored,
      };
      const newThrows = [...currentThrows, t];
      set({
        cricketMarks: marksCopy,
        cricketScores: newScores,
        currentThrows: newThrows,
        cricketSnapshots: [...state.cricketSnapshots, snapshot],
      });
      if (newThrows.length >= 3) finishTurnCricket(set, get);
      return;
    }

    // ── X01 ──────────────────────────────────────────────────────────────────
    if (config.mode === "x01") {
      const newThrows = [...currentThrows, t];
      set({ currentThrows: newThrows });
      if (isX01TurnComplete(newThrows, state.x01Scores[activePlayerId])) {
        finishTurnX01(set, get);
      }
      return;
    }

    // ── Count-up ──────────────────────────────────────────────────────────────
    const newThrows = [...currentThrows, t];
    set({ currentThrows: newThrows });
    if (isCountupDone(newThrows)) finishTurnCountup(set, get);
  },

  cancelLastThrow: () => {
    const state = get();
    const { currentThrows, config, cricketSnapshots } = state;
    if (currentThrows.length === 0) return;

    if (config?.mode === "cricket" && cricketSnapshots.length > 0) {
      const last = cricketSnapshots[cricketSnapshots.length - 1];
      set({
        currentThrows: currentThrows.slice(0, -1),
        cricketMarks: last.marks,
        cricketScores: last.scores,
        cricketSnapshots: cricketSnapshots.slice(0, -1),
      });
      return;
    }

    set({ currentThrows: currentThrows.slice(0, -1) });
  },

  registerMiss: () => {
    get().throwDart({ value: 0, multiplier: 0, zone: "miss", points: 0, label: "Raté" });
  },

  acknowledgeRoundEnd: () => {
    if (get().matchEndInfo) return;
    set({ roundEndInfo: null });
    advanceToNextRound(set, get);
  },

  resetForNewCustomGame: () => {
    set({ config: null, players: [], turnOrder: [], ...emptyLiveState() });
  },
}));

// ─── Private helpers ─────────────────────────────────────────────────────────

function advanceTurn(set: Set, get: Get): boolean {
  const { currentTurnIdx, turnOrder } = get();
  const next = (currentTurnIdx + 1) % turnOrder.length;
  set({ currentTurnIdx: next, currentThrows: [], cricketSnapshots: [] });
  return next === 0;
}

function finishTurnCountup(set: Set, get: Get) {
  const state = get();
  const {
    players, turnOrder, currentTurnIdx, currentThrows,
    countupRoundScores, countupTotals, currentRound,
  } = state;
  const pid = turnOrder[currentTurnIdx];
  const score = sumThrows(currentThrows);

  const newRoundScores = { ...countupRoundScores, [pid]: [...countupRoundScores[pid], score] };
  const newTotals      = { ...countupTotals,      [pid]: countupTotals[pid] + score };
  set({ countupRoundScores: newRoundScores, countupTotals: newTotals });

  const wrapped = advanceTurn(set, get);
  if (!wrapped) return;

  if (currentRound >= COUNTUP_TOTAL_ROUNDS) {
    const entries = players.map((p) => ({ playerId: p.id, total: newTotals[p.id] }));
    const max     = Math.max(...entries.map((e) => e.total));
    const winners = entries.filter((e) => e.total === max).map((e) => e.playerId);
    set({ matchEndInfo: { winnerPlayerIds: winners, winningTeamId: null } });
  } else {
    set({ currentRound: currentRound + 1 });
  }
}

function finishTurnX01(set: Set, get: Get) {
  const { turnOrder, currentTurnIdx, currentThrows, x01Scores, players } = get();
  const pid = turnOrder[currentTurnIdx];
  const { finalScore, checkedOut } = applyX01Turn(x01Scores[pid], currentThrows);

  set({ x01Scores: { ...x01Scores, [pid]: finalScore } });

  if (checkedOut) {
    const player = players.find((p) => p.id === pid)!;
    endRound(set, get, [pid], player.teamId);
  } else {
    advanceTurn(set, get);
  }
}

function finishTurnCricket(set: Set, get: Get) {
  const { players, config, cricketMarks, cricketScores } = get();

  if (isTeamMode(config!.playerCount)) {
    const aClose = hasTeamClosedAll(cricketMarks, players, 0);
    const bClose = hasTeamClosedAll(cricketMarks, players, 1);
    if (aClose || bClose) {
      const scoreOf = (tid: 0 | 1) =>
        players.filter((p) => p.teamId === tid).reduce((s, p) => s + cricketScores[p.id], 0);
      let winner: 0 | 1;
      if (aClose && bClose) winner = scoreOf(0) >= scoreOf(1) ? 0 : 1;
      else winner = aClose ? 0 : 1;
      endRound(set, get, players.filter((p) => p.teamId === winner).map((p) => p.id), winner);
      return;
    }
  } else {
    const closed = players.find((p) => hasClosedAll(cricketMarks, p.id));
    if (closed) { endRound(set, get, [closed.id], closed.teamId); return; }
  }

  advanceTurn(set, get);
}

function endRound(set: Set, get: Get, winnerIds: number[], winningTeamId: 0 | 1) {
  const { roundWins, teamRoundWinCount, currentRound, config } = get();
  const newWins  = [...roundWins, { roundNumber: currentRound, teamId: winningTeamId, playerIds: winnerIds }];
  const newCount = { ...teamRoundWinCount, [winningTeamId]: teamRoundWinCount[winningTeamId] + 1 };
  set({ roundWins: newWins, teamRoundWinCount: newCount });

  const needed = Math.ceil(config!.bestOf / 2);
  if (newCount[winningTeamId] >= needed) {
    set({ matchEndInfo: { winnerPlayerIds: winnerIds, winningTeamId } });
  } else {
    set({ roundEndInfo: { roundNumber: currentRound, winnerPlayerIds: winnerIds, winningTeamId } });
  }
}

function advanceToNextRound(set: Set, get: Get) {
  const { config, players, currentRound } = get();
  if (!config) return;

  const x01Scores: Record<number, number>    = {};
  const cricketScores: Record<number, number> = {};
  players.forEach((p) => {
    x01Scores[p.id]     = config.mode === "x01" ? config.x01Variant! : 0;
    cricketScores[p.id] = 0;
  });

  set({
    currentRound: currentRound + 1,
    currentTurnIdx: 0,
    currentThrows: [],
    cricketSnapshots: [],
    x01Scores,
    cricketScores,
    cricketMarks: config.mode === "cricket" ? initCricketMarks(players) : {},
  });
}
