import { useEffect, useState } from "react"
import Modal from "react-modal"
import { searchArtist } from "../../geniusSource"
import PlayBarArtistView from "./playByArtistView"


function MainMenuView(props) {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Update body classList when the component mounts
        document.body.classList.add('primary-background');
    
        // Cleanup the classList when the component unmounts
        return () => {
          document.body.classList.remove('primary-background');
        };
      }, []); // Empty dependency array means this effect runs once when the component mounts
    
    return (
        <div className='main-menu-content'>
            <h1 className='h1' style={{marginBottom: '40px'}}>Lyractle</h1>
            {props.model.currentTrack ? <button className='button' style={{minWidth: "326px"}} onClick={continueGameACB}>continue game</button> : <div/>}
            <button className='button' onClick={randomSongACB}>start random game</button>
            <button className='button' style={{minWidth: "326px"}} onClick={playByArtistACB}>play by artist</button>
            {props.model.user ? <button className='button' style={{minWidth: "326px"}} onClick={highScoresACB}>high scores</button> : <div/>} 
            {/* <PlayBarArtistView model={props.model} isOpen={showModal} onRequestClose={closeModal} onSearch={search} onInputChange={artistInput}/> */}
            {/* <Modal isOpen={showModal} onRequestClose={closeModal}>
                <div>
                    <input onChange={artistInput} defaultValue="search for artist"/>
                    <button className='button' onClick={search}>search</button>
                    <button onClick={closeModal}>Close</button>
                    {awaitResults(props.model.searchResultsPromiseState)}
                </div>
            </Modal> */}
            {/* <input onChange={artistInputACB} defaultValue="Search for artist"/> */}
            {/* <button className='button' onClick={searchACB}>Search</button> */}
        </div>
    )

    function continueGameACB() {
        props.onContinueGameClick()
    }

    function randomSongACB() {
        props.onRandomClick()
    }

    function artistInput(evt) {
        props.onArtistInputACB(evt.target.value)
    }

    function playByArtistACB() {
        console.log("Should search for artist")
        // setShowModal(true)
    }

    function closeModal() {
        setShowModal(false)
    }

    function highScoresACB() {
        props.onHighScoresClick()
    }
    
    function search() {
        props.onSearchClick()
    }

    function awaitResults(state) {
        console.log("state: ", state)
        if (!state.promise) {
            return "No data"
        }

        if (!state.data && !state.error) {
            return <img src="https://brfenergi.se/iprog/loading.gif"></img>
        }

        if (state.error) {
            return state.error
        }
    
        return <ArtistSearchResultView res={state.data}></ArtistSearchResultView>
    }

}

export default MainMenuView