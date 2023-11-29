import { initializeApp } from "firebase/app";
import {GoogleAuthProvider} from "firebase/auth"
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const provider = new GoogleAuthProvider()

const PATH = "temp" // TODO: change this thing
const rf = ref(db, PATH)

function modelToPersistence(model){
    // TODO
}

function persistenceToModel(data, model){
    // TODO
}

function saveToFirebase(model){
    // TODO:
}

function connectToFirebase(model, watchFunction){
    // TODO:
}


export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}

export default connectToFirebase;