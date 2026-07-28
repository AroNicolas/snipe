import type { Player, PlayerCount } from "../types/game";

export function buildPlayers(playerCount: PlayerCount): {
  players: Player[];
  turnOrder: number[];
} {
  if (playerCount === "1p") {
    return { players: [{ id: 0, name: "Player 1", teamId: 0 }], turnOrder: [0] };
  }
  if (playerCount === "1v1") {
    return {
      players: [
        { id: 0, name: "Player 1", teamId: 0 },
        { id: 1, name: "Player 2", teamId: 1 },
      ],
      turnOrder: [0, 1],
    };
  }
  return {
    players: [
      { id: 0, name: "Player 1", teamId: 0 },
      { id: 1, name: "Player 2", teamId: 1 },
      { id: 2, name: "Player 3", teamId: 0 },
      { id: 3, name: "Player 4", teamId: 1 },
    ],
    turnOrder: [0, 1, 2, 3],
  };
}

export function isTeamMode(playerCount: PlayerCount): boolean {
  return playerCount === "2v2";
}

export function teamLabel(players: Player[], teamId: 0 | 1): string {
  return players
    .filter((p) => p.teamId === teamId)
    .map((p) => p.name)
    .join(" & ");
}
