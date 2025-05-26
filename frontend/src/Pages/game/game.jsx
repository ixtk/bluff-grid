import React, { useState, useEffect } from "react";
import "./game.css"
import { QuestionCard } from "./questionCard"
import players from "../../data/players";


export function Game() {
    const [step, setStep] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(60)
    const [showAnswer, setShowAnswer] = useState(false)
    
    const current = players[step]
    const isFinished = step >= players.length

    useEffect(() => {
      if (isFinished || showAnswer) return;
      if (timeLeft <= 0) {
        setShowAnswer(true);
        return;
      }
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          console.log("Time left:", prev); 
          if (prev <= 1) {
            clearInterval(timer);
            setShowAnswer(true);
          }
          return prev - 1;
        });
      }, 1000);
    
      return () => clearInterval(timer);
    }, [step, isFinished, showAnswer]);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) setScore((prev) => prev + 1)
        if (isFinished) return;
        if (showAnswer) return;
        setShowAnswer(true);
    }

    useEffect(() => {
      if (showAnswer) {
        const timeot = setTimeout(() => {
          setStep((prev) => prev + 1)
          setTimeLeft(60)
          setShowAnswer(false)
        } , 3000);
        return () => clearTimeout(timeot);
      }
    } , [showAnswer]);

    return (
        <div className="container">
            {isFinished ? null : (
                <QuestionCard
                    question={`Which fact about ${current.name} is true?`}
                    answers={current.facts}
                    correct={current.facts[current.correctFactIndex]}
                    onAnswer={handleAnswer}
                    showAnswer={showAnswer}
                    selected={current.facts[current.correctFactIndex]}
                    timeLeft={timeLeft}
                />
            )}
        </div>
    )
}