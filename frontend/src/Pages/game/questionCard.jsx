export function QuestionCard({ question, answers, correct, onAnswer }) {
    const handleClick = (option) => {
        const isCorrect = option === correct
        onAnswer(isCorrect)
    }
 
    return (
        <div className="card">
            <h2>{question}</h2>
            <ul>
                {answers.map((opt, index) => (
                    <button
                        key={index}
                        className="btn btn-secondary"
                        onClick={() => handleClick(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </ul>
        </div>
    )
}