import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import reducers from "./redux/reducers";
import sagas from "./redux/sagas";
import { Router } from "react-router";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// middlewared
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = createStore(
  reducers(history),
  peristedState,
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export { store, history };
