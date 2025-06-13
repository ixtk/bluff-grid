import "./App.css"
import { Routes, Route } from "react-router"
import { Homepage } from "./Pages/HomePage"
import { Game } from "./Pages/GamePage"

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}

export default App
