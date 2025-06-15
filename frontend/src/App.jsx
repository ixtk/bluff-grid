import "./App.css"
import { Routes, Route } from "react-router"
import Homepage from "./Pages/HomePage"
import { Game } from "./Pages/game/game"

function App() {
  return (
    <Routes>
    <Route index element={<Game />} />
    <Route path="/home" element={<Homepage />} />
    </Routes>
  )
}

export default App
