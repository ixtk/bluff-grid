import React, { useState, useEffect } from "react";
import players from "../../data/players"; 
import "./game.css";
import { QuestionCard } from "./questionCard";

export function Game() {
  const [voteCounts, setVoteCounts] = useState(Array(players.length).fill(0));
  const [selectedOption, setSelectedOption] = useState(null);
  const [round, setRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalRounds = players.length;
  const currentRound = round;

  const currentPlayer = players[currentPlayerIndex];


  useEffect(() => {
    if (isFinished || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowAnswer(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayerIndex, showAnswer, isFinished]);


  useEffect(() => {
    if (showAnswer) {
      const timeout = setTimeout(() => {
        const nextIndex = currentPlayerIndex + 1;

        if (nextIndex >= players.length) {
          if (round >= totalRounds) {
            setIsFinished(true);
          } else {
            setRound((prev) => prev + 1);
            setCurrentPlayerIndex(0);
          }
        } else {
          setCurrentPlayerIndex(nextIndex);
        }

        setTimeLeft(60);
        setShowAnswer(false);
        setSelectedOption(null);
        setVoteCounts((prev) => {
          const newCounts = [...prev];
          newCounts[currentPlayer.correctFactIndex] = 0; 
          return newCounts;
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAnswer]);


  const handleAnswer = (isCorrect, selected) => {
    setSelectedOption(selected);
    const selectedIndex = currentPlayer.facts.indexOf(selected);
    setVoteCounts((prev) => {
      const updated = [...prev];
      updated[selectedIndex] += 1;
      return updated;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setShowAnswer(true);
  };


  if (isFinished) {
    return (
      <div className="container">
        <h2>Game Over</h2>
        <p>Your Score: {score}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-header">
        <div className="round-title">
          <p>Round {currentRound}/{totalRounds}</p>
          <h2>Which fact is TRUE about {currentPlayer.name}?</h2>
        </div>

        <div className="players-list">
          {players.map((p) => (
            <div
              key={p.id}
              className={`player-tag ${
                players[currentPlayerIndex].id === p.id ? "active" : ""
              }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        <div className="timer">Time Left: {timeLeft}s</div>
      </div>

      <QuestionCard
        question={`Which fact is TRUE about ${currentPlayer.name}?`}
        answers={currentPlayer.facts}
        correct={currentPlayer.facts[currentPlayer.correctFactIndex]}
        onAnswer={handleAnswer}
        showAnswer={showAnswer}
        selectedOption={selectedOption}
        voteCounts={voteCounts}
      />
    </div>
  );
}
