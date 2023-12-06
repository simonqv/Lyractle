import { observer } from "mobx-react-lite"
import GeniusView from "../views/GeniusView"
import LyricsView from "../views/lyricsView"

export default observer(function Game(props) {
    return <div>
        <span>Game Presenter</span>
        <p></p>
        {place_holder(props.model.currentTrack, props.model.currentLyrics)}
            
        </div>
    function place_holder(currentTrack, currentLyrics) {     

        if (!currentTrack || !currentLyrics) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }
        return (
            <div>
                <span>{renderTrackACB(currentTrack, currentLyrics)}</span>
            </div>
        )
    }

    function renderTrackACB(track, lyrics) {
        return (
            <div key={track.id}>
                {track.artist_names}
                {track.title}
                <LyricsView currentLyrics={lyrics}/>
            </div>
        )
    }
})