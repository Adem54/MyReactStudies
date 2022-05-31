import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//--redux configurasyonu
import configureStore from "./redux/reducers/configureStore";
import { Provider } from "react-redux";
const store = configureStore(); //Artik magazamizin bir store u var yani uygulamamizin
//Provider imiz ile App componentimizi sararak stor umuzu react componentlerimize gonderme islemini gerceklestiriyoruz ve React in redux tan gelen islemlerini tanimasini sagliyoruz ve redux ta olusturdugmuz store umuzu burda react a tanitiyoruz
//Bu konfigurasyon bir kez yazilir ve bir daha buraya dokunmayiz...
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

