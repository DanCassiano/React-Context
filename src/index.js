import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Provider from "./Context";

import Body from "./Body";

import theme, { getTheme, setTheme } from "./modules/theme";
import chuckNorris, { fetchJoke } from "./modules/chuckNorris";

const init = {
  theme,
  chuckNorris
};
const actions = {
  getTheme,
  setTheme,
  fetchJoke
};

function App() {
  return (
    <div className="App">
      <Provider value={init} actions={actions}>
        <Body />
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
