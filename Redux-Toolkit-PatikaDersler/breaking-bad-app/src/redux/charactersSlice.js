import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import  {api}  from "../components/common/api";
  //import axios from "axios";

//createAsyncThunk in ilk parametresinde ki type i yazarken ilk olarak initialState icindeki
//name ismi yazilmalidir 2. olarak ise biz bu action function ina istedigmiz type ismini
//verebiliriz, action func inin ismini vermek zorunda degiliz...

const char_limit=12;

export const getCharactersAsync=createAsyncThunk("characters/fetchCharacters", async (page)=>
{  
      const response=await api().get(`/characters?limit=${char_limit}&offset=${page*char_limit}`);
     
     //  const response=await axios.get(process.env.REACT_APP_API_BASE_URL+"/characters?limit=10&offset=0");
        return response.data;
})



export const charactersSlice=createSlice({
    name:"characters",
    initialState:{
        items:[],
        // loading:false,
        status:"idle",
        error:"",
        page:0,//Her butona basildiginda page 1 artarak devam edecek 
        //offsett de her seferinde 12 artmasini beklyoruz,offset kac olursa
        //dizi icindeki elemanlardan o sayidan baslayarak getiriyor
        //limit te 12 idi ve o sabit duruyor
        //Offset ti dinamik yapmak icin offset karsisinia biz page*limit dersek
        //o zaman biz sadece sayfayi her tiklamada 1 arttirarak, offsetti de istedgimz
        //gibi arttirabiliriz,page 1 ise offset 12, page 2 ise offset 24 diye gidecek ve
        //biizim istedigmiz olmus olacak....
        lastPage:null,
        //Bunu hasNextPage stati tutarak da yapabiliriz....bunu da deneyelim..bu cozum de cok guzel
        hasNextPage:true
    },
    reducers:{

    },
    extraReducers:{
        [getCharactersAsync.pending]:(state,action)=>{
            // state.loading=true;
            state.status="loading";
            state.error="";
        }, [getCharactersAsync.fulfilled]:(state,action)=>{
          //  state.items=action.payload;=>Bu yanlis her tikladigimda onceki kayitlarim kayboluyor...
            // state.items=state.items.concat(action.payload);
           //HASNEXTCHANGE COZUMU DAHA COK HOSUMA GITTI AMA LASTPAGE 
            if(action.payload.length<12 && action.payload.length>0 ) {
                state.page+=1;
                state.lastPage=state.page;
                state.hasNextPage=false;
            }else if(action.payload.length>0){
                state.page+=1;
            }    
            state.items= [...state.items,...action.payload]
            // state.loading=false;
            state.status="succeeded";

           
        }, [getCharactersAsync.rejected]:(state,action)=>{
            state.error=action.error.message;
            // state.loading=false;
            state.status="failed";

        },
    
    }
})

export const characters=charactersSlice.reducer;
export const selectItems=state=>state.characters.items;
export const selectStatus=state=>state.characters.status;
 export const selectError=state=>state.characters.error;
export const selectPage=state=>state.characters.page;
export const selectLastPage=state=>state.characters.lastPage;
export const selectHasNextPage=state=>state.characters.hasNextPage;
//Dikkat edelim, ana en ust state ardindan reducer icinde veridgmiz 
//state imi ile beraber, bizim characterSlice icindeki ana state i 
//elde ediyoruz....Ok...