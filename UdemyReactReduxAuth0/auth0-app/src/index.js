import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

let state = {};
//Kendimiz react in state ini kullanmadan bu sekilde kendi stateimiz de kullanabiliyoruz
window.setState = (changes) => {
  state = Object.assign({}, state, changes);
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-2v-an29e.us.auth0.com"
          clientId="rPbnP83I0JbVSFIxzNp7txe6r7yxl3Ht"
          redirectUri={window.location.origin}
        >
          <App {...state} />
        </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
/*eslint */
let initialState = {
  name: "AOS",
  location: window.location.pathname.replace(/^\/?|\/$/g, ""), //bu degerler gelirse boslukla degistir...
};
//window.location.pathname bu, bize ana url de ise / veriyor yok ana url yaninda ek ifadeler var ise onu veriyor
//Burda yapilmaya calisilan sey path imizi kirmaya calisanlara karsi ufak bir onlem alinmis oluyor...

window.setState(initialState);
/* initialState te olusan degisiklikleri assign ile birlikte farkedip App e gonderecekler 
React in normal state inden farkli bir sekilde kullanarak bu sekilde de kullanilabiliyor
*/
