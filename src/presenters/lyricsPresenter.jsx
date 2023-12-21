import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import LyricsView from '../views/lyricsView'
import '/src/style.css'
import GuessInputView from '../views/guessInputView'
import { GameStates } from "../userModel"
import FinalLyricsView from '../views/finalLyricsView'

// TODO: Always show guessed words, maybe implement a list of words that are always shown and not randomize
export default observer(function Lyrics(props) {
  const [lyrics, setLyrics] = useState('')
  const [revealedWords, setRevealedWords] = useState([])
  const [title, setTitle] = useState('')
  const [revealedTitle, setRevealedTitle] = useState([])
  const DEFAULT_VISIBLE_WORDS = ["a", "are", "i", "i'm", "in", "is", "it", "the", "this", "to", "was", "you", "what", "and", "be", "my", "mine"];

  useEffect(() => {
    //const words = Array.from(new Set(props.currentLyrics.toLowerCase().match(/\w+/g)))
    
    console.log("gesses", props.model.guesses)
    // Extract "word" property from each object in word_dict
    const new_words = props.model.guesses.map(obj => obj.word)

    // Concatenate arrays
    const initialRevealedWords = DEFAULT_VISIBLE_WORDS.concat(new_words)
    console.log("init words" , initialRevealedWords)

    console.log(initialRevealedWords)
 
    //const uniqueInitialRevealedWords = Array.from(new Set(initialRevealedWords));
 
    const initialRevealedTitle = props.currentTitle.toLowerCase().split(/\s+/).map(word => initialRevealedWords.includes(word))
    console.log("init title", initialRevealedTitle)
    
   setLyrics(props.currentLyrics)
   setTitle(props.currentTitle)
   setRevealedWords(initialRevealedWords)
   setRevealedTitle(initialRevealedTitle)
}, []);

// This is to find that the revealedTitle has changed to all true
useEffect(() => {
  console.log("rev title:" ,revealedTitle)
  if (revealedTitle.length > 0 && revealedTitle.every(word => word === true)) {
    props.model.addToScores(props.currentTitle, props.model.currentScore);
    props.model.setGameState(GameStates.WIN);
    const guessNum = props.model.currentScore;
    // alert("Congratulations, you guessed the title with " + JSON.stringify(guessNum) + " guesses!");
  }
}, [revealedTitle]);

const isGameWon = props.model.gameState === 'WIN'

  return (
    <div className='lyrics-and-guess-input'>
      {props.model.gameState === GameStates.PLAYING && (
      <LyricsView 
      title={title} 
      lyrics={lyrics} 
      revealedTitle={revealedTitle} 
      revealedWords={revealedWords}
      gameState={props.model.gameState}
      onHintClick={handleHint}
      />
      )}
      {(props.model.gameState === GameStates.WIN || props.model.gameState === GameStates.GIVEN_UP) && (
        <FinalLyricsView
        title={title}
        artist={props.model.currentTrack.track.artist_name}
        lyrics={lyrics}
        numGuess={props.model.currentScore}
        revealedTitle={revealedTitle} 
        revealedWords={revealedWords}
        gameState={props.model.gameState}
        />
      )}
      {props.model.gameState === GameStates.PLAYING && (
      <GuessInputView currentGuess={props.model.currentGuess} onHandleGuess={handleGuess} onSetGurrentGuess={setCurrentGuess} />
      )}
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
    for (const element of wordsArray) {
        if (element === word) {
            count++;
        }
    }
    
    return count;
  }

function handleGuess() {
    
   
    if (props.model.currentGuess.trim() !== '') {
      const lowerCaseGuess = props.model.currentGuess.trim().toLowerCase()
      const guessedWord = props.model.guesses.find((guess) => guess.word === lowerCaseGuess)

      if (!guessedWord) {
        const lowerCaseLyrics = lyrics.toLowerCase()
        const lowerCaseTitle = title.toLowerCase()
  
        const occurrencesInLyrics = countOccurrences(lowerCaseLyrics, lowerCaseGuess)
        const occurrencesInTitle = countOccurrences(lowerCaseTitle, lowerCaseGuess)
        const totOccurences = occurrencesInLyrics + occurrencesInTitle

        increaseScore();
        addGuess({ word: lowerCaseGuess, occurrences: totOccurences });

        // Revealing only the guessed word in the title
        if (lowerCaseTitle.includes(lowerCaseGuess)) {
          console.log("Revealing only the guessed word in the title")
          setRevealedTitle((prevRevealedTitle) => {
            console.log(prevRevealedTitle)
            const newRevealedTitle = [...prevRevealedTitle];
            const titleWords = title.toLowerCase().split(/\s+/);

            titleWords.forEach((word, index) => {
              if (word === lowerCaseGuess) {
                newRevealedTitle[index] = true;
              }
            });
            console.log("T", newRevealedTitle)
            return newRevealedTitle;
          });
        }
        console.log("after title thing")

        // Revealing words in the lyrics
        if (lowerCaseLyrics.includes(lowerCaseGuess)) {
          console.log("Revealing words in the lyrics")
          setRevealedWords((prevRevealedWords) => {
            console.log("prev rev word:", prevRevealedWords)
            if (!prevRevealedWords.includes(lowerCaseGuess)) {
              return [...prevRevealedWords, lowerCaseGuess]
            } else {
              return prevRevealedWords
            }
          })
        }
      }
    }
  }
})