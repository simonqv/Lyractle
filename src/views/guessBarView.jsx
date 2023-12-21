import '/src/style.css';
import { GameStates } from '../userModel';


function GuessBarView(props) {
  return (
    <div className="guess-bar-view">
      {/* Display the list of guessed words and the number of occurrences */}
     
      <h2 className="guess-title" style={{marginTop: "54px"}}>Your Guesses: </h2>
      <div className ="guesses-container">

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
      </div>

      {/* Include buttons for showing hints and quitting the game */}
      
      {props.gameState === GameStates.PLAYING && 
        <div className="guess-bar-button-container">
          <button disabled={props.hints >= 3} className='button small-button' onClick={getHintACB}>
            Hints {props.hints}/3
          </button>
          <button className='button red-button small-button' onClick={giveUpACB}>Give up</button>
      </div>}
    </div>
  );


  function getHintACB() {
    props.onHintClick()
  }

  function giveUpACB() {
    props.onGiveUpClick();
  }


  function showGuessCB(guess, index) {
    return (
      <tr key={index}>
        <th>{index+1}</th>
        <th>{guess.word}</th>
        <th>{guess.occurrences}</th>
      </tr>
    );
  }
}

export default GuessBarView