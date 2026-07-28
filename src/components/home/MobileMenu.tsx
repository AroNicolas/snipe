import { Link } from "react-router-dom";

export default function MobileMenu({
  open,
  onClose,
  onStart,
}: {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-[70%] max-w-[260px]
          bg-emerald-800 text-white z-50
          p-4 md:p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button className="text-2xl mb-6" onClick={onClose}>
          ✕
        </button>

        <div className="flex flex-col gap-5 text-lg">
          <Link onClick={onClose} to="/">Home</Link>
          <Link onClick={onClose} to="/how-to-play">How to play</Link>
          <button
            onClick={() => { onClose(); onStart(); }}
            className="text-left font-medium"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}
