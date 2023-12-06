
function GuessBarView(props) {
  return (
    <div className="guess-bar-view">
      {/* Display the list of guessed words and the number of occurrences */}
      <ul className="guessed-words">
        <li>Guessed Word 1 (2 occurrences)</li>
        <li>Guessed Word 2 (1 occurrence)</li>
        {/* Add more guessed words as needed */}
      </ul>
      {/* Include buttons for showing hints and quitting the game */}
      <div className="textarea-container">
        <button className='hint-button'>Hints 0/3</button>
        <button className='giveup-button'>Quit</button>
      </div>
    </div>
  );
}

export default GuessBarView;
