import { useEffect, useState } from 'react';
import './App.css';
import Palette from './components/Palette';
import  {init, subscribe} from "./socketApi";
function App() {
  const [activeColor,setActiveColor]=useState("#282c34");//buraya varsayilan renk olarak back-end te kontrol ederiz ne verdi isek onu verecegiz bu state leri biz back-enddeki rengi anlik guncellemek icin kullanacagiz
  useEffect(()=>{
init();//Bu sekilde sunucuya baglaniyoruz.console dan cek edebiiriz
subscribe((color)=>{//Dikkat edelim, biz subscribe fonksiyonuna paremetre olarak fonksiyon gectik....
  setActiveColor(color)
});//Artik her yeni renk secipt clikledigimde bunu consoldan tum kullanicilara gondermis olacak ayni anda...Kullanici ne demek kullanici dmeek bizim fron-end ile ayaga kaldirdigmiz localhost  uzerinden baglanip da ara yuzu gosteren tum url ler icin gecerlidir bizde ayni anda birden fazla yerde baglanti kurup  hepsinde de deneyebiliriz
//subscribe her data dustugunde yani her click ile color degistiginde back-ende gittinde bizim bunu bilmemiz gerekiyor ki
//subscribe icerisinde bu degisikligi anlik gorebilem icin de setActiveColor i subscribe parametresinde bir callback vererek kullaniriz
  },[])
  //Her renk atamasi yapildiginda,subscribe methoduna her renk dustugunde rengi degistirmem lazim ondan dolayi da bir state e ihtiyacimiz var
  return (
    <div className="App" style={{backgroundColor:activeColor}}>
      <h1>{activeColor}</h1>
      <Palette activeColor={activeColor}/>
    </div>
  );
}

export default App;
//Mantigimiz her zaman ayni back-end de baglanma isini useEffect in componentDidMountu taklit ederek component mount olur olmaz ilk backende baglanmasini saglayacagiz.Ne ile yapacagiz init fonksiyonunu calistirarak yapacagiz