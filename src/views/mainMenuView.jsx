import React, { useState, useEffect } from 'react';

import { searchArtist } from "../../geniusSource"

function MainMenuView(props) {
    document.body.style.backgroundColor = 'var(--primary)';

    return (
        <div className='main-menu-content'>
            <h1 className='h1' style={{marginBottom: '100px'}}>Lyractle</h1>
            <button className='button' onClick={randomSongACB}>start random game</button>
            <button className='button' style={{minWidth: "326px"}} onClick={playByArtistACB}>play by artist</button>
            {props.model.user ? <button className='button' style={{minWidth: "326px"}} onClick={highScoresACB}>high scores</button> : <div/>} 
            {/* <input onChange={artistInputACB} defaultValue="Search for artist"/> */}
            {/* <button className='button' onClick={searchACB}>Search</button> */}
        </div>
    )

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