import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import Lobby from "./Pages/lobby_page/LobbyPage.jsx"
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route index element={<Layout />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/lobby"  element={<Lobby />}/>
    </Routes>
  )
}

export default App
