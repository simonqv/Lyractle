import React from 'react';
import '/src/style.css';

function GuessInputView(props) {
  
  const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleGuessACB();
      }
    };
  return (
    <div className="textarea-container">
      <div className="search-bar-container">
        <textarea
          className="search-bar"
          placeholder="Write your guess..."
          value={props.currentGuess}
          onChange={setCurrentGuessACB}
          onKeyPress={handleKeyPress} 
        ></textarea>
         <div className="button-container">
          <button className="button small-button" onClick={handleGuessACB}>
            Guess
          </button>
        </div>
      </div>
    </div>
  );

 
  function handleGuessACB() {
    //console.log(props.model.currentScore)
    props.onHandleGuess();
    props.onSetGurrentGuess('');
  }

  
  function setCurrentGuessACB(evt) {
    props.onSetGurrentGuess(evt.target.value);
  }
}

export default GuessInputView;
