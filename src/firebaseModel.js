import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const PATH = "users/"

function modelToPersistence(model){
    // TODO In firebase, I think we only want to store userID and their highscores... ? so maybe we don't need so many variables?
    return {
        // currScore: model.currentScore,
        // currLyrics: model.currentLyrics,
        currTrack: model.currentTrack,
        userGuesses: model.guesses,
        userGameState: model.gameState, // Playing, won, given up
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
    if (!model.user) {
        model.wipeModel()
    }
    if (model.ready) {
        const rf = ref(db, PATH + model.user.uid)
        set(rf, modelToPersistence(model))
    }
}

function readFromFirebase(model){
    if (!model.user) {
        model.wipeModel()
        model.ready = true
        return
    }
    model.ready = false;
    const rf = ref(db, PATH + model.user.uid)
    return get(rf)
                .then(function convertACB(snapshot) {
                    return persistenceToModel(snapshot.val(), model)
                })
                .then(function setModelReadyACB() {
                    model.ready = true;
                })
}

function connectToFirebase(model, watchFunction){
    console.log("connect to fb")
    onAuthStateChanged(auth, loginOrOutACB)
    watchFunction(checkChangeACB, updateFirebaseACB)

    function checkChangeACB() {
        return [model.currentScore, model.currentTrack, model.currentLyrics, 
            model.scores, model.guesses, model.gameState]
    }

    function updateFirebaseACB() {
        saveToFirebase(model)
    }

    function loginOrOutACB(user) {
        console.log("in loginorout")
        if (user) {
            model.user = user
            readFromFirebase(model)
        }
        else {
            model.user = null
        }
    }
}



export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, auth}

export default connectToFirebase;