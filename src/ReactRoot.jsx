import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainMenu from "./presenters/mainMenuPresenter.jsx";
import Login from "./presenters/loginPresenter.jsx";
import Hamburger from "./presenters/hamburgerPresenter.jsx";
import HighScores from "./presenters/highScoresPresenter.jsx";
import Game from "./presenters/gamePresenter.jsx";
import { PrivateRoute } from './PrivateRoute';
import { observer } from "mobx-react-lite";
import LoadingView from "./views/loadingView.jsx";

function makeRouter(model) {
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute element={<MainMenu model={model} />} authenticated={model.user !== null} guest={model.guest} />}
      />
      <Route
        path="/mainMenu/*"
        element={<PrivateRoute element={<MainMenu model={model} />} authenticated={model.user !== null} guest={model.guest}/>}
      />
      <Route
        path="/highScores"
        element={<PrivateRoute element={<HighScores model={model} />} authenticated={model.user !== null} guest={model.guest}/>}
      />
      <Route
        path="/game"
        element={<PrivateRoute element={<Game model={model} />} authenticated={model.user !== null} guest={model.guest}/>}
      />
      <Route path="/login" element={<Login model={model} />} />
    </Routes>
  );
}

export default observer(function ReactRoot(props) {

  if (props.model.user === undefined) {
    // Firebase auth layers not yet initialized
    return (
      // Loading gif
      LoadingView()
    );
  }

  const shouldRenderHamburger = window.location.pathname !== '/login';

  return (

    <BrowserRouter>
      {props.model.ready ? (
        <div>
          {shouldRenderHamburger && <Hamburger model={props.model}/>}
          {makeRouter(props.model)}
        </div>
        
      ) : (
        LoadingView()
      )}
    </BrowserRouter>
  );
});
