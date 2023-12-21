import { observer } from "mobx-react-lite"
import GuessBarView from "../views/guessBarView"
import GameView from "../views/gameView"
import LyricsView from "../views/lyricsView"
import Lyrics from "./lyricsPresenter"
import { GameStates } from "../userModel"
import { useNavigate } from "react-router-dom"


export default observer(function Game(props) {

    const navigate = useNavigate()

    return  <div>
    {place_holder(props.model.currentTrack, props.model.currentLyrics)}
        
    </div>
    
    function place_holder(currentTrack, currentLyrics) {   
        console.log("place_holder called");
        console.log("currentTrack:", currentTrack);
        console.log("currentLyrics:", currentLyrics);
        
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

                    <Lyrics model={props.model} currentLyrics={props.model.currentLyrics} currentTitle={props.model.currentTrack.track.track_name}/>
                    <GuessBarView setGameState={props.model.setGameState} currentOccurence={props.model.currentOccurence} currentGuess= {props.model.currentGuess} guesses={props.model.guesses} hints={props.model.nbrHints} onHintClick={getHint} onGiveUpClick={giveUp}/>
                    
                </div>
            </div>
        )
    }

    function getHint() {
        // TODO: Get hint logic
        const hintWord = props.model.getHint(); 
        if (hintWord) {
            props.model.nbrHints ++;
        }
    }


    function giveUp() {
        // TODO: Give up logic
        props.model.setGameState(GameStates.GIVEN_UP)
        console.log("Game has been given up!")
    }


})