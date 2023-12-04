import { observer } from "mobx-react-lite"
import MainMenuView from "../views/mainMenuView"
import GeniusView from "../views/GeniusView"


export default
observer(
    function MainMenu(props) {
        return <div>
            <div>HEJ</div>
            <MainMenuView model={props.model} onArtistInputACB={searchArtistACB} onSearchClick={searchACB}></MainMenuView>
            {place_holder(props.model.searchResultsPromiseState)}
            
        </div>

        function place_holder(state) {
            if (!state.promise) {
                return "No data"
            }

            if (!state.data && !state.error) {
                return <img src="https://brfenergi.se/iprog/loading.gif"></img>
            }

            if (state.error) {
                return state.error
            }
            
            return <GeniusView res={state.data}></GeniusView>
        }

        function searchArtistACB(artistQuery) {
            props.model.setSearchQuery(artistQuery)
        }

        function searchACB() {
            props.model.doSearch(props.model.searchArtistQuery)
        }
    }
)