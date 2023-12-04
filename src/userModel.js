import resolvePromise from "./resolvePromise"
import { getTrack, searchArtist } from "../geniusSource"

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

    currentTrack: null, // track ID (6 digits)
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
        this.removeGuest();
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

    getRandomSong() {
        // let id = Math.floor(Math.random() * 1000000) + 1
        // resolvePromise(getTrack(id.toString()), this.currentTrackPromiseState)
        // .then(tryGetTrack)
       
        const tryGetTrack = () => {
            const id = Math.floor(Math.random() * 1000000) + 1
            
            this.currentTrackPromiseState = resolvePromise(getTrack(id.toString()), this.currentTrackPromiseState)
            if (!this.currentTrackPromiseState.data) {
                console.log("in if")
                console.log("track state in if: ", this.currentTrackPromiseState)
                // TODO: Fix so that it find random song <3

            }
            console.log("track prms", this.currentTrackPromiseState)

            // return getTrack(id.toString()).then(track => {
            //   if (track) {
            //     // Valid track found
            //     console.log("track: ", track)
            //     this.currentTrackPromiseState = resolvePromise(track, this.currentTrackPromiseState)
            //     console.log("hello hello", this.currentTrackPromiseState.data)
            //   } else {
            //     // Invalid track, try again
            //     return tryGetTrack()
            //   }
            // })
          }
        
          // Start the recursive function
          tryGetTrack()
    },
    
    clearScores() {
        this.scores.length = 0
    },
    
    
    clearLyrics() {
        this.lyrics.length = 0;
    },
    
    clearGuesses() {
        this.guesses.length = 0
    },

    wipeModel() {
        this.setUser(null)
        this.removeGuest()
        this.setCurrentScore(0)
        this.setCurrentTrack(null)
        this.clearLyrics()
        this.clearScores()
        this.clearGuesses()
    }
    
}


