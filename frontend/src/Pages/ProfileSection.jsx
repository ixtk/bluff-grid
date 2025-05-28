import React, { useState } from "react"


const ProfileSection = () => {
  const [bluffGrids, setBluffGrids] = useState([
    {
      id: 1,
      title: "My childhood",
      createdAt: "2025-05-11"
    }
  ])

  const handleAddGrid = () => {
    const title = prompt("Enter grid title:")
    if (title) {
      const newGrid = {
        id: Date.now(),
        title,
        createdAt: new Date().toISOString().split("T")[0]
      }
      setBluffGrids([newGrid, ...bluffGrids])
    }
  }

  const handleDeleteGrid = id => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this grid?"
    )
    if (confirmDelete) {
      setBluffGrids(bluffGrids.filter(grid => grid.id !== id))
    }
  }

  return (
    <div className="profile-wrapper">
      <header className="profile-header">
        <h1 className="logo">Bluff Grid</h1>
        <div className="header-right">
          <span className="username">demo</span>
          <div className="avatar-circle" />
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="profile-main">
        <section className="profile-card">
          <h2>My Profile</h2>
          <p>Manage your account and bluff grids</p>
          <div className="avatar-circle large">
            <img src="" alt="" />
          <h3>demo</h3>
          <p className="joined-date">Member since 11.05.2025</p>
          </div>
        </section>

        <section className="bluff-grid-section">
          <div className="bluff-grid-header">
            <h2>My Bluff Grids</h2>
            <button className="btn-primary" onClick={handleAddGrid}>
              + Add a New Bluff Grid
            </button>
          </div>

          {bluffGrids.length > 0 ? (
            <ul className="grid-list">
              {bluffGrids.map(grid => (
                <li key={grid.id} className="grid-item">
                  <div>
                    <strong>{grid.title}</strong>
                    <p>Created on {grid.createdAt}</p>
                  </div>
                  <div className="grid-actions">
                    <button className="edit-btn">✏️</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteGrid(grid.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-grids">
              <p>You haven't created any bluff grids yet.</p>
              <button className="btn-outline" onClick={handleAddGrid}>
                + Create Your First Grid
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default ProfileSection
