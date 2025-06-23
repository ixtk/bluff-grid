import "./App.css"
import { Routes, Route } from "react-router"
import { Home } from "./Home/Home"
import Homepage from "./Pages/HomePage.jsx"
import { Game } from "./Pages/game/game"
import Layout from "./components/Layout.jsx"
import Lobby from "./Pages/lobby_page/LobbyPage.jsx"
import Leaderboard from "./Pages/Leaderboard/Leaderboard"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/lobby" element={<Lobby />} />
      </Route>
    </Routes>
  )
}

export default App
