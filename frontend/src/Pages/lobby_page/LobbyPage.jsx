import React, { useEffect, useState } from "react"

import { useLocation, Link } from "react-router-dom"

import "./LobbyPage.css"

import { User, CheckCircle, ArrowLeft } from "lucide-react"

const Lobby = () => {
  const location = useLocation()

  const params = new URLSearchParams(location.search)

  const code = params.get("code") || "UNKNOWN"

  const isHost = params.get("host") === "true"

  const [players, setPlayers] = useState([])

  const [selectedGrid, setSelectedGrid] = useState("My childhood")

  useEffect(() => {
    const me = {
      id: "me",

      name: "You",

      role: isHost ? "Host" : "Player",

      ready: isHost
    }

    setPlayers([me])
  }, [isHost])

  const handleCopyLink = () => {
    const url = `${window.location.origin}/lobby?code=${code}`

    navigator.clipboard.writeText(url)

    alert("Game link copied to clipboard!")
  }

  const handleRandomizeGrid = () => {
    const grids = [
      "My childhood",
      "Travel memories",
      "Favorite foods",
      "Random"
    ]

    const randomGrid = grids[Math.floor(Math.random() * grids.length)]

    setSelectedGrid(randomGrid)
  }

  return (
    <div className="card">
      <div className="lobby-details">
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={15} className="me-2" />
          Back to Home
        </Link>

        <h2>Game Lobby</h2>

        <p>Waiting for players to join and get ready</p>

        <div className="game-code-container">
          <h3 className="game-code1">Game Code</h3>

          <div className="game-code">{code}</div>

          <button
            className="copy-link-button btn btn-secondary"
            onClick={handleCopyLink}
          >
            Copy Game Link
          </button>
        </div>

        <div className="players-section">
          <div className="players-header">
            <User size={24} color="#007bff" /> Players ({players.length}/8)
          </div>

          {players.map(player => (
            <div className="player-item" key={player.id}>
              <div className="player-avatar">{player.name[0]}</div>

              <div className="player-info">
                <span className="player-name">{player.name}</span>

                {player.role && (
                  <span className="player-role">{player.role}</span>
                )}
              </div>

              {player.ready && (
                <div className="player-status">
                  <CheckCircle size={20} className="text-success" />
                  Ready
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="game-options">
        <h3>Select Your Grid</h3>

        <p>Choose a bluff grid to use in the game</p>

        <div className="select-grid-container">
          <label htmlFor="grid-select">Choose a grid:</label>

          <select
            id="grid-select"
            value={selectedGrid}
            onChange={e => setSelectedGrid(e.target.value)}
          >
            <option>My childhood</option>

            <option>Travel memories</option>

            <option>Favorite foods</option>

            <option>Random</option>
          </select>
        </div>

        <button
          className="randomize-button btn btn-secondary"
          onClick={handleRandomizeGrid}
        >
          Randomize
        </button>

        {isHost && (
          <button className="start-game-button btn btn-primary">
            Start Game
          </button>
        )}
      </div>
    </div>
  )
}

export default Lobby
