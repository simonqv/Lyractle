import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const provider = new GoogleAuthProvider()

const PATH = "temp" // TODO: change this thing
const rf = ref(db, PATH)

function modelToPersistence(model){
    // TODO In firebase, I think we only want to store userID and their highscores... ? so maybe we don't need so many variables?
    return {
        // currScore: model.currentScore,
        // currTrack: model.currentTrack,
        // currLyrics: model.currentLyrics,
        // userGuesses: model.guesses,
        // userGameState: model.gameState, // Playing, won, given up
        userID: model.user,
        userScores: model.scores,
    }
}

function persistenceToModel(data, model){
    const new_user = null;  // TODO something else should be here I think? Like when we authenticate as a new user... aka the ID is not present in the firebase database
    model.setUser(data?.userID || new_user);    
    model.setScores(data?.userScores ||[])

    return model // ???
}

function saveToFirebase(model){
    if (model.ready) {
        set(rf, modelToPersistence(model))
    }
}

function readFromFirebase(model){
    model.ready = false;
    return get(rf)
                .then(function convertACB(snapshot) {
                    return persistenceToModel(snapshot.val(), model)
                })
                .then(function setModelReadyACB() {
                    model.ready = true;
                })
}

function connectToFirebase(model, watchFunction){
    readFromFirebase(model)
    watchFunction(checkChangeACB, updateFirebaseACB)

    function checkChangeACB() {
        return [model.currentScore, model.currentTrack, model.currentLyrics, 
            model.scores, model.guesses, model.gameState]
    }

    function updateFirebaseACB() {
        saveToFirebase(model)
    }
}

onAuthStateChanged(auth, loginOrOutACB)

function loginOrOutACB(user) {
    return
}


export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;