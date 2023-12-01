import React, { useState } from 'react';

function LyricsView({ title, lyrics }) {
  // State to keep track of guessed words
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');

  // Function to replace words with empty boxes
  const replaceWithEmptyBoxes = (text) => {
    return text.replace(/\w+/g, (match) => {
      return guessedWords.includes(match) ? match : '_'.repeat(match.length);
    });
  };

  // Function to handle user guesses
  const handleGuess = () => {
    if (currentGuess.trim() !== '') {
      // Add the guessed word to the state
      setGuessedWords([...guessedWords, currentGuess.trim()]);
      setCurrentGuess(''); // Clear the input after guessing
    }
  };

  return (
    <div className="lyrics-view">
      <h2>{replaceWithEmptyBoxes(title)}</h2>
      <p>{replaceWithEmptyBoxes(lyrics)}</p>
      <div>
        <input
          type="text"
          placeholder="Type in your guess.."
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
    </div>
  );
}

export default LyricsView;
