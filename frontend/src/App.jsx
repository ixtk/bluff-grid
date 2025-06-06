// App.jsx
import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./profilePage/profilepage" 

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} /> 
    </Routes>
  )
}

export default App
