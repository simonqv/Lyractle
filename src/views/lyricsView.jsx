import React from 'react';

function LyricsView(props) {

  console.log(props.title);

  return (
    <div className="lyrics-view">
      <h2 className='h2'>
        {props.title.split(/\s+/).map((word, index) =>
            props.revealedTitle[index] ? word : '_'.repeat(word.length)
          )
          .join(' ')}
      </h2>
      <div>
        {props.lyrics
          .split('\n') // Split the lyrics into lines
          .map((line, index) => (
            <p key={index} className='lyrics-text' >
              {line
                .split(/\s+/)
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

export default LyricsView;
