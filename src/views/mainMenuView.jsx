import React, { useState, useEffect } from 'react';

import { searchArtist } from "../../geniusSource"

function MainMenuView(props) {

    return (
        <div>
            <h1>Lyractle</h1>
            <button onClick={randomSongACB}>start random game</button>
            <button onClick={playByArtistACB}>play by artist</button>
            {props.model.user ? <button onClick={highScoresACB}>high scores</button> : <div/>} 
            <input onChange={artistInputACB} defaultValue="Search for artist"/>
            <button onClick={searchACB}>Search</button>
        </div>
    )

    function randomSongACB() {
        props.onRandomClick()
    }

    function artistInputACB(evt) {
        console.log("artist input", evt.target.value)
        props.onArtistInputACB(evt.target.value)
    }

    function playByArtistACB() {
        return (
        <div>
            <input onChange={artistInputACB} defaultValue="search for artist"/>
            <button onClick={searchACB}>search</button>
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