import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { MenuType } from "../model/menu.model";

export const menuApi=createApi({
    reducerPath:"menuApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3500/"}),
    tagTypes:["Menu"],
    endpoints:(builder)=>({
        getAllFoods:builder.query<MenuType[],void>({
            query:()=>"/menu",
            providesTags:["Menu"]
        }),
       
    })
})


export const {useGetAllFoodsQuery}=menuApi;
/*
Mevcut ana data uzerindedn eger bir filtreleme  gerceklesecek ise o zaman, bu filtrelemeye ait bir endpoint var mi
gidip ona bakilir, eger var ise endpoint islemi oldugu icin, bu rtk-query bizim api ile ilgili query ve mutation islemlerinde
hazirlariz ve gelip componentte kullaniriz
Ancak eger filtreleme yi front-end kendisi ana state uzerinden yapacak ise
1-O zaman eger sadece rtk-query kullaniyor ise, ana datayi bir useState ile bir state e aktarir, listelenen datayi o state uzerinden
listeler, sonra da o lokal componentte aktardigi ana dataya,  yine o component icine bir filtreleme fonksiyonu yazar ve 
tiklanma ile birlikte componente aktardigi, ana datada degisiklikler olur ve bunu componentte kullaniciya yansitir..
Ya da yine kendimze ait bir, redux-toolkit createSlice da biz state tutuyorsak o rda arkada senkron islemler icin yani 
lokalde, kendimzin yaptigi islemler icin, api ye istek gondermeden yaptimgiz islemler i reducer altina yapiyorduk yine orda
bir method olusturulur ve ordan ana state data si filtrelenir


*/