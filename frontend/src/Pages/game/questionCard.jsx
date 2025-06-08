export function QuestionCard({ answers, correct, onAnswer, showAnswer, selectedOption, voteCounts }) {
    const handleClick = (option) => {
        if (showAnswer) return
        const isCorrect = option === correct
        onAnswer(isCorrect)
    }
   
    return (
        <div className="card">
            {answers.map((option, index) => {
                let className = "btn btn-secondary";
                if (showAnswer) {
                    className += option === correct ? " correct" : " incorrect";
                }
                const votes = voteCounts?.[index] || 0;
                return (
                    <div key={index}>
                    <button                        
                        className={className}
                        onClick={() => handleClick(option)}
                        disabled={showAnswer}
                    >
                        
                        {option}
                    </button>
                    {showAnswer && (
                        <div className="vote-count">
                            {votes} vote{votes !== 1 ? "s" : ""}
                        </div>
                    )}
               </div> 
                );
            })}
        </div>
    )}
