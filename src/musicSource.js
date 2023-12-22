import { MUSICXMATCH_KEY } from "./apiConfig";

const accessToken = "apikey=" + MUSICXMATCH_KEY


const proxy = "https://brfenergi.se/iprog/group/200/"
const baseUrl = proxy + "https://api.musixmatch.com/ws/1.1/"


const options = {
    headers: {
        'X-DH2642-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767',
    }
}

function searchArtist(searchTerm) {
    const url = baseUrl + "artist.search?q_artist=" + new URLSearchParams(searchTerm) + "&page_size=10&format=json" + "&" + accessToken
    // console.log("url: ", url)
    return fetch(url, options).then(getJSON_ACB)
}

function getArtistTracks(artistID, nbrSongs) {
    const url = baseUrl + "track.search?f_artist_id=" + artistID + "&f_has_lyrics=1&format=json&page_size=" + nbrSongs + "&" + accessToken
    return fetch(url, options).then(getJSON_ACB)
}

function getTrack(trackID) {
    const url = baseUrl + "track.get?commontrack_id=" + trackID + "&" + accessToken
    return fetch(url, options).then(getJSON_ACB)
}

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

export {searchArtist, getArtistTracks, getMusicLyrics, getTrack}