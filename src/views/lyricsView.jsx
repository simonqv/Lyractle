import React, { useState } from 'react';
import "/src/style.css";


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

      <div class="textarea-container">
        <textarea class="search-bar" placeholder="Write your guess..."></textarea>
      
        <div class="button-container">
          <button class="guess-button">Guess</button>
        </div>
        
      </div>
   
    </div>
  );
}

export default LyricsView;
