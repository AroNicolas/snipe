export type Zone = "bull" | "semi" | "triple" | "double" | "single";

export interface Sector {
  path: string;
  value: number;
  multiplier: number;
  zone: Zone;
  isRed: boolean;
}

export interface HitEntry {
  id: number;
  label: string;
  pts: number;
  zone: Zone;
}