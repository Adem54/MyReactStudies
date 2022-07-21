import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {fetchPosts} from "./features/posts/postsSlice";
import { fetchUsers } from "./features/users/usersSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Bu islemi biz, componentler icinde useEffect icinde yapmanin alternatifi olarak yapiyoruz...
store.dispatch(fetchPosts());
//Biz tum postlari burda aldigimza gore o zaman artik, PostLists icerisindde useEffect icinde
//postlari alma islemine de ihtiyacim kalmamis oldu....
//Cunku, alt componentler de biz sayfa degistirdigmizde, bir componentte useEffect ile o component yuklenince gelen data diger componente LInk ile gecince sorun olmuyor ama, sayfa yenilenme durumudna datalar uctugu icin patliyor iste bizde bu sorunu kokten cozmek icin, en ust componentte o datalri store.disptach uzerinden aldikki simdi hangi component isterrsek onu calistiririz ve datalarimiz ucmamis olur....
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
