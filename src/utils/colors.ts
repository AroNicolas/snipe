import type { Zone, Sector } from "../types/dartboard";

export function fillColor(zone: Zone, isRed: boolean): string {
  if (zone === "single") return isRed ? "#1c1c1c" : "#f0e8d4";
  if (zone === "triple" || zone === "double") return isRed ? "#b91c1c" : "#166534";
  return "#fff";
}

export function hoverFill(zone: Zone, isRed: boolean): string {
  if (zone === "single") return isRed ? "#3f3f3f" : "#fefce8";
  if (zone === "triple") return isRed ? "#ef4444" : "#22c55e";
  if (zone === "double") return isRed ? "#ef4444" : "#22c55e";
  return "#fff";
}

export function zoneAccent(zone: Zone): string {
  switch (zone) {
    case "bull":   return "text-red-400";
    case "semi":   return "text-green-400";
    case "triple": return "text-amber-400";
    case "double": return "text-emerald-400";
    default:       return "text-zinc-300";
  }
}

export function sectorLabel(s: Sector): string {
  if (s.multiplier === 3) return `Triple ${s.value}`;
  if (s.multiplier === 2) return `Double ${s.value}`;
  return String(s.value);
}