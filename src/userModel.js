import resolvePromise from "./resolvePromise"
import { getTrack, searchArtist, getArtistTracks } from "../geniusSource"
import artists from "./artists"

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
    currentLyrics: [],
    

    currentScore: null,
    guesses: [],
    scores: [],
    
    gameState: null, // Playing, win, given up
    searchArtistQuery: null,
    
    currentTrackPromiseState: {},
    artistTrackPromiseState: {},
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

    setGuesses(guesses) {
        this.guesses = guesses
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

    getArtistSongs(artistID, nbrSongs) {
        this.artistTrackPromiseState = resolvePromise(getArtistTracks(artistID, nbrSongs), this.artistTrackPromiseState)
    },

    getRandomSong() {

        function getRandomElement(list) {
            const randomIndex = Math.floor(Math.random() * list.length);
            return list[randomIndex];
        }

        this.setCurrentTrack(null)
        const ranArtist = getRandomElement(artists)
        this.doSearch(ranArtist)
        
        this.searchResultsPromiseState.promise.then(() => {

            const foundArtists = this.searchResultsPromiseState.data.response.hits
            let artistID = null

            // Make sure the searched artist is the same as the found artist
            for (let i = 0; i < foundArtists.length; i++) {
                if (ranArtist === foundArtists[i].result.primary_artist.name) {
                    artistID = foundArtists[i].result.primary_artist.id
                    break
                }
            }

            // Get a random song from the artist
            this.getArtistSongs(artistID, 30)
            this.artistTrackPromiseState.promise.then(() => {
                const randomSong = getRandomElement(this.artistTrackPromiseState.data.response.songs)
                randomSong.title
                this.setCurrentTrack(randomSong)
                console.log("random song:", this.currentTrack)
            })
          });
        
    },
    
    clearScores() {
        if (this.scores) {
            this.scores.length = 0
        }
    },
    
    
    clearLyrics() {
        if (this.lyrics) {
            this.lyrics.length = 0;
        }
    },
    
    clearGuesses() {
        if (this.guesses) {
            this.guesses.length = 0
        }
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


