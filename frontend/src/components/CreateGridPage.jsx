import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"

const CreateGridPage = ({ onNavigateToProfile, onSaveGrid }) => {
  const [gridTitle, setGridTitle] = useState("")
  const [statements, setStatements] = useState(Array(9).fill(""))
  const [truthIndex, setTruthIndex] = useState(null)

  const handleStatementChange = (index, value) => {
    const newStatements = [...statements]
    newStatements[index] = value
    setStatements(newStatements)
  }

  const handleMarkTruth = (index) => {
    setTruthIndex(truthIndex === index ? null : index)
  }

  const handleSave = () => {
    if (!gridTitle.trim()) {
      alert("Please enter a grid title")
      return
    }

    const filledStatements = statements.filter((s) => s.trim() !== "").length
    if (filledStatements < 9) {
      alert("Please fill in all 9 statements")
      return
    }

    if (truthIndex === null) {
      alert("Please mark one statement as truth")
      return
    }

    onSaveGrid({
      title: gridTitle,
      statements: statements,
      truthIndex: truthIndex,
    })
  }

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      onNavigateToProfile()
    }
  }

  return (
    <div className="container">
      <header className="profile-header">
        <h1 className="logo">Bluff Grid</h1>
        <div className="header-right">
          <span className="username">demo</span>
          <label className="avatar-circle small">
            <div className="avatar-circle large">
              <img src="/placeholder.svg?height=32&width=32" alt="" />
            </div>
          </label>
        </div>
      </header>

      <main className="create-grid-main">
        <div className="create-grid-header">
          <button className="back-link" onClick={onNavigateToProfile}>
            <ArrowLeft size={16} />
            Back to Profile
          </button>
        </div>

        <div className="create-grid-content">
          <div className="create-grid-title-section">
            <h1>Create a New Bluff Grid</h1>
            <p className="subtitle">Create a 3×3 grid with 8 false statements and 1 true statement about yourself</p>
          </div>

          <div className="grid-title-section">
            <label htmlFor="grid-title" className="form-label">
              Grid Title
            </label>
            <input
              id="grid-title"
              type="text"
              className="grid-title-input"
              placeholder="e.g., My Childhood, Travel Adventures, etc."
              value={gridTitle}
              onChange={(e) => setGridTitle(e.target.value)}
            />
          </div>

          <div className="statements-section">
            <h2 className="statements-title">Statements</h2>
            <p className="statements-subtitle">
              Enter 9 statements about yourself. Select ONE statement that is true, the rest should be false.
            </p>

            <div className="statements-grid">
              {statements.map((statement, index) => (
                <div key={index} className="statement-item">
                  <textarea
                    className="statement-input"
                    placeholder={`Statement ${index + 1}`}
                    value={statement}
                    onChange={(e) => handleStatementChange(index, e.target.value)}
                    rows={3}
                  />
                  <button
                    className={`mark-truth-btn ${truthIndex === index ? "active" : ""}`}
                    onClick={() => handleMarkTruth(index)}
                    type="button"
                  >
                    <Check size={16} />
                    Mark Truth
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="create-grid-actions">
            <button className="btn btn-outline" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Grid
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateGridPage
