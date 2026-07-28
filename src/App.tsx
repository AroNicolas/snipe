import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import HowToPlay from "./pages/HowToPlay";
import GamePage from "./pages/Dartboard";
import { GameSetupModal } from "./components/modals/GameSetupModal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => setLoading(false), 700);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

      {!loading && (
        <>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/start" element={<GamePage />} />
          </Routes>

          <GameSetupModal />
        </>
      )}
    </>
  );
}
