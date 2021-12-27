import React, { createContext,useState } from "react";
import "./styles.css";
import { Routes,Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { data } from "./data";
export const BooksContext=createContext();
export default function App() {
  const [state,setState]=useState({
    bookList:data,
    cart:[]//cart baslangicta bos bir dizi olarak baslayacak
  })

const removeFromCart=id=>{
  setState({
    ...state,
    cart:state.cart.filter(cartItem=>cartItem.id!==id)
  })
}

  const decreaseByOne=(id)=>{
    setState({
      ...state,
       cart:state.cart.map(cartItem=>cartItem.id===id ?
      {...cartItem,count:cartItem.count>1 ? cartItem.count-1 : 1}:cartItem)//count 1 den buyukse count u 1 azalt ama 1 ise o zaman da yine 1 ver demis oluyoruz...
    })
  }

  //Her bir kitap in yaninda + ve - butonalarina basinca 1 kitap sepetindeki siparsi 1 arttiracak veya 1 azalatacak ancak bu islemi sepette o urunden 1 den fazla urun varsa yapacak, eger 1 urun varsa zaten onu removeBook ile yapacak....
  const increaseByOne=(id)=>{
    setState({
      ...state,
      cart:state.cart.map(cartItem=>cartItem.id===id ? {...cartItem, count:  cartItem.count+1}:cartItem)
    })
  }

  const addToCart=book=>{
    setState({
      ...state,
      cart:state.cart.find(cartItem=>cartItem.id===book.id) 
      ? state.cart.map(cartItem=>cartItem.id===book.id ? {...cartItem,count:cartItem.count+1} 
        : cartItem) 
        : [...state.cart,{...book,count:1}]
    })
  }
  // : [...state.cart,{...book,count:1}]//eger eklenmeye calisilan urun yok ise kitabi ekle, ve ona birde count degeri ver demis oluyoruz...Hem kitap,book objesini ekliyoruz hem de book objesi icine count isminde bir property ekliyoruz....
  //Eger bizim tikladigmiz eleman cart icinde donen urunlerden herhangi birinde var ise o zaman sen book objesinin icinde count propertysini  1 arttir.
//Eklemek istedigimz kitap eger sepette var ise o kitabin sadece kac tane oldugunu duzenleyecek yoksa o zaman sepete ekleyecek.Bunu yapabilmek icin ilk yapacagimiz is sepete eklemek istedigmizi kitabin id sininn sepetteki kitaplar icersinde var olup olmadigni kontrol etmektir ve bunu da biz find methodu ile  yapariz...Eger aradgimiz kitap var ise o zaman o kitabin count degerini 1 arttir, eger kitap yok ise o zaman da kitaba count:1 olarak count degeri atamasi  yap
  return (
<BooksContext.Provider value={{state,addToCart,decreaseByOne,increaseByOne,removeFromCart}}>
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
    </BooksContext.Provider>
  );
}
