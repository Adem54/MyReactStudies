import React from "react";
import "./styles.css";
import { Route,Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import {connect} from "react-redux";
import { data } from "./data";

 function App(props) {
   console.log("bookList: ",props);
  return (
    <div className="App">
      <h1>
        Alışveriş Sepeti Yapımı
        <img
          src="https://avatars3.githubusercontent.com/u/60869810?v=4"
          alt="React Dersleri"
        />{" "}
        React Dersleri
      </h1>
      <Routes>
      <Route exact path="/" element={<Products/>} />
      <Route path="/cart" element={<Cart/>} />
      </Routes>
    </div>
  );
}
//state burda store umuz demektir redux ta tutulan ana veriy i verir, bizim initialState diye olusturdugmuz ilk obje yi verir ve  icinde bizim verilerimiz var
//State yi Propsa bagla demek yani icinde bulundgumuz componente redux veriyi props olarak verecek
//booklist verisine artik props.booklist seklinde erisebilecegiz componentimiz icinde
const mapStateToProps=(state)=>{
  console.log("STATE: ",state);
  return {
    booklist:state.bookList
  }
}
export default connect(mapStateToProps)(App);
//BURASI ONEMLI-connect fonksiyonu parametresine bir fonksiyon aliyor ve return olarak da yeni bir fonks donduruyor dondurdugu fonks ise bizim App imizi parametre olarak aliyor