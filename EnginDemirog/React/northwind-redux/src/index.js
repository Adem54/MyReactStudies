import React from "react";
import ReactDOM from "react-dom";
import App from "./components/root/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux"; //Burda react a redux i bagliyoruz
import configureStore from "./redux/reducers/configureStore";
import { BrowserRouter } from "react-router-dom";
//provider icine App mizi sarmalayarak ve store unuda ne oldugunu vererek redux in react componentlerimizi tanimasini sagliyoruz
const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root") //burda biz root id li elemnti ezerek yerine App componentini getiririz
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//Burayi da hallettikten sonra artik componentlerimiz reduxt store a dogrudan connection yapabilecekler, connect fonksiyonunu kullanarak biz, componentlerimize redux le baglanti kurduruyoruz ve dispatch i aliyoruz biz orda parametre de props olarak ve dispatch bizim componentlermzde action fonksiyonlarimizin calisip reducer a gitmesin sagliyordu, parametresine action daki hangi fonksiyonu calistiracaksak onu alirdi ve onu callistirarak redux in sistemini harekete geciriyordu ve action larin reducer a gitmesini baslatiyordu
