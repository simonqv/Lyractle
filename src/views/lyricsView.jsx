import React from 'react';
import { LYRICS_REGEX } from '../constants';

function LyricsView(props) {
  
  const processedLyrics = removeContentInsideBrackets(props.lyrics)

  console.log(props.title)
  

  const resultArray = props.title.match(LYRICS_REGEX)

  return (
    <div className="lyrics-view">
      <h2 className='h2'>
        {resultArray ? resultArray.map((word, index) => 
          props.revealedTitle[index] ? word : '_'.repeat(word.length)).join(' ') : ''}
      </h2>
      <div>
      {processedLyrics
        .split('\n') // Split the lyrics into lines
        .map((line, index) => (
          <p key={index} className='p'>
            {(line.match(LYRICS_REGEX) || [])
              .map((word, index) =>
                props.revealedWords.includes(word.toLowerCase())
                  ? word
                  : '_'.repeat(word.length)
              )
              .join(' ')}
          </p>
      ))}
      </div>
    </div>
  );
};

function removeContentInsideBrackets(longString) {
  // Use a regular expression to match content inside square brackets and replace it with an empty string
  const result = longString.replace(/\[[^\]]*\]/g, '');
  return result;

  
}

export default LyricsView;
