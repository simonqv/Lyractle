import resolvePromise from "./resolvePromise";
import { searchArtist } from "../geniusSource";

/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/
export default {
    user: null,
    currentScore: null,
    currentTrack: {},
    currentLyrics: [],
    scores: [],
    guesses: [],
    gameState: null, // Playing, won, given up
    searchParams: {},
    currentTrackPromiseState: {},
    scoresPromiseState: {},
    searchResultsPromiseState: {},

    setUser(user) {
        this.user = user
    },

    setCurrentScore(nr) {
        if(!Number.isInteger(nr) || nr < 0 ) {
            throw new Error("current score is not a positive integer")
        }
        this.currentScore = nr
    },

    setCurrentTrack() {
        // TODO
    },

    setCurrentLyrics(lyrics) {
        this.currentLyrics = lyrics
    },

    addToScores(newScore) {
        this.scores = [...this.scores, newScore]
    },
    
    removeFromScores() {
        if (this.scores.length > 100) {
            this.scores.splice(100)
        }
    },

    addToGuesses(newGuess) {
        this.guesses = [...this.guesses, newGuess]
    },

    resetGuesses() {
        this.guesses = []
    },

    setGameState(state) {
        this.gameState = state
    },
    
    // /* 
    //    setting the ID of dish currently checked by the user.
    //    A strict MVC/MVP Model would not keep such data, 
    //    but we take a more relaxed, "Application state" approach. 
    //    So we store also abstract data that will influence the application status.
    //  */
    // setCurrentDish(id){
    //     if (id && id !== this.currentDish){
    //         this.currentDish=id;
    //         this.currentDishPromiseState =  resolvePromise(getDishDetails(id), this.currentDishPromiseState) 
    //     }
        
    //     // note that we are adding a new object property (currentDish) which was not initialized in the constructor
    // },
    // // more methods will be added here, don't forget to separate them with comma!
    
    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    doSearch(searchParams) {
        this.searchResultsPromiseState = resolvePromise(searchArtist("adele"), this.searchResultsPromiseState)
    },

    
}


