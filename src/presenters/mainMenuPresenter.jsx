import { observer } from "mobx-react-lite"
import MainMenuView from "../views/mainMenuView"
import GeniusView from "../views/GeniusView"
import Hamburger from "./hamburgerPresenter"
import { useNavigate } from "react-router-dom"

export default
observer(
    function MainMenu(props) {
        const navigate = useNavigate()

        return <div>
            <MainMenuView model={props.model} onArtistInputACB={searchArtistACB} onHighScoresClick={goToHighScoresACB} onRandomClick={randomTrackACB} onSearchClick={searchACB}></MainMenuView>
            
        </div>
        /*
        function place_holder(state) {
            if (!state.promise) {
                return "No data"
            }

            if (!state.data && !state.error) {
                return <img src= "https://zingy-bublanina-005f23.netlify.app/playBarArtist.gif"/*"https://brfenergi.se/iprog/loading.gif"*//*></img>
            }

            if (state.error) {
                return state.error
            }
            
            return <GeniusView res={state.data}></GeniusView>
        }
        */
       
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