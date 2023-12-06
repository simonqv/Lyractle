import { CLIENT_ACCESS_TOKEN } from "./src/apiConfig";
import { getLyrics, getSong } from 'genius-lyrics-api';

const accessToken = "access_token=" + CLIENT_ACCESS_TOKEN

const baseUrl = "https://api.genius.com/"

function searchArtist(searchTerm) {
    const url = baseUrl + "search?q=" + new URLSearchParams(searchTerm) + "&" + accessToken 
    console.log("url: ", url)
    return fetch(url).then(getJSON_ACB)
}

// Get "nbrSongs" tracks from one artist
function getArtistTracks(artistID, nbrSongs) {
    const url = baseUrl + "artists/" + artistID + "/songs?sort=popularity&per_page=" + nbrSongs + "&" + accessToken 
    return fetch(url).then(getJSON_ACB)
}

function getGeniusTrack(trackID) {
    const url = baseUrl + "songs/" + trackID + "?" + accessToken 
    return fetch(url).then(getJSON_ACB)
}

// ACB to get json
function getJSON_ACB(resp) {
    if (!resp.ok) {
        throw new Error("Could not get genius information.")
    }
    return resp.json()
}

function getGeniusLyrics(geniusURL) {
    return getLyrics(geniusURL).then(
        (lyrics) => {
            return lyrics 
            // returnLyrics
        }
        ).catch((error) => console.log("Error getting lyrics: ", error))
}

export {searchArtist, getGeniusTrack, getArtistTracks, getGeniusLyrics}