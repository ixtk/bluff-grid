import "./App.css"
import { Routes, Route } from "react-router"
import { Game } from "./Pages/game/game"

import HomePage from "./Pages/HomePage"
import Lobby from "./Pages/lobby_page/LobbyPage.jsx"
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/lobby"  element={<Lobby />}/>
    </Routes>
  )
}

export default App
