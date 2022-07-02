import { createSlice } from "@reduxjs/toolkit";
//createSlice redux-toolkit icerisinden geliyor ve createSlice icerisinde biz reducer ve action larimizi tanimliyoruz

const login = { name: "", surname: "" };

export const LoginSlice = createSlice({
   //name-typename i temsil ediyor
  //Bizden name,inittalstate ve de reducer istiyor buraya geldigmizde
  name: "login", //name bizim icin reducer ismidir, actionlari cagiririken name/actionismi olarak cagiriyor
  initialState: {
    login
  }, //Bizim baslangic verimiz burdadir ama bu initialState altinda bir obje olusturarak islemimizi halletmeliyiz....normalde tutupda buraya dogurdan bir obje yazmak degil bir properyt yazip onun karsina obje yazalim ki co9mponent tarafindan direk obje gonderildigi zaman onu yakalayabilelim....Cunku otomaik gelen state burda dogrudan initialState e karsilik geliyor
  reducers: {
    loginAction: (state, action) => {
      //state,action otomatik olarak geliyor,action payload ve type dan olusuyor normalde...state.value dedigimiz zaman tabi ki initalState e karsilik gelen deger olmus oluyor
      state.login= action.payload;
    },
    logoutAction: (state, action) => {
      state.initialState = action.payload;
    },
  },
});

//export olarak disariya bir reducer i yani LogonSlice i bir de reducers icindeki action fonksiyonlarini export etmemiz gerekiyor ki, componentler icinde dispatch icerisinde calistirilarak dinamik islemlerimizi gerceklestirebilelim

export const loginReducer = LoginSlice.reducer;
export const { loginAction, logoutAction } = LoginSlice.actions;


//COOOK ONEMLI!!!!
//Her bir sliceimiz icerisinde acions larimiz var bir tane de reducer imiz vardir, dolayisi ile biz de disariya 1 tane reducer imiz cikiyor, ayrica da actionfunctions larimiz cikiyor action fonksiyonlarimiz componentler icerisinde kullanilacak, burdaki reducer imiz ise store da tum reducer lari birlestirmek icin kullanacagiz...
