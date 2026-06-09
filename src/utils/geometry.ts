import type { Sector } from "../types/dartboard";

export const CX = 250;
export const CY = 250;
export const SECTORS_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

export const R = {
  SEMI_BULL: 36,
  TRIPLE_IN: 110,
  TRIPLE_OUT: 122,
  DOUBLE_IN: 178,
  DOUBLE_OUT: 193,
  NUMBERS: 214,
};

export function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function arcPath(r1: number, r2: number, startDeg: number, endDeg: number): string {
  const s1 = polarToCart(CX, CY, r1, startDeg);
  const s2 = polarToCart(CX, CY, r2, startDeg);
  const e1 = polarToCart(CX, CY, r1, endDeg);
  const e2 = polarToCart(CX, CY, r2, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s2.x} ${s2.y}`,
    `A ${r2} ${r2} 0 ${large} 1 ${e2.x} ${e2.y}`,
    `L ${e1.x} ${e1.y}`,
    `A ${r1} ${r1} 0 ${large} 0 ${s1.x} ${s1.y}`,
    "Z",
  ].join(" ");
}

export function buildSectors(): Sector[] {
  const sliceDeg = 360 / 20;
  const offsetDeg = -90 - sliceDeg / 2;
  const sectors: Sector[] = [];

  SECTORS_ORDER.forEach((value, i) => {
    const start = offsetDeg + i * sliceDeg;
    const end = start + sliceDeg;
    const isRed = i % 2 === 0;

    sectors.push({ path: arcPath(R.SEMI_BULL, R.TRIPLE_IN, start, end), value, multiplier: 1, zone: "single", isRed });
    sectors.push({ path: arcPath(R.TRIPLE_IN, R.TRIPLE_OUT, start, end), value, multiplier: 3, zone: "triple", isRed });
    sectors.push({ path: arcPath(R.TRIPLE_OUT, R.DOUBLE_IN, start, end), value, multiplier: 1, zone: "single", isRed });
    sectors.push({ path: arcPath(R.DOUBLE_IN, R.DOUBLE_OUT, start, end), value, multiplier: 2, zone: "double", isRed });
  });

  return sectors;
}