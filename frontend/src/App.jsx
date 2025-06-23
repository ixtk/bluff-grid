import { useState } from "react"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./components/ProfilePage"
import CreateGridPage from "./components/CreateGridPage"
import "./components/profilepage.css"
import "./App.css"
import "./App.css"
import { Game } from "./Pages/game/game"
import Layout from "./components/Layout.jsx"

import Lobby from "./Pages/lobby_page/LobbyPage.jsx"
import Leaderboard from "./Pages/Leaderboard/Leaderboard"

function App() {
  const [bluffGrids, setBluffGrids] = useState([])

  const addGrid = grid => {
    const id = Date.now()
    const createdAt = new Date().toLocaleDateString()
    setBluffGrids(prev => [...prev, { id, createdAt, ...grid }])
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/profile"
          element={
            <ProfilePage
              bluffGrids={bluffGrids}
              onDeleteGrid={id =>
                setBluffGrids(prev => prev.filter(g => g.id !== id))
              }
              onNavigateToCreateGrid={() => {}}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateGridPage
              onSaveGrid={grid => {
                addGrid(grid)
              }}
            />
          }
        />
        <Route index element={<HomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/lobby" element={<Lobby />} />
      </Route>
    </Routes>
  )
}

export default App

