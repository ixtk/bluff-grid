import React from "react";
import "./game.css"
import { QuestionCard } from "./questionCard"
import players from "../../data/players";


export function Game() {
    const [step, setStep] = React.useState(0)
    const [score, setScore] = React.useState(0)
    
    const current = players[step]
    const isFinished = step >= players.length

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore((prev) => prev + 1)
            setStep((prev) => prev + 1)
    }

    return (
        <div className="container">
            {isFinished ? null : (
                <QuestionCard
                    question={`Which fact about ${current.name} is true?`}
                    answers={current.facts}
                    correct={current.facts[current.correctFactIndex]}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    )
}