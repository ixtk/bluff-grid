import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import Leaderboard from "./Pages/Leaderboard/Leaderboard";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
       <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  )
}

export default App
