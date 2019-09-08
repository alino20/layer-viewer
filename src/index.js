import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/app";
import thunk from 'redux-thunk';
import allReducers from "./reducers";
import "./scss/app.scss";

const store = createStore(allReducers, applyMiddleware(thunk));
let root = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
