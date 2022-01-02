import {configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "../features/todoSlice";
const store=configureStore({//Buraya, bir obje icerisine olusturdugumuz butun slice lardan gelen reducer lari koyacagiz
    reducer:{
        todos:todoSlice//Bu bize features klasoru icinde olusturdugumuz todoSlice dan geliyor
    }
})
//slice lar 2 turlu export yapiyorlar,1 reducer export yapiyorlar birde action export yapiyorlar
export default store;
//Projemizi typescript ile yaptigimiz icin 4 tane type export yapmamiz gerekecek.2 tanesi state ve dispatchimizi type lari
//Diger 2 tanesi de useDispatch ve useSelector hooklarinin type girilmis hallerini kendimiz olusturup uygulamamizda kullaniyoruz 
//bu sayede her bu methodu,hooku kullandigimizda type girmek zorunda kalmiyoruz
//RootState bizim global state timizin type ini tanimlayacak
//store.getState state i getiren fonks
//ReturnType type ini kullanarak store.getState in return typeini RootState olarak atiyoruz
//Bu su ise yariyor, bizim reducer icine girdigimiz slice larin type lari otomaik olarak slice lardan aliniyor
// ve size tek bir RootState type i olarak donduruluyor
export type RootState=ReturnType<typeof store.getState>;
//Bu da store da bizim dispatch in type ina esit
export type AppDispatch=typeof store.dispatch;
//2 tane de method,hooklarin type li hali
export const useAppDispatch=()=>useDispatch<AppDispatch>();//useDispatch react-reudux tan geliyor
//useAppDispatch i her kullandigimzda artik type ini girmemize gerek kalmayacak
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;
//useAppSelector ile artik useSelector i her kullandigimizda type i girmemize gerek kalmayacak