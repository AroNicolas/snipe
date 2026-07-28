import type { Throw } from "../../types/game";

export const COUNTUP_TOTAL_ROUNDS = 8;
export const COUNTUP_THROWS_PER_TURN = 3;

export function sumThrows(throws: Throw[]): number {
  return throws.reduce((acc, t) => acc + t.points, 0);
}

export function isTurnComplete(throws: Throw[]): boolean {
  return throws.length >= COUNTUP_THROWS_PER_TURN;
}

export function getCountupMatchWinners(
  totals: { playerId: number; total: number }[]
): number[] {
  const max = Math.max(...totals.map((t) => t.total));
  return totals.filter((t) => t.total === max).map((t) => t.playerId);
}
