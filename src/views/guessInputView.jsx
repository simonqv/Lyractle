import '/src/style.css';


function GuessInputView(props) {
  return (
    <div className="textarea-container">
        <textarea
          className="search-bar"
          placeholder="Write your guess..."
          value={props.currentGuess}
          onChange={setCurrentGuessACB}
          ></textarea>

        <div className="button-container">
          <button className="guess-button" onClick={handleGuessACB}>
            Guess
          </button>
        </div>
    </div>
  )
    function handleGuessACB() {
        props.onHandleGuess()
    }

    function setCurrentGuessACB(evt) {
      props.onSetGurrentGuess(evt.target.value)
    }
}

export default GuessInputView
