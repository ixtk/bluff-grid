import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./components/ProfilePage" 
import "./components/Profilepage.css"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} /> 
    </Routes>
  )
}

export default App
