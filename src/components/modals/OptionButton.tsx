interface Props { label: string; badge?: string; onClick: () => void; }

export function OptionButton({ label, badge, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-emerald-800 hover:border-emerald-500 active:scale-95 transition-all py-4 px-3 text-zinc-100 font-medium"
    >
      {label}
      {badge && (
        <span className="absolute -top-2 -right-2 text-[10px] uppercase tracking-wide bg-emerald-500 text-white rounded-full px-2 py-0.5 font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
