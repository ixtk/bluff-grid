import "./App.css"
import { Routes, Route } from "react-router"
import { Game } from "./Pages/game/game.jsx"

function App() {
  return (
    <Routes>
      <Route index element={<Game />} />
    </Routes>
  )
}

export default App
