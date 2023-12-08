import { observer } from "mobx-react-lite"
import MainMenuView from "../views/mainMenuView"
import { useNavigate } from "react-router-dom"

export default
observer(
    function MainMenu(props) {
        const navigate = useNavigate()

        return <div>
            {checkState(props.model.currentTrack)}
        </div>
        
        function checkState(track) {
            /*
            if (!track) {
                console.log("track" , track)
                console.log("guest", props.model.guest)
                return <img src= "https://zingy-bublanina-005f23.netlify.app/playBarArtist.gif"></img>
            }*/
            
            return <MainMenuView model={props.model} onArtistInputACB={searchArtistACB} onContinueGameClick={continueGameACB} onHighScoresClick={goToHighScoresACB} onRandomClick={randomTrackACB} onSearchClick={searchACB}></MainMenuView>

        }

        function continueGameACB() {
            navigate("/game")
        }
       
        function goToHighScoresACB() {
            navigate("/highScores")
        }

        function searchArtistACB(artistQuery) {
            props.model.setSearchQuery(artistQuery)
        }

        function searchACB() {
            props.model.doSearch(props.model.searchArtistQuery)
        }

        function randomTrackACB() {
            props.model.getRandomSong()
            
            navigate("/game")

        }
    }
)