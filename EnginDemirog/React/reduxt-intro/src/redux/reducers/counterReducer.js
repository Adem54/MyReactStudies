import * as actionTypes from "../actions/actionTypes";
//Butun reducer lar cagirdigimiz action lari icerip icermedgini kontrol edecek
//state ise reducer in yaptigi tek sey action a gore state belirlemek, stateimizi kontrol ettigimiz yer.Componentler reduer icindeki state den faydalanacak
//Reducer icerisinde bir veritabani veya bir apiye baglanti yapilmaz...Bu onemli
//Reducer icerisinde biz basit state  yonetimini yapacagiz
//Reducer da sunu yapariz, elimizde bir state var ve icindee array var, ilk once array in bir kopyasini aliriz, yeni bir referans olustururuz ve    islemimizi onun uzerinde yapip dondururuz yani referansin degismesi onemli burda....
//Javascript Immutability..

const counterReducer=(state=0,action)=>{
    let newState;
switch (action.type) {
    case actionTypes.INCREASE_COUNTER:
        return (newState = state + action.payload);
case actionTypes.DECREASE_COUNTER:
        return (newState = state - action.payload);
case actionTypes.INCREASEBYTWO_COUNTER:
        return (newState = state + action.payload);
     
    default:
        return state;//Eger hicbir action olmamissa state in kendini donduruyoruz,yani state in default degerini dondurecegiz..
}
}

export default counterReducer;