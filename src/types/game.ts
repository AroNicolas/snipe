import type { Zone } from "./dartboard";

// ─── Player / Team ──────────────────────────────────────────────────────────

export type PlayerCount = "1p" | "1v1" | "2v2";

export interface Player {
  id: number;
  name: string;
  teamId: 0 | 1;
}

// ─── Game config ─────────────────────────────────────────────────────────────

export type GameMode = "countup" | "x01" | "cricket";
export type X01Variant = 301 | 501 | 701 | 901 | 1101 | 1501;
export type BestOf = 1 | 3 | 5 | 7 | 11 | 15;

export interface GameConfig {
  playerCount: PlayerCount;
  mode: GameMode;
  x01Variant?: X01Variant;
  bestOf: BestOf;
}

// ─── Throw ───────────────────────────────────────────────────────────────────

export interface Throw {
  value: number;
  multiplier: number;
  zone: Zone;
  points: number;
  label: string;
}

// ─── Cricket ─────────────────────────────────────────────────────────────────

export const CRICKET_NUMBERS = [20, 19, 18, 17, 16, 15, 25] as const;
export type CricketNumber = typeof CRICKET_NUMBERS[number];

export interface CricketMarksState {
  [playerId: number]: Record<CricketNumber, number>;
}

// ─── Round / Match ────────────────────────────────────────────────────────────

export interface MatchRoundWin {
  roundNumber: number;
  teamId: 0 | 1;
  playerIds: number[];
}
