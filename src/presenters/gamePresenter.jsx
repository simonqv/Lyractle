import { observer } from "mobx-react-lite"
import GeniusView from "../views/GeniusView"

export default observer(function Game(props) {
    return <div>
        <span>Game Presenter</span>
        <p></p>
        {console.log("game log" , props.model)}
        {place_holder(props.model.currentTrack)}
            
        </div>
    function place_holder(state) {
        console.log("staet" , state)
     

        if (!state) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }
        return  <div>
            <span>{renderTrackACB(state)}</span>
        </div> // <GeniusView res={state.data}></GeniusView>
    }

    function renderTrackACB(track) {
        console.log("Track: ", track)
        return (
            <div key={track.id}>
                {track.artist_names}
                {track.title}
            </div>
        )
    }
})