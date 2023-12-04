import resolvePromise from "./resolvePromise"
import { searchArtist } from "../geniusSource"

/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

const GameStates = Object.freeze({ 
    PLAYING: "playing", 
    WIN: "win", 
    GIVEN_UP: "given up" 
  })

export default {
    user: undefined,
    guest: null,

    currentTrack: null,
    currentLyrics: [],
    
    currentScore: null,
    guesses: [],
    scores: [],
    
    gameState: null, // Playing, win, given up
    searchArtistQuery: null,
    
    currentTrackPromiseState: {},
    scoresPromiseState: {},
    searchResultsPromiseState: {},

    setUser(user) {
        this.user = user
    },

    setGuest() {
        this.guest = true
    },

    removeGuest() {
        this.guest = false
    },

    setCurrentScore(nr) {
        if(!Number.isInteger(nr) || nr < 0 ) {
            throw new Error("Current score is not a positive integer")
        }
        this.currentScore = nr
    },

    setCurrentTrack(track) {
        this.currentTrack = track
    },

    setCurrentLyrics(lyrics) {
        // Done with lyricsgenius python module
        this.currentLyrics = lyrics
    },

    setScores(scores) {
        this.scores = scores
    },

    addToScores(newScore) {
        this.scores = sortScores([...this.scores, newScore])
    },
    
    removeFromScores() {
        if (this.scores.length > 100) {
            this.scores.splice(100)
        }
    },

    addToGuesses(newGuess) {
        this.guesses = [newGuess, ...this.guesses]
    },

    resetGuesses() {
        this.guesses = []
    },

    setGameState(state) {
        /*
         playing, win or give up
         when calling, use yourObject.setGameState(GameStates.PLAYING);
        */
        if (Object.values(GameStates).includes(state)) {
            this.gameState = state
        } else {
            throw new Error(`Invalid game state: ${state}`)
        }
    },
       
    setSearchQuery(query) {
        this.searchArtistQuery = query
    },

    doSearch(searchArtistQuery) {
        this.searchResultsPromiseState = resolvePromise(searchArtist(searchArtistQuery), this.searchResultsPromiseState)
    },

    wipeModel() {
        this.setUser(null)
        this.removeGuest()
        this.setCurrentScore(0)
        this.setCurrentTrack(null)
        this.setCurrentLyrics(null)
        this.setScores([])
        this.resetGuesses()
    }
    
}


