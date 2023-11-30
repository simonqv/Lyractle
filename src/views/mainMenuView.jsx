import React, { useState, useEffect } from 'react';

import { searchArtist } from "../../geniusSource"
import resolvePromise from "../resolvePromise"

function MainMenuView(props) {

    return (
        <div>
            <input onChange={artistInputACB} defaultValue="Search for artist"/>
            <button onClick={searchACB}>Search</button>
        </div>
    )

    function artistInputACB(evt) {
        console.log("artist input", evt.target.value)
        props.onArtistInputACB(evt.target.value)
    }


    function searchACB() {
        props.onSearchClick()
    }

}

export default MainMenuView