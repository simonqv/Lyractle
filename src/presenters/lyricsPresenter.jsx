import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import LyricsView from '../views/lyricsView'
import '/src/style.css'

export default observer(function Lyrics(props) {
  const [guessedWords, setGuessedWords] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [revealedWords, setRevealedWords] = useState([])
  const [title, setTitle] = useState('')
  const [revealedTitle, setRevealedTitle] = useState([])
  
  useEffect(() => {
    const words = Array.from(new Set(props.currentLyrics.toLowerCase().match(/\w+/g)))
    
    const hidePercentage = 40
    
    const initialRevealedWords = words
    .sort(() => Math.random() - 0.5)
    .slice(0, (hidePercentage / 100) * words.length)
    
    console.log("title: ", props.currentTitle)
    const initialRevealedTitle = Array(props.currentTitle.split(/\s+/).length).fill(false)
    console.log("init rev title: ", initialRevealedTitle)
    
    setLyrics(props.currentLyrics)
    setTitle(props.currentTitle)
    setRevealedWords(initialRevealedWords)
    setRevealedTitle(initialRevealedTitle)
    setGuessedWords([])
  }, [])

  return (
    <div>
      <LyricsView title={title} lyrics={lyrics} revealedTitle={revealedTitle} revealedWords={revealedWords}/>

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
  )
  
  function handleGuess() {
    if (currentGuess.trim() !== '') {
      const lowerCaseGuess = currentGuess.trim().toLowerCase()
      const lowerCaseLyrics = lyrics.toLowerCase()
      const lowerCaseTitle = title.toLowerCase()
      
      // Revealing only the guessed word in the title
      if (lowerCaseTitle.includes(lowerCaseGuess)) {
        setRevealedTitle((prevRevealedTitle) => {
          const newRevealedTitle = [...prevRevealedTitle]
          const titleWords = title.toLowerCase().split(/\s+/)
          
          titleWords.forEach((word, index) => {
            if (word === lowerCaseGuess) {
              newRevealedTitle[index] = true
            }
          })
          
          return newRevealedTitle
        })
      }
      
      // Revealing words in the lyrics
      if (lowerCaseLyrics.includes(lowerCaseGuess)) {
        setRevealedWords((prevRevealedWords) => {
          if (!prevRevealedWords.includes(lowerCaseGuess)) {
            return [...prevRevealedWords, lowerCaseGuess]
          } else {
            return prevRevealedWords
          }
        })
      }
      
      setGuessedWords([...guessedWords, lowerCaseGuess])
      setCurrentGuess('')
    }
  }
  
  
})