import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice"
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
    reducer: {
       [apiSlice.reducerPath]:apiSlice.reducer,
       //dinamik isim vermis oluyoruz, reducerPath ismine biz apiSlice icinde api verirsek api olur baska bir isim verirsek baska bir isim olur..yani dinamik bir sekilde ayarlanmis oldu
        users: usersReducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
})
//Rtkquery yi store de kullandgmiz icin bir middleware ile kullanmamiz gerekiyor...