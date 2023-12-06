// LyricsPresenter.js
import React from 'react';

const LyricsPresenter = ({ title, lyrics, revealedTitle, revealedWords }) => {
  return (
    <div className="lyrics-view">
      <h2>
        {title
          .split(/\s+/)
          .map((word, index) =>
            revealedTitle[index] ? word : '_'.repeat(word.length)
          )
          .join(' ')}
      </h2>
      <div>
        {lyrics
          .split('\n') // Split the lyrics into lines
          .map((line, index) => (
            <p key={index}>
              {line
                .split(/\s+/)
                .map((word, index) =>
                  revealedWords.includes(word.toLowerCase())
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

export default LyricsPresenter;
