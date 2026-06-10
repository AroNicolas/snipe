import GameModeCard from "./GameModeCard";
import soloImg from "../../assets/solo.jpg";
import onevoneImg from "../../assets/onevone.jpg";
import twovtwoImg from "../../assets/twovtwo.jpg";

export default function GameModesSection() {
  return (
    <section className="mt-10">
      
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Game modes we propose
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        <GameModeCard
          title="Solo Mode"
          description="Train and improve your accuracy alone."
          image={soloImg}
        />

        <GameModeCard
          title="1v1 Mode"
          description="Compete head-to-head with a friend."
          image={onevoneImg}
        />

        <GameModeCard
          title="2v2 Mode"
          description="Team up and strategize together."
          image={twovtwoImg}
        />
      </div>

    </section>
  );
}