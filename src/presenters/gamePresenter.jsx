import { useState, useEffect } from 'react'
import { observer } from "mobx-react-lite"

import '/src/style.css'

import { GameStates } from "../userModel"
import { DEFAULT_VISIBLE_WORDS, LYRICS_REGEX } from '../constants'
import { countOccurrences, cleanTitle } from '../utilities'

import GuessBarView from "../views/guessBarView"
import LyricsView from '../views/lyricsView'
import GuessInputView from '../views/guessInputView'
import FinalLyricsView from '../views/finalLyricsView'

export default observer(function Game(props) {

    const [lyrics, setLyrics] = useState('')
    const [revealedWords, setRevealedWords] = useState([])
    const [title, setTitle] = useState('')
    const [revealedTitle, setRevealedTitle] = useState([])
  
    useEffect(() => {
        if (props.model.currentTrack && props.model.currentLyrics) {

            // Extract "word" property from each object in word_dict
            const new_words = props.model.guesses.map(obj => obj.word)
            
            // Concatenate arrays
            const initialRevealedWords = DEFAULT_VISIBLE_WORDS.concat(new_words)
            
            
            // Remove everyting in parentheses as that is most likely not relevant
            const cleanedTitle = cleanTitle(props.model.currentTrack.track.track_name)
            
            const initialRevealedTitle = cleanedTitle.toLowerCase().match(LYRICS_REGEX).map(word => initialRevealedWords.includes(word))
            
            setLyrics(props.model.currentLyrics)
            setTitle(cleanedTitle)
            setRevealedWords(initialRevealedWords)
            setRevealedTitle(initialRevealedTitle)
    }
    }, [props.model.currentTrack, props.model.currentLyrics, props.model.guesses])

    // This is to find that the revealedTitle has changed to all true
    useEffect(() => {
        if (revealedTitle.length > 0 && revealedTitle.every(word => word === true)) {
            props.model.addToScores(props.model.currentTrack.track, props.model.guesses.length)
            props.model.setGameState(GameStates.WIN)
        }
    }, [revealedTitle])

    return  <div>
        {renderGame(props.model.currentTrack, props.model.currentLyrics)}  
    </div>
    
    function renderGame(currentTrack, currentLyrics) {
        
        if (!currentTrack || !currentLyrics) {
            return (
            <div className="loading-view">
                <img src="https://zingy-bublanina-005f23.netlify.app/playBarArtist.gif"/>
                <h3 className="h3">loading...</h3>
            </div>)
        }
        return (
            <div className="game-view">
                <div className="main-content">
                    <div className='lyrics-and-guess-input'>
                        {props.model.gameState === GameStates.PLAYING && (
                            <LyricsView title={title} lyrics={lyrics} revealedTitle={revealedTitle} revealedWords={revealedWords} gameState={props.model.gameState}/>
                        )}
                        {(props.model.gameState === GameStates.WIN || props.model.gameState === GameStates.GIVEN_UP) && (
                            <FinalLyricsView title={title} artist={props.model.currentTrack.track.artist_name} lyrics={lyrics} guesses={props.model.guesses} revealedTitle={revealedTitle} revealedWords={revealedWords} gameState={props.model.gameState}/>
                        )}
                        {props.model.gameState === GameStates.PLAYING && (
                            <GuessInputView currentGuess={props.model.currentGuess} onHandleGuess={handleGuess} onSetGurrentGuess={setCurrentGuess} />
                        )}
                    </div>
                    <GuessBarView gameState={props.model.gameState} setGameState={props.model.setGameState} currentGuess= {props.model.currentGuess} guesses={props.model.guesses} hints={props.model.nbrHints} onHintClick={getHint} onGiveUpClick={giveUp}/>
                </div>
            </div>
        )
    }

    function setCurrentGuess(val) {
        props.model.setCurrentGuess(val)
    }
    
    function addGuess(guess) {
        props.model.addToGuesses(guess)
    }

    function handleGuess() {
        const trimmedGuess = props.model.currentGuess.trim().toLowerCase()
        
        if (trimmedGuess === '') {
            return
        }
        
        const guessedWord = props.model.guesses.find((guess) => guess.word === trimmedGuess)
        
        if (guessedWord) {
            return
        }
        
        const lowerCaseLyrics = lyrics.toLowerCase()
        const lowerCaseTitle = title.toLowerCase()
        
        const occurrencesInLyrics = countOccurrences(lowerCaseLyrics, trimmedGuess)
        const occurrencesInTitle = countOccurrences(lowerCaseTitle, trimmedGuess)
        const totOccurrences = occurrencesInLyrics + occurrencesInTitle
        
        addGuess({ word: trimmedGuess, occurrences: totOccurrences })
        
        revealGuessedWordInTitle(lowerCaseTitle, trimmedGuess)
        revealWordsInLyrics(lowerCaseLyrics, trimmedGuess)
    }

    function revealGuessedWordInTitle(lowerCaseTitle, trimmedGuess) {
        if (lowerCaseTitle.includes(trimmedGuess)) {
          setRevealedTitle((prevRevealedTitle) => {
            const newRevealedTitle = [...prevRevealedTitle]
            const titleWords = title.toLowerCase().match(LYRICS_REGEX)
      
            titleWords.forEach((word, index) => {
              if (word === trimmedGuess) {
                newRevealedTitle[index] = true
              }
            })
      
            return newRevealedTitle
          })
        }
    }

    function revealWordsInLyrics(lowerCaseLyrics, trimmedGuess) {
        if (lowerCaseLyrics.includes(trimmedGuess)) {
          setRevealedWords((prevRevealedWords) =>
            prevRevealedWords.includes(trimmedGuess) ? prevRevealedWords : [...prevRevealedWords, trimmedGuess]
          )
        }
      }

    function getHint() {
        if (props.model.nbrHints < 3) {
            const titleWords = title.toLowerCase().match(LYRICS_REGEX)

            const revealedWords = DEFAULT_VISIBLE_WORDS.concat(props.model.guesses).concat(titleWords)
            const potentialWords = props.model.currentLyrics.match(/\b\w+\b/g) || []

            const unrevealedWords = potentialWords.filter((word) => !revealedWords.includes(word.toLowerCase()))

            const hintWord = props.model.getRandomElement(unrevealedWords)
            
            if (hintWord) {
                setCurrentGuess(hintWord)
                handleGuess()
                props.model.setNbrHints(props.model.nbrHints + 1)
                setCurrentGuess("")
            }
        }
    }

    function giveUp() {
        props.model.setGameState(GameStates.GIVEN_UP)
    }

})