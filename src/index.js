import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/app";
import allReducers from "./reducers";
import "./scss/app.scss";

const store = createStore(allReducers);
let root = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
