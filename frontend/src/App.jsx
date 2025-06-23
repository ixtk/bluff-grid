import "./App.css"
import { Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./components/ProfilePage"
import CreateGridPage from "./components/CreateGridPage"
import "./components/profilepage.css"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="/profile"
        element={<ProfilePage onDeleteGrid={id => console.log("Delete", id)} />}
      />
      <Route
        path="/create"
        element={
          <CreateGridPage
            onNavigateToProfile={() => (window.location.href = "/profile")}
            onSaveGrid={grid => {
              console.log("Saved grid:", grid)
              window.location.href = "/profile"
            }}
          />
        }
      />
    </Routes>
  )
}

export default App
