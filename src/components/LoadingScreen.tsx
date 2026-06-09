import loadingGif from "../assets/loading.gif";

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 bg-emerald-900 flex flex-col items-center justify-center text-white transition-transform duration-700 ease-in-out"
    >
      <img src={loadingGif} alt="loading" className="w-32 h-32 mb-4 bg-white-900" />
      <p className="text-xl font-semibold animate-pulse">Loading...</p>
    </div>
  );
}