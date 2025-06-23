import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"

const CreateGridPage = ({ onNavigateToProfile, onSaveGrid }) => {
  const [gridTitle, setGridTitle] = useState("")
  const [statements, setStatements] = useState(Array(9).fill(""))
  const [truthIndex, setTruthIndex] = useState(null)

  const [errors, setErrors] = useState({ title: "", statements: "", truth: "" }) // ✅ error states

  const handleStatementChange = (index, value) => {
    const newStatements = [...statements]
    newStatements[index] = value
    setStatements(newStatements)
  }

  const handleMarkTruth = index => {
    setTruthIndex(truthIndex === index ? null : index)
  }

  const handleSave = () => {
    const newErrors = { title: "", statements: "", truth: "" }

    if (!gridTitle.trim()) {
      newErrors.title = "Please enter a grid title."
    }

    const filledStatements = statements.filter(s => s.trim() !== "").length
    if (filledStatements < 9) {
      newErrors.statements = "All 9 statements must be filled."
    }

    if (truthIndex === null) {
      newErrors.truth = "You must mark one statement as true."
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(e => e !== "")
    if (hasErrors) return

    onSaveGrid({
      title: gridTitle,
      statements: statements,
      truthIndex: truthIndex
    })
  }

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
      onNavigateToProfile()
    }
  }

  return (
    <div className="container">
      {/* ...header remains unchanged... */}

      <main className="create-grid-main">
        {/* ...create-grid-header remains unchanged... */}

        <div className="create-grid-content">
          {/* Title Section */}
          <div className="create-grid-title-section">
            <h1>Create a New Bluff Grid</h1>
            <p className="subtitle">
              Create a 3×3 grid with 8 false statements and 1 true statement
              about yourself
            </p>
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
              onChange={e => setGridTitle(e.target.value)}
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          <div className="statements-section">
            <h2 className="statements-title">Statements</h2>
            <p className="statements-subtitle">
              Enter 9 statements about yourself. Select ONE statement that is
              true, the rest should be false.
            </p>

            <div className="statements-grid">
              {statements.map((statement, index) => (
                <div key={index} className="statement-item">
                  <textarea
                    className="statement-input"
                    placeholder={`Statement ${index + 1}`}
                    value={statement}
                    onChange={e => handleStatementChange(index, e.target.value)}
                    rows={3}
                  />
                  <button
                    className={`mark-truth-btn ${
                      truthIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleMarkTruth(index)}
                    type="button"
                  >
                    <Check size={16} />
                    Mark Truth
                  </button>
                </div>
              ))}
            </div>

            {errors.statements && (
              <p className="form-error">{errors.statements}</p>
            )}
            {errors.truth && <p className="form-error">{errors.truth}</p>}
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

