import Modal from "react-modal"
import ArtistSearchResultView from "./artistSearchResultView"

Modal.setAppElement("#root"); // Set the root element for accessibility

function PlayByArtistView(props) {


    return (
        <Modal className={"search-modal"} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
            <div>
                <input className="artist-input" onChange={artistInputACB} defaultValue="search for artist"/>
                <button className='button' onClick={searchACB}>search</button>
                <button onClick={props.onRequestClose}>Close</button>
                {awaitResults(props.model.searchResultsPromiseState)}
            </div>
        </Modal>
    )

    function artistInputACB(evt) {
        props.onInputChange(evt.target.value)
    }

    function searchACB() {
        props.onSearch()
    }

    function awaitResults(state) {
        console.log("state RESULT: ", state)
        return <img src="https://zingy-bublanina-005f23.netlify.app/playBarArtist.gif"></img>

        if (!state.data && !state.error) {
        }
        
        if (state.error) {
            return state.error
        }
    
        return <ArtistSearchResultView res={state.data}></ArtistSearchResultView>
    }
}

export default PlayByArtistView