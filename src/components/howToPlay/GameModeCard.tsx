type Props = {
  title: string;
  description: string;
  image: string;
};

export default function GameModeCard({ title, description, image }: Props) {
  return (
    <div className="bg-emerald-900/40 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300">
      <div className="p-4">
        <h4 className="text-lg md:text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-300 text-sm md:text-base">
          {description}
        </p>
      </div>
      
      <div className="h-40 md:h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}