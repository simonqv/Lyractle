import '/src/style.css';


function GuessBarView(props) {
  
  
  return (
    <div className="guess-bar-view">
      {/* Display the list of guessed words and the number of occurrences */}
      <ul className="guessed-words">
        {props.guesses.map(showGuessCB)}
        {/* Add more guessed words as needed */}
      </ul>
      {/* Include buttons for showing hints and quitting the game */}
      <div className="guess-bar-button-container">
        <button disabled={props.hints>=3} className='hint-button' onClick={getHintACB}>Hints {props.hints}/3</button>
        <button className='giveup-button' onClick={giveUpACB}>Give up</button>
      </div>
    </div>
  )

  function getHintACB() {
    props.onHintClick()
  }

  function giveUpACB() {
    props.onGiveUpClick()
  }

  function showGuessCB(guess, index) {
    // TODO: Write nbr of occurrences
    return <li key={index}>{guess} ({props.currentOccurence} occurrences)</li>

  }

}

export default GuessBarView
