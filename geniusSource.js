// const dotenv = require('dotenv')

// dotenv.config()
import { CLIENT_ACCESS_TOKEN } from "./src/apiConfig";

//const apiKey = process.env.CLIENT_ACCESS_TOKEN
const accessToken = "&access_token=" + CLIENT_ACCESS_TOKEN

const baseUrl = "https://api.genius.com/search?q="

const options = {
    method: 'GET',
    headers: {
        'X-Mashape-Key': CLIENT_ACCESS_TOKEN,
    }
};

function searchArtist(searchTerm) {
    const url = baseUrl + searchTerm + accessToken
    console.log(url)
    return fetch(url, options).then(getJSON_ACB)
}

// ACB to get json
function getJSON_ACB(resp) {
    if (!resp.ok) {
        throw new Error("Could not get genius information.")
    }
    console.log("json resp: ", resp.json())
    return resp.json()
}

export {searchArtist}