import React, { useState } from 'react';
import {send} from "../socketApi";

const Palette = ({activeColor}) => {
    const [color,setColor]=useState("#000")
    console.log("color: ",color);
  return <div className='palette'>
     <input type="color"  value={activeColor} onChange={(e)=>setColor(e.target.value)} />
     <button  onClick={()=>{
    
     send(color)
     }}>Click</button>
     <div>{color}</div>
  </div>;
};

export default Palette;
//   <input type="color" /> bu bize hazir color paleti gtiriyor ve ordan color secebiliyoruz
//Kullanici renk sectigi anda ve butona bastigi anda eger bagli olan baska bir client varsa ve hangir renk secildi ise anlik olarak kullanicinin rengi degisecek
//back-end imiz de hazir su an
//Simdi de backe-end e baglanip client tarafindan gerekli islemleri  yapacagiz
//Socket-io ile hazirlanmis back-end e baglanirken socket.io-client isminde bir moduk kuracagiz client kismimiza-Bu modulu kullanarak biz client tan socket-io backend ine baglanacagiz 
//Paketi kurduktan sonra src altina socketApi.js isminde bir dosya olusturuyoruz

//socketApi.js icinde olusturdugmuz send fonksiyonun biz burda kullanacagiz ki color  degerimizi backende gonerebilelimn ondan dolayi biz once rengimiz nedir onu almak icin useState kullanacagiz

//yaptigimiz back-end islemlerinde back-endimizdeki degisikligi terminal uzerinden takp ederiz
///send fonksiyonununu calistirarak Palette.js icinden back-end e seilen rengimizi gondermis oolyoruz bundan sonra ne yapacagiz,backe-end 
//BAck-ende gelen bu datayi bagli olan tum clientlerijiza iletmemiz gerekir ki onlarda degisimi alabilsinler
//Ondan dolayi  da bu isle ilgili backend icindeki dosyada hangi kanal var ise ki "receive "  isminde bir kanal var ve o kanala abone olacagiz ve herhangi bir data geldgiinde onu yakalayip kulllacaguz
//Bu is icin de yine ne yapacagiz socketApi.js dosyasmda receive kanalina abone olacagiz