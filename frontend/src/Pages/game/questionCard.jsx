export function QuestionCard({ question, answers, correct, onAnswer, showAnswer, selected }) {
    const handleClick = (option) => {
        if (showAnswer) return
        const isCorrect = option === correct
        onAnswer(isCorrect)
    }
 
    return (
        <div className="card">
            <h2>{question}</h2>
            {answers.map((option, index) => {
                let className = "btn btn-secondary";
                if (showAnswer) {
                    if (option === correct) {
                        className += " correct";
                    } else {
                        className += " incorrect";
                    }
                }
                return (
                    <button
                        key={index}
                        className={className}
                        onClick={() => handleClick(option)}
                        disabled={showAnswer}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    )}
