import { searchArtist } from "../../geniusSource"
import { useEffect } from "react";

function MainMenuView(props) {

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

    function artistInputACB(evt) {
        props.onArtistInputACB(evt.target.value)
    }

    function playByArtistACB() {
        return (
        <div>
            <input onChange={artistInputACB} defaultValue="search for artist"/>
            <button className='button' onClick={searchACB}>search</button>
        </div>
        )
    }

    function highScoresACB() {
        props.onHighScoresClick()
    }
    
    function searchACB() {
        props.onSearchClick()
    }

}

export default MainMenuView