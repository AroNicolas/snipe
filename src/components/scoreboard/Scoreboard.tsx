import { useGameStore } from "../../store/gameStore";
import { CountupScoreboard }  from "./CountupScoreboard";
import { X01Scoreboard }      from "./X01Scoreboard";
import { CricketScoreboard }  from "./CricketScoreboard";

export function Scoreboard() {
  const config = useGameStore((s) => s.config);
  if (!config) return null;
  if (config.mode === "countup") return <CountupScoreboard />;
  if (config.mode === "x01")     return <X01Scoreboard />;
  return <CricketScoreboard />;
}
