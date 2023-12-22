import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import '/src/style.css'

import { GameStates } from "../userModel"
import { DEFAULT_VISIBLE_WORDS, LYRICS_REGEX } from '../constants'
import { countOccurrences, cleanTitle } from '../utilities'

import LyricsView from '../views/lyricsView'
import GuessInputView from '../views/guessInputView'
import FinalLyricsView from '../views/finalLyricsView'

export default observer(function Lyrics(props) {
  const [lyrics, setLyrics] = useState('')
  const [revealedWords, setRevealedWords] = useState([])
  const [title, setTitle] = useState('')
  const [revealedTitle, setRevealedTitle] = useState([])

  useEffect(() => {
        // Extract "word" property from each object in word_dict
    const new_words = props.model.guesses.map(obj => obj.word)

    // Concatenate arrays
    const initialRevealedWords = DEFAULT_VISIBLE_WORDS.concat(new_words)

    // Remove everyting in parentheses as that is most likely not relevant
    const cleanedTitle = cleanTitle(props.currentTitle)

    const initialRevealedTitle = cleanedTitle.toLowerCase().match(LYRICS_REGEX).map(word => initialRevealedWords.includes(word))
    
   setLyrics(props.currentLyrics)
   setTitle(cleanedTitle)
   setRevealedWords(initialRevealedWords)
   setRevealedTitle(initialRevealedTitle)
}, [])

// This is to find that the revealedTitle has changed to all true
useEffect(() => {
  if (revealedTitle.length > 0 && revealedTitle.every(word => word === true)) {
    props.model.addToScores(props.model.currentTrack.track, props.model.currentScore)
    props.model.setGameState(GameStates.WIN)
    const guessNum = props.model.currentScore
  }
}, [revealedTitle])

const isGameWon = props.model.gameState === 'WIN'

  return (
    null
  )


  


  
  
  
  
  
})