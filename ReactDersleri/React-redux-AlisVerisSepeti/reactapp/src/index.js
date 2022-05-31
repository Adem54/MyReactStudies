import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {createStore} from "redux";
import {reducer} from "./reducers/index";
import {Provider} from "react-redux";
const store=createStore(reducer);
//react-redux kutuphanesi react ile redux arasindaki baglanti yi kurmak icin kullanilir ondan dolayi Provider react i sararak reduxi reactin tanimasini sagliyor
console.log("store", store.getState());//veriye burdan da gorebiliriz...ayrica store icinde dispatch ler de var
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </Provider>,
  rootElement
);
