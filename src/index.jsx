import {createRoot} from "react-dom/client"
import {observable, configure} from "mobx"
import model from "/src/userModel.js"
import ReactRoot from "./ReactRoot.jsx"
import React from "react"

import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render


configure({enforceActions: "never"})
const reactiveModel = observable(model)

createRoot(document.getElementById('root'))
    .render(<ReactRoot model = {reactiveModel}/>); 

// For debugging, make the model available in the console
window.myModel = reactiveModel

