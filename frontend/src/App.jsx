import "./App.css"
import { Routes, Route } from "react-router"
import Homepage from "./Pages/HomePage.jsx"
import { Game } from "./Pages/game/game"
import Layout from "./components/Layout.jsx"

import Lobby from "./Pages/lobby_page/LobbyPage.jsx"
import Leaderboard from "./Pages/Leaderboard/Leaderboard"

function App() {
  return (
    <Routes>
      {/* an ici rogor jobia */}
      {/* mokled gakvetilis kodshi chaixede xolme tore gpt arasworad wers zog rames */}
      {/* araswore ra aris?? anu yvelaferi xom mushaobs da iss errori tqventganac gasworda  */}
      {/* ki mara mouxerxeblad aris layout exla. layout.jsx shi davamate outlet */}
      {/* da aq exla ese vizamt */}
      {/* exla naxe saiti ra dagxvdeba :D */}
      {/* ori header unda dagxvdes mgoni  k i */}
      {/* xoda naxe exla */}
      {/* 
      
        homepage shi datove marto satauri <h1>home</h1> an rame
        da layoutshi geweros header da rac ari
        homepage dan amoige loginis logika
        gadavidet i t homepageshi
      
      */}
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/lobby" element={<Lobby />} />
      </Route>
    </Routes>
  )
}

export default App
