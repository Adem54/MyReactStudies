//buraya index.js diye de tanimlayabiliriz.Burda reducer larimizi tanmlayacagiz...
//Tanimlamis oldugumuz slice lari yani slice larimiz icinde reducerlarimiz ve actionlarimiz mevcuttur slicelar dan reducer lari alip burda birlestirecegiz ana verimz burasi olacak

//slice dan gelen reducer i burda aliriz...
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./feature/login/LoginSlice";
import { themeReducer } from "./feature/theme/ThemeSlice";

//redux toolkit ten de combinereducer ve confugureStore  gelecek
//combineReducer lar ile birden fazla slice imiz var ise her slice imzdan gelecek reducer larimizi birlestiririz ardindan da configureStore ile

const rootReducer=combineReducers({
    loginReducer,//loginReducer ile alirsak buraya direk bu demektir ki biz veriyi componentlerden state altinda loginReducer olarak alacagiz...
    themeReducer
})

export const store=configureStore({
    reducer:rootReducer
})

//Store da biz dikkat edelim store yani tum reducer lari birlestirdigmiz ana store verimizi projenin ana dosyasi olan index.js de react-redux baglantisini saglayip store u componentlere erstirmek icin orda provider ile ana componenti sarmalayip icine store u gonderelim....