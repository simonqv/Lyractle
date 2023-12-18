import '/src/style.css';

function GuessBarView(props) {
  return (
    <div className="guess-bar-view">
      {/* Display the list of guessed words and the number of occurrences */}
      <h2 className="guess-title" style={{marginTop: "54px"}}>Your Guesses: </h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>
          {props.guesses.map((guess, index) => showGuessCB(guess, index))}
        </tbody>
      </table>

      {/* Include buttons for showing hints and quitting the game */}
      <div className="guess-bar-button-container">
        <button disabled={props.hints >= 3} className='button' onClick={getHintACB}>
          Hints {props.hints}/3
        </button>
        <button className='button red-button' onClick={giveUpACB}>Give up</button>
      </div>
    </div>
  );

  

  function getHintACB() {
    props.onHintClick()
  }

  function giveUpACB() {
    props.onGiveUpClick()
  }

  function showGuessCB(guess, index) {
    return (
      <tr key={index}>
        <th>{index}</th>
        <th>{guess.word}</th>
        <th>{guess.occurrences}</th>
      </tr>
    );
  }

}

export default GuessBarView
