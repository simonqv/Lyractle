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
        console.log("state: ", state)
        if (!state.data && !state.error) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }

        if (state.error) {
            return state.error
        }
    
        return <ArtistSearchResultView res={state.data}></ArtistSearchResultView>
    }
}

export default PlayByArtistView