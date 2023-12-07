import { observer } from "mobx-react-lite"
import GuessBarView from "../views/guessBarView"
import GameView from "../views/gameView"
import LyricsView from "../views/lyricsView"
import Lyrics from "./lyricsPresenter"

export default observer(function Game(props) {
    return <div>
        {place_holder(props.model.currentTrack, props.model.currentLyrics)}
            
        </div>
    
    function place_holder(currentTrack, currentLyrics) {     

        if (!currentTrack || !currentLyrics) {
            return <img src="https://zingy-bublanina-005f23.netlify.app/playBarArtist.gif"/>// "https://brfenergi.se/iprog/loading.gif"/>
        }
        return (
            <div className="game-view">
                <div className="main-content">
                    <Lyrics model={props.model} currentLyrics={props.model.currentLyrics} currentTitle={props.model.currentTrack.title}/>
                    <GuessBarView guesses={props.model.guesses} hints={props.model.nbrHints} onHintClick={getHint} onGiveUpClick={giveUp}/>
                </div>
            </div>
        )
    }

    function getHint() {
        // TODO: Hint logic
        console.log("get hint")
    }

    function giveUp() {
        // TODO: Give up logic
        console.log("give up")
    }
})