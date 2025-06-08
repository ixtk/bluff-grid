import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import Lobby from "./Pages/lobby_page/LobbyPage.jsx"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/lobby"  element={<Lobby />}/>
    </Routes>
  )
}

export default App
