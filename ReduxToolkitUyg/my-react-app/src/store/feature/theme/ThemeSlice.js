import { createSlice } from "@reduxjs/toolkit";


const theme="";
export const ThemeSlice=createSlice({
    name:"theme",
    initialState:{
        theme,
    },
    reducers:{//Parametresine state ve action(type,payload) otomatik gelecek olan action fonksiyonlari yazilacak buraya... 
        setTheme:(state,action)=>{
            state.theme=action.payload;
        }

    }
})
//Disariya ThemeSlice in reducer ini aktaracagiz store daki reducer lar icine gonderelim diye combineReducers icindeki
//Birde burda reducers icindeki actionslar export edilecek

export const themeReducer=ThemeSlice.reducer;

export const {setTheme}=ThemeSlice.actions;