// GuessesView.js
import React from 'react';

function GuessBarView() {
  return (
    <div className="guessBarView">
      {/* Display the list of guessed words and the number of occurrences */}
      <ul className="guessed-words">
        <li>Guessed Word 1 (2 occurrences)</li>
        <li>Guessed Word 2 (1 occurrence)</li>
        {/* Add more guessed words as needed */}
      </ul>
      {/* Include buttons for showing hints and quitting the game */}
      <div className="buttons">
        <button>Show Hints</button>
        <button>Quit Game</button>
      </div>
    </div>
  );
}

export default GuessBarView;
