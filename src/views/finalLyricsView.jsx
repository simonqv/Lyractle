import React from 'react';
import { GameStates } from '../userModel';

function FinalLyricsView(props) {
  
  const processedLyrics = removeContentInsideBrackets(props.lyrics);

  return (
    <div className="lyrics-view">
      <span>
        <h2 className='h2'>
          {props.title.split(/\s+/).join(' ')} - {props.artist}
        </h2>
        {props.gameState === GameStates.WIN &&
        ( 
          <h3 className='h3-won'>You solved it in {props.numGuess} guesses</h3>
        )}
        {props.gameState === GameStates.GIVEN_UP &&
        ( 
          <h3 className='h3' style={{fontSize: "24px", marginBottom: "24px", color: "#B76D6D"}}>You gave up after {props.numGuess} guesses</h3>
        )}
      </span>
      <div>
        {processedLyrics
          .split('\n') // Split the lyrics into lines
          .map((line, index) => (
            <p key={index} className='p' >
              {line
                .split(/\s+/)
                .join(' ')}
            </p>
          ))}
      </div>
    </div>
  );
}

function removeContentInsideBrackets(longString) {
  // Use a regular expression to match content inside square brackets and replace it with an empty string
  const result = longString.replace(/\[[^\]]*\]/g, '');
  return result;
}

export default FinalLyricsView;
