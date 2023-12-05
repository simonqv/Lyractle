// const dotenv = require('dotenv')

// dotenv.config()
import { CLIENT_ACCESS_TOKEN } from "./src/apiConfig";

//const apiKey = process.env.CLIENT_ACCESS_TOKEN
const accessToken = "access_token=" + CLIENT_ACCESS_TOKEN

const baseUrl = "https://api.genius.com/"

// Do not use, creates CORS problems 
const options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${CLIENT_ACCESS_TOKEN}`,
    }
};

function searchArtist(searchTerm) {
    const url = baseUrl + "search?q=" + new URLSearchParams(searchTerm) + "&" + accessToken 
    return fetch(url).then(getJSON_ACB)
}

// Get "nbrSongs" tracks from one artist
function getArtistTracks(artistID, nbrSongs) {
    const url = baseUrl + "artists/" + artistID + "/songs?sort=popularity&per_page=" + nbrSongs + "&" + accessToken 
    return fetch(url).then(getJSON_ACB)
}

function getTrack(trackID) {
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

export {searchArtist, getTrack, getArtistTracks}