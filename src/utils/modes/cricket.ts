import type { CricketMarksState, CricketNumber, Player, Throw } from "../../types/game";
import { CRICKET_NUMBERS } from "../../types/game";

export const CRICKET_THROWS_PER_TURN = 3;
const MAX_MARKS = 3;

export function throwToCricketNumber(t: Throw): CricketNumber | null {
  if (t.zone === "bull" || t.zone === "semi") return 25;
  if (t.zone === "miss") return null;
  if ((CRICKET_NUMBERS as readonly number[]).includes(t.value)) return t.value as CricketNumber;
  return null;
}

export function throwMarkCount(t: Throw): number {
  if (t.zone === "bull") return 2;
  if (t.zone === "semi") return 1;
  if (t.zone === "triple") return 3;
  if (t.zone === "double") return 2;
  return 1;
}

export function emptyMarksRow(): Record<CricketNumber, number> {
  return { 20: 0, 19: 0, 18: 0, 17: 0, 16: 0, 15: 0, 25: 0 };
}

export function initCricketMarks(players: Player[]): CricketMarksState {
  const state: CricketMarksState = {};
  players.forEach((p) => { state[p.id] = emptyMarksRow(); });
  return state;
}

export function isClosedForPlayer(
  marks: CricketMarksState,
  playerId: number,
  num: CricketNumber
): boolean {
  return (marks[playerId]?.[num] ?? 0) >= MAX_MARKS;
}

export function isClosedGlobally(
  marks: CricketMarksState,
  playerIds: number[],
  num: CricketNumber
): boolean {
  return playerIds.every((pid) => isClosedForPlayer(marks, pid, num));
}

export interface CricketThrowResult {
  pointsScored: number;
}

export function applyCricketThrow(
  marks: CricketMarksState,
  players: Player[],
  playerId: number,
  t: Throw
): CricketThrowResult {
  const num = throwToCricketNumber(t);
  if (num === null) return { pointsScored: 0 };

  const allIds = players.map((p) => p.id);
  if (isClosedGlobally(marks, allIds, num)) return { pointsScored: 0 };

  const before = marks[playerId][num];
  const incoming = throwMarkCount(t);
  const cappedAfter = Math.min(before + incoming, MAX_MARKS);
  marks[playerId][num] = cappedAfter;

  const opponentIds = allIds.filter((id) => id !== playerId);
  const opponentsAllClosed = opponentIds.length > 0
    && opponentIds.every((id) => isClosedForPlayer(marks, id, num));

  let pointsScored = 0;
  if (!opponentsAllClosed) {
    const scoringMarks = Math.max(0, before + incoming - MAX_MARKS);
    pointsScored = scoringMarks * (num === 25 ? 25 : num);
  }

  return { pointsScored };
}

export function hasClosedAll(marks: CricketMarksState, playerId: number): boolean {
  return CRICKET_NUMBERS.every((n) => isClosedForPlayer(marks, playerId, n));
}

export function teamMarksRow(
  marks: CricketMarksState,
  players: Player[],
  teamId: 0 | 1
): Record<CricketNumber, number> {
  const row = emptyMarksRow();
  players
    .filter((p) => p.teamId === teamId)
    .forEach((p) => {
      CRICKET_NUMBERS.forEach((n) => {
        row[n] = Math.max(row[n], marks[p.id]?.[n] ?? 0);
      });
    });
  return row;
}

export function hasTeamClosedAll(
  marks: CricketMarksState,
  players: Player[],
  teamId: 0 | 1
): boolean {
  const row = teamMarksRow(marks, players, teamId);
  return CRICKET_NUMBERS.every((n) => row[n] >= MAX_MARKS);
}
