import { CLIENT_ACCESS_TOKEN, MUSICXMATCH_KEY } from "./apiConfig";
//import { getLyrics, getSong } from 'genius-lyrics-api';

//const accessToken = "access_token=" + CLIENT_ACCESS_TOKEN
const accessToken = "apikey=" + MUSICXMATCH_KEY

/*
Please excuse my message at a late time, but Cristi made a proxy like in the labs. 
So please test, so you don't have to use a local host proxy server (replace the pokemon-api and the key):

fetch("https://brfenergi.se/iprog/group/200/https://pokeapi.co/api/v2/pokemon/25", 
       {headers:{"X-DH2642-Key":"3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"}})
*/



// const baseUrl = "https://api.genius.com/"
const proxy = "https://brfenergi.se/iprog/group/200/"
const baseUrl = proxy + "https://api.musixmatch.com/ws/1.1/"


const options = {
    headers: {
        'X-DH2642-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767',
    }
}


// function searchArtist(searchTerm) {
//     const url = baseUrl + "search?q=" + new URLSearchParams(searchTerm) + "&" + accessToken 
//     console.log("url: ", url)
//     return fetch(url).then(getJSON_ACB)
// }

function searchArtist(searchTerm) {
    console.log("search term: ", searchTerm)
    const url = baseUrl + "artist.search?q_artist=" + new URLSearchParams(searchTerm) + "&page_size=10&format=json" + "&" + accessToken
    console.log("url: ", url)
    return fetch(url, options).then(getJSON_ACB)
}

// Get "nbrSongs" tracks from one artist
// function getArtistTracks(artistID, nbrSongs) {
//     const url = baseUrl + "artists/" + artistID + "/songs?sort=popularity&per_page=" + nbrSongs + "&" + accessToken 
//     return fetch(url).then(getJSON_ACB)
// }

// http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc
function getArtistTracks(artistID, nbrSongs) {
    //const url = baseUrl + "artists/" + artistID + "/songs?sort=popularity&per_page=" + nbrSongs + "&" + accessToken 
    const url = baseUrl + "track.search?f_artist_id=" + artistID + "&f_has_lyrics=true&format=json&page_size=" + nbrSongs + "&" + accessToken
    console.log("track url: ", url)
    return fetch(url, options).then(getJSON_ACB)
}

// function getGeniusTrack(trackID) {
//     const url = baseUrl + "songs/" + trackID + "?" + accessToken 
//     return fetch(url).then(getJSON_ACB)
// }

function getTrack(trackID) {
    const url = baseUrl + "track.get?commontrack_id=" + trackID + "&" + accessToken
    return fetch(url, options).then(getJSON_ACB)
}

// track.lyrics.get?track_id=15953433

function getMusicLyrics(trackID) {
    const url = baseUrl + "track.lyrics.get?commontrack_id=" + trackID + "&" + accessToken
    return fetch(url, options).then(getJSON_ACB)

}

// ACB to get json
function getJSON_ACB(resp) {
    if (!resp.ok) {
        throw new Error("Could not get API information.")
    }
    return resp.json()
}
/*
function getGeniusLyrics(geniusURL) {
    return getLyrics(geniusURL).then(
        (lyrics) => {
            return lyrics 
            // returnLyrics
        }
        ).catch((error) => console.log("Error getting lyrics: ", error))
}*/

export {searchArtist, getArtistTracks, getMusicLyrics, getTrack}