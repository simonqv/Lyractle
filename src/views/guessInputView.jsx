import '/src/style.css';

function GuessInputView(props) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGuessACB();
    }
  };
  return (

    <div className="textarea-container">
        <textarea
          className="search-bar"
          placeholder="Write your guess..."
          value={props.currentGuess}
          onChange={setCurrentGuessACB}
          onKeyPress={handleKeyPress} 
          ></textarea>

        <div className="guess-input-button-container">
          <button className="button small-button" onClick={handleGuessACB}>
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
