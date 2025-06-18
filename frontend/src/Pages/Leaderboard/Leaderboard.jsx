import React from "react";
import "./Leaderboard.css";
import { Trophy, Home } from "lucide-react";

const Leaderboard = () => {
  const topPlayers = [
    { name: "Alex", score: 9, rank: 2, initial: "A" },
    { name: "You", score: 12, rank: 1, initial: "Y", winner: true },
    { name: "Taylor", score: 7, rank: 3, initial: "T" },
  ];

  return (
    <div className="container">
      <div className="trophy-icon">
        <Trophy size={70} color="var(--purple-500)" />
      </div>
      <h1 className="title">Game Over!</h1>
      <h2 className="subtitle">Final Results</h2>

      <div className="top-players-wrapper">
        {topPlayers.map((player, index) => (
          <div
            key={index}
            className={`player-card ${player.rank === 1 ? "winner-card" : ""}`}
          >
            <div className="avatar">{player.initial}</div>
            <div className="rank-badge">{player.rank}</div>
            <div className="name">{player.name}</div>
            <div className="score">{player.score} pts</div>
            {player.winner && <div className="winner-label">Winner!</div>}
          </div>
        ))}
      </div>

      <div className="other-players-section">
        <h1>Other Players</h1>
        <div className="card other-player-card">
          <div className="rank-badge small">4</div>
          <div className="avatar small">J</div>
          <div className="other-player-info">
            <div className="name">Jordan</div>
            <div className="score">5 pts</div>
          </div>
        </div>
      </div>

      <div className="footer-buttons">
        <button className="btn btn-primary">
          <Home /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
