// GameView.jsx
import React from 'react';
import HamburgerView from './hamburgerView'; // Adjust the import path as needed
import LyricsView from './lyricsView'; // Adjust the import path as needed
import GuessBarView from './guessBarView'; // Adjust the import path as needed
import '/src/style.css'
// GameView.jsx

function GameView() {
  return (
    <div className="game-view">
      <HamburgerView />

      <div className="main-content">
        <LyricsView title="Your Song Title" lyrics="Your song lyrics go here." />
        <GuessBarView />
      </div>
    </div>
  );
}


export default GameView;
