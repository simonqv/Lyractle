import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import LyricsView from '../views/lyricsView'
import '/src/style.css'
import GuessInputView from '../views/guessInputView'

// TODO: Always show guessed words, maybe implement a list of words that are always shown and not randomize
export default observer(function Lyrics(props) {
  const [lyrics, setLyrics] = useState('')
  const [revealedWords, setRevealedWords] = useState([])
  const [title, setTitle] = useState('')
  const [revealedTitle, setRevealedTitle] = useState([])
  const DEFAULT_VISIBLE_WORDS = ["a", "are", "I", "I'm", "in", "is", "it", "the", "this", "to", "was", "you"];

  useEffect(() => {
    const words = Array.from(new Set(props.currentLyrics.toLowerCase().match(/\w+/g)))
    
    const hidePercentage = 40

    const wordsToHide = words.filter(word => !DEFAULT_VISIBLE_WORDS.includes(word));

    const initialRevealedWords = wordsToHide
       .sort(() => Math.random() - 0.5)
       .slice(0, (hidePercentage / 100) * wordsToHide.length)
       .concat(DEFAULT_VISIBLE_WORDS); 
 
    const uniqueInitialRevealedWords = Array.from(new Set(initialRevealedWords));
 
    const initialRevealedTitle = Array(props.currentTitle.split(/\s+/).length).fill(false);
 
    
   setLyrics(props.currentLyrics);
   setTitle(props.currentTitle);
   setRevealedWords(uniqueInitialRevealedWords);
   setRevealedTitle(initialRevealedTitle);
}, []);

const isGameWon = props.model.gameState === 'WIN';

  return (
    <div className='lyrics-and-guess-input'>
      <LyricsView 
      title={title} 
      lyrics={lyrics} 
      revealedTitle={revealedTitle} 
      revealedWords={revealedWords}
      gameState={props.model.gameState}
      onHintClick={handleHint}
      />
      <GuessInputView currentGuess={props.model.currentGuess} onHandleGuess={handleGuess} onSetGurrentGuess={setCurrentGuess} />
    </div>
  )
  
  function handleHint() {
    if (props.onHintClick) {
      props.onHintClick();
    }
  }

  function setCurrentGuess(val) {
    props.model.setCurrentGuess(val)
  }

  function addGuess(guess) {
    props.model.addToGuesses(guess)
  }

  function increaseScore() {
    const nr = props.model.currentScore + 1
    props.model.setCurrentScore(nr)
  }


  function countOccurrences(longString, word) {
    // Use a regular expression to split the string into an array of words
    // The regular expression \b ensures that only whole words are matched
    let wordsArray = longString.split(/\b/);
    
    // Initialize a counter for occurrences
    let count = 0;
    
    // Iterate through the array and count occurrences
    for (let i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i] === word) {
            count++;
        }
    }
    
    return count;
  }

  function allWordsInArray(inputString, wordArray) {
    // Split the input string into an array of words
    const words = inputString.split(/\s+/);

    // Check if every word is present in the array
    const allWordsInArray = words.every(word => wordArray.includes(word));

    return allWordsInArray;
}

function handleGuess() {
    
   
    if (props.model.currentGuess.trim() !== '') {
      const lowerCaseGuess = props.model.currentGuess.trim().toLowerCase();
      const lowerCaseLyrics = lyrics.toLowerCase();
      const lowerCaseTitle = title.toLowerCase();
  
      const occurrencesInLyrics = countOccurrences(lowerCaseLyrics, lowerCaseGuess);
      const occurrencesInTitle = countOccurrences(lowerCaseTitle, lowerCaseGuess);
  
      props.model.currentOccurence = occurrencesInLyrics + occurrencesInTitle;
      
      
  
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

      if (allWordsInArray(lowerCaseTitle, props.model.guesses)) {
        props.model.setGameState(GameStates.WIN);
        console.log ("Game State changed to WIN");
        return;  
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
  
      const guessedWord = props.model.guesses.find((guess) => guess.word === lowerCaseGuess);
  
      if (!guessedWord) {
        // If the guessed word doesn't exist in the guesses array, add it with occurrences
        addGuess({ word: lowerCaseGuess, occurrences: props.model.currentOccurence });
        if (allWordsInArray(lowerCaseTitle, props.model.guesses)) {
          window.location.href = "/login";
        }
        increaseScore();
      }
    }
  }
  
  
  
})