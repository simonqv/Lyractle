// firebaseModel.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "/src/teacherFirebase.js";
import firebaseConfig from "./firebaseConfig";
import { getTrack } from "../geniusSource";
import { GameStates } from "./userModel";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const PATH = "users/";

function modelToPersistence(model) {
  console.log("model to pers curr track: ", model.currentTrack)
  return {
    currTrack: model.currentTrack.id ? model.currentTrack.id : 0,
    userGuesses: model.guesses,
    userGameState: model.gameState,
    userScores: model.scores,
  };
}

function persistenceToModel(data, model) {
  console.log("in persistence to model")
  //model.setUser(data?.userID || null)
  
  data?.userScores ? model.setScores(data?.userScores) : model.clearScores()
  
  if (data?.currTrack) {
    console.log("data curr track: ", data?.currTrack)
    getTrack(data?.currTrack).then(saveToModelACB)
  }
  else {
    model.setCurrentTrack(null)
  }

  function saveToModelACB(track) {
    model.setCurrentTrack(track)
  }

  model.setGuesses(data?.userGuesses || [])

  model.setGameState(data?.userGameState || GameStates.PLAYING)
    
  return null;
}

function saveToFirebase(model) {
  if (!model.user) {
    model.wipeModel();
  }
  if (model.ready) {
    const uid = model.user ? model.user : null;
    if (uid) {
      const rf = ref(db, PATH + uid);
      set(rf, modelToPersistence(model)).catch((error) => {
        console.error("Error saving data to Firebase:", error);
      });
    }
  }
}

function readFromFirebase(model) {
  console.log("in read form fb")
  if (!model.user) {
    console.log("wipe model")
    model.wipeModel();
    model.ready = true;
    return;
  }
  console.log(model)
  model.ready = false;
  console.log("model.user: ", model.user)
  const uid = model.user;
  const rf = ref(db, PATH + uid);
  get(rf)
    .then((snapshot) => persistenceToModel(snapshot.val(), model))
    .then(() => {
      model.ready = true;
    })
    .catch((error) => {
      console.error("Error reading data from Firebase:", error);
    });
}

function connectToFirebase(model, watchFunction) {
  console.log("connect to fb");
  onAuthStateChanged(auth, loginOrOutACB);
  watchFunction(checkChangeACB, updateFirebaseACB);

  function checkChangeACB() {
    return [
      model.currentScore,
      model.currentTrack,
      model.currentLyrics,
      model.scores,
      model.guesses,
      model.gameState,
    ];
  }

  function updateFirebaseACB() {
    saveToFirebase(model);
  }

  function loginOrOutACB(user) {
    if (user) {
      model.user = user.uid;
      readFromFirebase(model);
    } else {
      model.user = null;
      model.ready = true;
    }
  }
}

export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, auth };
export default connectToFirebase;
