import { observer } from "mobx-react-lite"
import GuessBarView from "../views/guessBarView"
import GameView from "../views/gameView"

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
                {/*Lyrics lyrics={props.model.currentLyrics} title={props.model.currentTrack.title}/>*/}
                <GameView lyrics={currentLyrics} title={currentTrack.title}></GameView>
            </div>
        )
    }
})