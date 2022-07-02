import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counterSlice";

//reducer larimizi toplayip birlestirecegimiz yer burasi olacaktir cunku store u olusturuyorz
//Burda reducer lari birlestirmek icin combinereducer da kullanilabilir
export const store=configureStore({
    reducer:{
        counterReducer
        //userReducer
    }
})
//reducer objesi bizim ana storu muzu verir icindeki slice lardan gelen state lerin oldugu
//reducer icinde, slicer lardan recuer lar gelir iste onlar da kendi state lerini verir
//const {value}=useSelector(state=>state.counterReducer); Bu bize counterReducer slice inin ana state 
//icindeki value degerini veriyor
//const state=useSelector(state=>state) Burda state {counterReducer:{value:0}} seklinde verecektir..
//Ornegin counterReducer yaninda birde userSlice dan gelen userReducer olsa idi o zaman data bize
//su sekilde gelirdi
//const state=useSelector(state=>state) {counterReducer:{value:0},userReducer:{}} 