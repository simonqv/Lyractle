// const dotenv = require('dotenv')

// dotenv.config()
import { CLIENT_ACCESS_TOKEN } from "./src/apiConfig";

//const apiKey = process.env.CLIENT_ACCESS_TOKEN
const accessToken = "&access_token=" + CLIENT_ACCESS_TOKEN

const baseUrl = "https://api.genius.com/search?q="


// Do not use, creates CORS problems 
const options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${CLIENT_ACCESS_TOKEN}`,
    }
};

function searchArtist(searchTerm) {
    const url = baseUrl + searchTerm + accessToken 
    console.log(url)
    return fetch(url).then(getJSON_ACB)
}

// ACB to get json
function getJSON_ACB(resp) {
    console.log("ran json thing")
    if (!resp.ok) {
        throw new Error("Could not get genius information.")
    }
    //console.log("json resp: ", resp.json())
    //console.log("not json:", resp)
    const respjson = resp.json()
    console.log("resp json" , respjson)
    return respjson
}

export {searchArtist}