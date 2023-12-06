import React, { useState, useEffect } from 'react';
import '/src/style.css';

function LyricsView() {
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [revealedWords, setRevealedWords] = useState([]);
  const [title, setTitle] = useState('');
  const [revealedTitle, setRevealedTitle] = useState([]);

  useEffect(() => {
    const testLyrics = `I used to run
      I used to sing a freedom song
      My heart was strong
      I easily knew right from wrong
      Young and unafraid
      Yeah all that was me is gone
      Fear became my faith
      But I don't wanna believe it no more
      I dream about when we were young
      Living like there was no time
      Singing that freedom song
      Singing that freedom song
      I'm gonna run
      I'm gonna live my life just like that song
      And though my heart is strong
      It's never easy to tell right from wrong`;

    const words = Array.from(new Set(testLyrics.toLowerCase().match(/\w+/g)));

    const hidePercentage = 40;

    const initialRevealedWords = words
      .sort(() => Math.random() - 0.5)
      .slice(0, (hidePercentage / 100) * words.length);

    const initialRevealedTitle = Array(title.split(/\s+/).length).fill(false);

    setLyrics(testLyrics);
    setTitle('Freedom Song'); // Replace with the actual title
    setRevealedWords(initialRevealedWords);
    setRevealedTitle(initialRevealedTitle);
    setGuessedWords([]);
  }, []);

  const handleGuess = () => {
    if (currentGuess.trim() !== '') {
      const lowerCaseGuess = currentGuess.trim().toLowerCase();
      const lowerCaseLyrics = lyrics.toLowerCase();
      const lowerCaseTitle = title.toLowerCase();

      // Revealing only the guessed word in the title
      if (lowerCaseTitle.includes(lowerCaseGuess)) {
        setRevealedTitle((prevRevealedTitle) => {
          const newRevealedTitle = [...prevRevealedTitle];
          const titleWords = title.toLowerCase().split(/\s+/);

          titleWords.forEach((word, index) => {
            if (word === lowerCaseGuess) {
              newRevealedTitle[index] = true;
            }
          });

          return newRevealedTitle;
        });
      }

      // Revealing words in the lyrics
      if (lowerCaseLyrics.includes(lowerCaseGuess)) {
        setRevealedWords((prevRevealedWords) => {
          if (!prevRevealedWords.includes(lowerCaseGuess)) {
            return [...prevRevealedWords, lowerCaseGuess];
          } else {
            return prevRevealedWords;
          }
        });
      }

      setGuessedWords([...guessedWords, lowerCaseGuess]);
      setCurrentGuess('');
    }
  };

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
      <p>
        {lyrics
          .split(/\s+/)
          .map((word, index) =>
            revealedWords.includes(word.toLowerCase()) ? word : '_'.repeat(word.length)
          )
          .join(' ')}
      </p>

      <div className="textarea-container">
        <textarea
          className="search-bar"
          placeholder="Write your guess..."
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        ></textarea>

        <div className="button-container">
          <button className="guess-button" onClick={handleGuess}>
            Guess
          </button>
        </div>
      </div>
    </div>
  );
}

export default LyricsView;
