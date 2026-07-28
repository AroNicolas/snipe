import { useEffect, useState } from "react";

interface Piece { id: number; left: number; delay: number; duration: number; color: string; }

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#eab308", "#ec4899"];

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.5,
        color: COLORS[i % COLORS.length],
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-10px] block w-2.5 h-4 rounded-sm opacity-90"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animation: `confetti-drop ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-drop {
          0%   { transform: translateY(0) rotate(0deg);    opacity: 1;   }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
