import "./App.css"
import { Routes, Route } from "react-router"
import { Home } from "./Home/Home"
import HomePage from "./Pages/HomePage"

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  )
}

export default App
