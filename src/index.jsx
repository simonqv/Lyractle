/*import {createRoot} from "react-dom/client";
createRoot(document.getElementById('root'))
    .render(<div>hello world!</div>); 
*/
  // index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./style.css"; // Link your CSS file

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
