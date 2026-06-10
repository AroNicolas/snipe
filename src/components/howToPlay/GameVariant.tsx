import { useState } from "react";

type Mode = "COUNT_UP" | "X01" | "CRICKET";

export default function GameVariant() {
  const [active, setActive] = useState<Mode>("COUNT_UP");

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Game Variants
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setActive("COUNT_UP")}
          className={`px-4 py-2 rounded-full border transition ${
            active === "COUNT_UP"
              ? "bg-emerald-600 border-emerald-400"
              : "bg-emerald-900/40 border-white/10"
          }`}
        >
          Count-Up
        </button>

        <button
          onClick={() => setActive("X01")}
          className={`px-4 py-2 rounded-full border transition ${
            active === "X01"
              ? "bg-emerald-600 border-emerald-400"
              : "bg-emerald-900/40 border-white/10"
          }`}
        >
          X01
        </button>

        <button
          onClick={() => setActive("CRICKET")}
          className={`px-4 py-2 rounded-full border transition ${
            active === "CRICKET"
              ? "bg-emerald-600 border-emerald-400"
              : "bg-emerald-900/40 border-white/10"
          }`}
        >
          Cricket
        </button>
      </div>

      <div className="bg-emerald-950/40 border border-white/10 rounded-2xl p-5 md:p-8 transition-all shadow-lg backdrop-blur-sm">
        
        {active === "COUNT_UP" && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
              Count-Up Mode
            </h3>

            <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
              <p>
                Starting from 0, players score and accumulate points. Each player has 3 successive throws per round and tries to score the most points over 8 rounds.
              </p>

              <p>
                The <b>COUNT-UP</b> mode is designed for practice and consistency training.
              </p>

              <p>
                The game is simply the sum of all points from 24 total throws.
              </p>
            </div>
          </div>
        )}

        {active === "X01" && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
              X01 Mode
            </h3>

            <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
              <p>
                The <b>X01</b> format is one of the most standard darts game modes, widely used in professional competitions.
              </p>

              <p>
                Variants include 301, 501, 701, 901, 1101, and 1501. Beginners usually start with 301 or 501.
              </p>

              <p>
                Each player starts from a fixed score. For example, in a 301 game, all players begin at 301 points.
              </p>

              <p>
                Points scored are subtracted from the total. The objective is to reach exactly zero.
              </p>

              <p>
                To win, the final dart must bring the score to exactly zero. For example, if you have 12 remaining, you must hit double 6 or triple 4.
              </p>

              <p>
                If the score goes below zero, it is a <b>BUST</b>. The turn ends immediately and the score resets to what it was before the turn.
              </p>
            </div>
          </div>
        )}

        {active === "CRICKET" && (
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide">
              Cricket Mode
            </h3>

            <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
              <p>
                <b>Cricket</b> uses the numbers 15 through 20 and the Bullseye. All other numbers are ignored.
              </p>

              <p>
                A player must hit a number three times to open it. Once opened, any additional hits on that number score points.
              </p>

              <p>
                A triple counts as three marks and a double counts as two marks toward closing a number.
              </p>

              <p>
                When both players reach three marks on a number, it is closed and can no longer be used for scoring.
              </p>

              <p>
                The winner is determined by either closing all numbers first or having the highest score when the game ends.
              </p>

              <p>
                As long as not all numbers are closed, the game can still change completely in a single turn.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-gray-200 leading-relaxed">
                <p>
                  <span className="text-yellow-400 font-semibold mr-2">⚠️</span>
                  <b>NB:</b> The Bullseye is also a scoring zone. To close it, you need to score 3 times:
                  the outside counts as +1 and the inside as +2. If you score 4 times, the zone closes immediately.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}