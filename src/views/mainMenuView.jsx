import React, { useState, useEffect } from 'react';

import { searchArtist } from "../../geniusSource"
import resolvePromise from "../resolvePromise"

function MainMenuView(props) {

    return (
        <div>
            <button onClick={searchACB}>Search</button>
        </div>
    )

    function searchACB() {
        props.test()
    }

}

export default MainMenuView