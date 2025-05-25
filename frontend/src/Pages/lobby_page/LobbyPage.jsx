import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './lobbyPage.css';
import { User, CheckCircle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';


const initialPlayers = [
    { id: 'user1', name: 'You', role: 'Host', ready: true },
    { id: 'user2', name: 'Alex', role: 'Player', ready: true },
    { id: 'user3', name: 'Bob', role: 'Player', ready: false },
    { id: 'user4', name: 'Charlie', role: 'Player', ready: false },
];

const Lobby = () => {
    const [players, setPlayers] = useState(initialPlayers);
    const [selectedGrid, setSelectedGrid] = useState('My childhood');
    const gameCode = 'ABCD1234';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Game link copied to clipboard!');
    };

    const handleRandomizeGrid = () => {
        const grids = ['My childhood', 'Travel memories', 'Favorite foods', 'Random'];
        const randomGrid = grids[Math.floor(Math.random() * grids.length)];
        setSelectedGrid(randomGrid);
    };
    return (
        <div className="game-lobby-container">
            <div className="lobby-details">
                <div>
                <Link to="/" className="back-to-home">
                    <button class="btn btn-primary"> <ArrowLeft size={15}  className="me-2" /><h7>Back to Home</h7></button>
                
                  

                </Link></div>
                <h2>Game Lobby</h2>
                <p>Waiting for players to join and get ready</p>

                <div className="game-code-container">
                    <h3 className='game-code1'>Game Code</h3>
                    <div className="game-code">{gameCode}</div>
                    <button className="copy-link-button" onClick={handleCopyLink}>
                        Copy Game Link
                    </button>
                </div>

                <div className="players-section">
                    <div className="players-header">
                       <User size={24} color="#007bff" /> Players ({players.length}/8)
                    </div>
                    {players.map((player) => (
                        <div className="player-item" key={player.id}>
                            <div className="player-avatar">{player.name[0]}</div>
                            <div className="player-info">
                                <span className="player-name">{player.name}</span>
                                {player.role && <span className="player-role">{player.role}</span>}
                            </div>
                            {player.ready && (
                                <div className="player-status">
                                    <CheckCircle size={20} className="text-success" />Ready
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
                        onChange={(e) => setSelectedGrid(e.target.value)}
                    >
                        <option>My childhood</option>
                        <option>Travel memories</option>
                        <option>Favorite foods</option>
                        <option>Random</option>
                    </select>
                </div>

                <button className="randomize-button" onClick={handleRandomizeGrid}>
                    Randomize
                </button>
                <button className="start-game-button">
                    Start Game
                </button>
            </div>
            
        </div>
    );
};

export default Lobby;
