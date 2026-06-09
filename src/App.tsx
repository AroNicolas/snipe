import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Dartboard from "./pages/Dartboard"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-500">
            Home
          </Link>

          <Link to="/about" className="text-blue-500">
            About
          </Link>
          
          <Link to="/dartboard" className="text-blue-500">
            Dartboard
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dartboard" element={<Dartboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}