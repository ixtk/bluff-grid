import React, { useState } from "react"
import "../Pages/profileSection.css"
import { LogOut, Pencil, Plus, Trash2, Check, X } from "lucide-react"

const ProfileSection = () => {
  const [avatar, setAvatar] = useState(null)
  const [bluffGrids, setBluffGrids] = useState([
    { id: 1, title: "My childhood", createdAt: "2025-05-11" }
  ])
  const [editingId, setEditingId] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")

  const handleAvatarChange = e => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
    }
  }

  const handleAddGrid = () => {
    const title = prompt("Enter grid title:")
    if (title && title.trim() !== "") {
      const newGrid = {
        id: Date.now(),
        title: title.trim(),
        createdAt: new Date().toISOString().split("T")[0]
      }
      setBluffGrids([newGrid, ...bluffGrids])
    }
  }

  const handleDeleteGrid = id => {
    if (window.confirm("Are you sure you want to delete this grid?")) {
      setBluffGrids(bluffGrids.filter(grid => grid.id !== id))
    }
  }

  const handleStartEdit = (id, currentTitle) => {
    setEditingId(id)
    setEditedTitle(currentTitle)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditedTitle("")
  }

  const handleSaveEdit = id => {
    if (editedTitle.trim() !== "") {
      setBluffGrids(
        bluffGrids.map(grid =>
          grid.id === id ? { ...grid, title: editedTitle.trim() } : grid
        )
      )
    }
    handleCancelEdit()
  }

  return (
    <div className="profile-wrapper">
      <header className="profile-header">
        <h1 className="logo">Bluff Grid</h1>
        <div className="header-right">
          <span className="username">demo</span>
          <label className="avatar-circle small">
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatar && <img src={avatar} alt="Avatar" />}
          </label>
          <button className="logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-card">
          <h2>My Profile</h2>
          <p>Manage your account and bluff grids</p>
          <label className="avatar-circle large">
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatar && <img src={avatar} alt="Profile Avatar" />}
          </label>
          <h3>demo</h3>
          <p className="joined-date">Member since 11.05.2025</p>
        </section>

        <section className="bluff-grid-section">
          <div className="bluff-grid-header">
            <h2>My Bluff Grids</h2>
            <button className="btn-primary" onClick={handleAddGrid}>
              <Plus size={16} /> Add a New Bluff Grid
            </button>
          </div>

          {bluffGrids.length > 0 ? (
            <ul className="grid-list">
              {bluffGrids.map(grid => (
                <li key={grid.id} className="grid-item">
                  <div>
                    {editingId === grid.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={e => setEditedTitle(e.target.value)}
                          className="grid-title-input"
                          autoFocus
                        />
                        <p>Created on {grid.createdAt}</p>
                      </>
                    ) : (
                      <>
                        <strong>{grid.title}</strong>
                        <p>Created on {grid.createdAt}</p>
                      </>
                    )}
                  </div>
                  <div className="grid-actions">
                    {editingId === grid.id ? (
                      <>
                        <button
                          className="icon-btn"
                          onClick={() => handleSaveEdit(grid.id)}
                        >
                          <Check size={18} />
                        </button>
                        <button className="icon-btn" onClick={handleCancelEdit}>
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="icon-btn"
                          onClick={() => handleStartEdit(grid.id, grid.title)}
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => handleDeleteGrid(grid.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-grids">
              <p>You haven't created any bluff grids yet.</p>
              <button className="btn-outline" onClick={handleAddGrid}>
                <Plus size={16} /> Create Your First Grid
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default ProfileSection
