import resolvePromise from "./resolvePromise"
import { searchArtist, getArtistTracks, getMusicLyrics } from "./musicSource"
import {artists} from "./constants"


const localStorageKey = "gameState"

/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

export const GameStates = Object.freeze({ 
    PLAYING: "playing", 
    WIN: "win", 
    GIVEN_UP: "given up" 
  })

export default {
    user: undefined,
    guest: null,

    currentTrack: null, // Full track
    currentLyrics: null,

    currentGuess: "",
    currentOccurence: null,
    nbrHints: 0,
    guesses: [],
    scores: {},
    
    gameState: null, // Playing, win, given up
    searchArtistQuery: null,
    
    currentTrackPromiseState: {},
    artistTrackPromiseState: {},
    lyricsPromiseState: {},
    scoresPromiseState: {},
    searchResultsPromiseState: {},

    setUser(user) {
        this.user = user
        this.removeGuest()
    },


    setGuest() {
        this.guest = true
    },

    removeGuest() {
        this.guest = false
    },

    setNbrHints(nr) {
        if (nr <= 3) {
            this.nbrHints = nr
        }
    },

    setCurrentGuess(guess) {
        this.currentGuess = guess
    },

    setCurrentTrack(track) {
        this.currentTrack = track
    },

    setCurrentLyrics(lyrics) {
        this.currentLyrics = this.cleanLyrics(lyrics)
    },
    
    setScores(scores) {
        this.scores = scores
    },

    addToScores(track, newScore) {
        this.scores[track.commontrack_id] = [track.track_name, newScore]
    },
    
    removeFromScores() {
        if (this.scores.length > 100) {
            this.scores.splice(100)
        }
    },

    addToGuesses(newGuess) {
        // this.guesses = [newGuess, ...this.guesses]
        this.guesses = [...this.guesses, newGuess]
    },

    setGuesses(guesses) {
        this.guesses = guesses
    },

    init() {
        const savedState = localStorage.getItem(localStorageKey)
        if (savedState) {
            const parsedState = JSON.parse(savedState)
            Object.assign(this, parsedState)
        }
    },

    saveGameState() {
        localStorage.setItem(localStorageKey, JSON.stringify(this))
    },

    clearSavedState() {
        localStorage.removeItem(localStorageKey)
    },

    setGameState(state) {
        if (Object.values(GameStates).includes(state)) {
            this.gameState = state
            this.saveGameState() // Save the game state whenever it changes
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

    getArtistSongs(artistID, nbrSongs) {
        this.artistTrackPromiseState = resolvePromise(getArtistTracks(artistID, nbrSongs), this.artistTrackPromiseState)
    },

    getLyrics(trackID) {
        this.lyricsPromiseState = resolvePromise(getMusicLyrics(trackID), this.lyricsPromiseState)
    },

    cleanLyrics(lyrics) {
        if (!lyrics) {
            return null
        }
        
        // Remove the last part starting from "*******" to the end
        const cleanedLyrics = lyrics.replace(/\*{7,}[\s\S]*$/, '')
      
        // Remove any trailing three dots
        const finalLyrics = cleanedLyrics.replace(/\.{3}\s*$/, '')
      
        return finalLyrics.trim()
    },

    getRandomElement(list) {
        const randomIndex = Math.floor(Math.random() * list.length)
        return list[randomIndex]
    },

    getSongFromArtist(artistID) {
        // Get a random song from the artist
        this.getArtistSongs(artistID, 10)
        this.artistTrackPromiseState.promise.then(() => {
            let foundSongWithLyrics = false
            const possibleSongs = this.artistTrackPromiseState.data.message.body.track_list
            
            while (!foundSongWithLyrics) {
                const randomSong = this.getRandomElement(possibleSongs)

                if (randomSong === undefined) {
                    console.log("Something went wrong :( try another artist")
                    break; // Break the loop if there are no more songs to try
                }

                if (randomSong.track.has_lyrics == 0) {
                    console.log("Song has no lyrics")
                    // Remove the current song from the list
                    const index = possibleSongs.indexOf(randomSong)
                    if (index !== -1) {
                        possibleSongs.splice(index, 1)
                    }
                } else {
                    foundSongWithLyrics = true
                    this.setCurrentTrack(randomSong)
                    this.getLyrics(this.currentTrack.track.commontrack_id)
                    this.lyricsPromiseState.promise.then(() => {
                        this.setCurrentLyrics(this.lyricsPromiseState.data.message.body.lyrics.lyrics_body)
                        this.searchResultsPromiseState = {}
                    })
                }
            }
        })
    },

    getRandomSong() {

        this.prepareModelForNewGame()

        const ranArtist = this.getRandomElement(artists)
        this.doSearch(ranArtist)
        
        this.searchResultsPromiseState.promise.then(() => {
            const foundArtists = this.searchResultsPromiseState.data.message.body.artist_list
            let artistID = null
            // Make sure the searched artist is the same as the found artist
            for (const foundArtist of foundArtists) {
                // If there isn't a "perfect match" of searched artist and primary artist name. 
                artistID = foundArtist.artist.artist_id
                if (ranArtist.toLowerCase() === foundArtist.artist.artist_name.toLowerCase()) {
                    artistID = foundArtist.artist.artist_id
                    break
                }
            }

            this.getSongFromArtist(artistID)
          })
        
    },
    
    clearGuesses() {
        if (this.guesses) {
            this.guesses.length = 0
        }
    },

    prepareModelForNewGame() {
        this.setNbrHints(0)
        this.setCurrentTrack(null)
        this.setCurrentLyrics(null)
        this.clearGuesses()
        this.setGameState(GameStates.PLAYING)
    },

    wipeModel() {
        this.setUser(null)
        this.removeGuest()
        this.setNbrHints(0)
        this.setCurrentTrack(null)
        this.setCurrentLyrics(null)
        this.setScores({})
        this.clearGuesses()
        this.gameState = null
        this.searchArtistQuery = null
        this.currentTrackPromiseState = {}
        this.lyricsPromiseState = {}
        this.artistTrackPromiseState = {}
        this.scoresPromiseState = {}
        this.searchResultsPromiseState = {}
    }
    
}