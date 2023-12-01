// ReactRoot.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainMenu from "../src/presenters/mainMenuPresenter.jsx";
import Login from "./presenters/loginPresenter.jsx";
import { PrivateRoute } from './PrivateRoute';
import { observer } from "mobx-react-lite";

function makeRouter(model) {
  return (
    <Routes>
      <Route
        path="/mainMenu/*"
        //element={<MainMenu model={model}/>}
        element={<PrivateRoute element={<MainMenu model={model} />} authenticated={model.user !== null} />}
      />
      <Route path="/login" element={<Login model={model} />} />
    </Routes>
  );
}

export default observer(function ReactRoot(props) {
  console.log('PROPS MODEL', props.model);

  if (props.model.user === undefined) {
    // Firebase auth layers not yet initialized
    return (
      // Loading gif
      <img
        src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif"
        alt="Loading..."
      />
    );
  }

  return (
    <BrowserRouter>
      {props.model.user === null ? (
        makeRouter(props.model)
      ) : (
        props.model.ready ? (
          <Routes>
            <Route path="/mainMenu/*" element={<PrivateRoute element={<MainMenu model={props.model} />} authenticated={props.model.user !== null} />} />
            <Route path="/login" element={<Login model={props.model} />} />
          </Routes>
        ) : (
          <img src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif" />
        )
      )}
    </BrowserRouter>
  );
});
