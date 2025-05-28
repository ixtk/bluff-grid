import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfileSection from "./Pages/ProfileSection"

function App() {
  return (
    <Routes>
      {/* <Route index element={<HomePage />} /> */}
      <Route index element={<ProfileSection />} />
    </Routes>
  )
}

export default App
