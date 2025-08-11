import { LogOut, Pencil, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"
import "./profilepage.css"

const ProfilePage = ({ bluffGrids, onDeleteGrid }) => {
  const navigate = useNavigate()

  return (
    <div className="container">
     

      <main className="profile-main">
        <section className=" card">
          <h2>My Profile</h2>
          <p>Manage your account and bluff grids</p>
          <label className="avatar-circle large">
            <div className="avatar-circle large">
              <img src="/placeholder.svg?height=96&width=96" alt="" />
            </div>
          </label>
          <h3>demo</h3>
          <p className="joined-date">Member since 11.05.2025</p>
        </section>

        <section className="bluff-grid-section">
          <div className="bluff-grid-header">
            <h2>My Bluff Grids</h2>
            <button
              className="btn"
              onClick={() => navigate("/create")}
            >
              <Plus size={16} /> Add a New Bluff Grid
            </button>
          </div>

          {bluffGrids.length > 0 ? (
            <ul className="grid-list">
              {bluffGrids.map((grid) => (
                <li key={grid.id} className="card">
                  <div>
                    <h3>{grid.title}</h3>
                    <p>Created: {grid.createdAt}</p>
                  </div>
                  <div className="grid-actions">
                    <button
                      className="icon-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this grid?"
                          )
                        ) {
                          onDeleteGrid(grid.id)
                        }
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="NewGrid container card">
              <p>You haven't created any bluff grids yet.</p>
              <button
                className="btn"
                onClick={() => navigate("/create")}
              >
                <Plus size={16} /> Create Your First Grid
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default ProfilePage
