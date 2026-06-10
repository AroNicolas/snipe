import GameModesSection from "./GameModesSection";

export default function IntroSection() {
  return (
    <>
        <section>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
              How to Play Darts
          </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed space-y-3">
            Darts is a precision sport where players throw small missiles at a circular board
            divided into numbered sections. The goal depends on the game mode, but accuracy,
            consistency, and strategy are always key.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 space-y-3">
            The board is divided into scoring zones: single areas, <b>double rings</b>, and <b>triple rings</b>.
            Hitting a single zone gives the base value, while the double ring multiplies the score by 2,
            and the triple ring multiplies it by 3. These zones are essential in competitive play,
            especially in X01 games where finishing requires precise doubles.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 space-y-3">
            Each player throws <b>3 darts per turn</b>, one after another, before passing the turn to the opponent.
            A full game is made of multiple rounds where consistency across all three throws is crucial to performance.
            </p>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 space-y-3">
            Players stand at a fixed distance from the board, known as the oche line:
            approximately <b>2.37 meters (7 feet 9.25 inches)</b> from the dartboard.
            This standard distance ensures fairness in all competitive matches.
            </p>
        </section>
        
        <GameModesSection />
    </>
  );
}