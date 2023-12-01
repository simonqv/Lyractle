// firebaseModel.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set } from "/src/teacherFirebase.js";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const PATH = "users/";

function modelToPersistence(model) {
  return {
    currTrack: model.currentTrack,
    userGuesses: model.guesses,
    userGameState: model.gameState,
    userID: model.user ? model.user.uid : null,
    userScores: model.scores,
  };
}

function persistenceToModel(data, model) {
  const new_user = null;
  //model.setUser(data?.userID || new_user);
  //model.setScores(data?.userScores || []);

  return model;
}

function saveToFirebase(model) {
  if (!model.user) {
    model.wipeModel();
  }
  if (model.ready) {
    const uid = model.user ? model.user.uid : null;
    if (uid) {
      const rf = ref(db, PATH + uid);
      set(rf, modelToPersistence(model)).catch((error) => {
        console.error("Error saving data to Firebase:", error);
      });
    }
  }
}

function readFromFirebase(model) {
  if (!model.user) {
    model.wipeModel();
    model.ready = true;
    return;
  }
  model.ready = false;
  const uid = model.user.uid;
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
    console.log("in loginorout");
    if (user) {
      model.user = user;
      readFromFirebase(model);
    } else {
      model.user = null;
    }
  }
}

export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, auth };
export default connectToFirebase;
