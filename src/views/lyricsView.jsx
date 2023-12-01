// lyricsView.jsx
import React, { useState } from 'react';

function LyricsView({ title, lyrics }) {
  // State to keep track of guessed words
  const [guessedWords, setGuessedWords] = useState([]);

  // Function to replace words with empty boxes
  const replaceWithEmptyBoxes = (text) => {
    return text.replace(/\w+/g, (match) => {
      return guessedWords.includes(match) ? match : '_'.repeat(match.length);
    });
  };

  // Function to handle user guesses
  const handleGuess = (guess) => {
    // Add the guessed word to the state
    setGuessedWords([...guessedWords, guess]);
  };

  return (
    <div className="lyrics-view">
      <h2>{replaceWithEmptyBoxes(title)}</h2>
      <p>{replaceWithEmptyBoxes(lyrics)}</p>
      <input
        type="text"
        placeholder="Make your guess"
        onChange={(e) => handleGuess(e.target.value)}
      />
    </div>
  );
}

export default LyricsView;
