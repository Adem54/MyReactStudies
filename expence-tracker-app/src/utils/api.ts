//Best-practise kullanim
//Tum api isteklerini ayni adrese gonderecegim icin
//tek tek her seferinde yazmak yerine burda 1 tane base-url
//olusturup burdan alacagim api nin base-url ini

import axios from "axios";
// const token=localStorage.getItem("token") || "";
//Bunu disarda tutarsak eger ve 
export default ()=>{
     //token degeri, localStorage da eger, bulunmaz ise o zaman da
 //default olarak bos bir string getirmeli diyoruz....
const token=localStorage.getItem("token") || "";
  return   axios.create({
        baseURL:"https://expensetracker-be.herokuapp.com",
        headers:{
            Authorization:token,
        }
    })
} 
/* 
token i bizim burda staic olarak olusturudgumz bir degerden aliyor
const token=localStorage.getItem("token") || "";
Uygulama ilk yuklendiginde kullanici henuz giris li olmadigi icin bu deger 
hesaplaniyor ve " " olarak hesaplaniyor veya onu koymazsak null olarak hesaplaniyor
Bu token ilk giriste tum uygulama geneline null olarak gidiyor....
*/