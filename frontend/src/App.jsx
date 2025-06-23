import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./components/ProfilePage"
import CreateGridPage from "./components/CreateGridPage"
import "./components/profilepage.css"
import "./App.css"

function App() {
  const [bluffGrids, setBluffGrids] = useState([])

  const addGrid = grid => {
    const id = Date.now()
    const createdAt = new Date().toLocaleDateString()
    setBluffGrids(prev => [...prev, { id, createdAt, ...grid }])
  }

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/profile"
        element={
          <ProfilePage
            bluffGrids={bluffGrids}
            onDeleteGrid={id =>
              setBluffGrids(prev => prev.filter(g => g.id !== id))
            }
            onNavigateToCreateGrid={() => {}}
          />
        }
      />
      <Route
        path="/create"
        element={
          <CreateGridPage
            onSaveGrid={grid => {
              addGrid(grid)
            }}
          />
        }
      />
    </Routes>
  )
}

export default App
