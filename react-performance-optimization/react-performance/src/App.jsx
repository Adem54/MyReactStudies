import { useCallback, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [number, setNumber] = useState(0);
  const [text,setText]=useState("");

  /*
  useCallback
  biz butonu Header compnenti icine tasidik ve artik butona header componenti icerisinde tikliyoruz ve butona her tiklandiginda
  number state i degisiyor, dolayisi ile App.js render ediliyor ama her seferinden Header comonentini de render ediyor oysa Header componentine
  giden fonksiyon asliinda degismiyor gibi gozukuyor ama iste, fonksiyon referans type oldugu icin fonksiyonu da yeniden olusturudugu icin 
  her App.js degistginde Heaer a props olarak gonderilen fonksiyonun referansi da degisiyor bu degisiklik Header in da render edilmesine sebep oluyor
  Peki bunu nasil onleriz?
  Header a props olarak gonderdigmiz increment fonksiyonunun aslinda her defasinda degismedigni ayni oldugunu reacte soylememiz gerekiyor
  useCallback tam da burda devreye giriyor
  useCallback ile fonksiyon donuyoruz ve yaptmgz fonksiyonu aslinda memoize etmis oluyoruz, useMemo daki mantik ile ayni sekilde dependency array ler
  uzerinden de fonksiyonun degisme durumunu kontrol edebiliyoruz..
  */

  const increment=useCallback(()=>{
  setNumber(prevNum=>prevNum+1)
  },[]);
  //number degiskenini dependency array e koymaz isek eger o zaman buttona tiklandiginda increment fonksinu 1 kereligine calisir 
  //number degerini 0 dan 1 yapar ve birdaha calismaz, cunku dependency array bos kaldignda 1 kerelik calisir ondan dolayi da
  //fonksiyon bizim number degerimizin degismesine bagli olarak calismasini istiyorsak dependency arraya numberi veririz
  //Ama boyle olunca biz Header in her fonksiyon invoke edildginde render edilmesin onleyememis oluyoruz
  //Sebebi de biz aslinda number her degistiginde bu fonksyonu bastan tanimla dedgmiz icin, number her degistiginde fonksiyon yenidden 
  //tanimlanarkk yeni bir referans ile geliyor ve sanki number her degistignde farkli bir props gonderiyormus gibi oluyor 
  //O zaman biz dependency array deki number dan kurtulursak o zamn ne yapariz her seferinde Header in render edilmsini onlemis oluruz
  //Onun icinde setNumber islemini biz prevstate=>prevstate+1 ile gerceklestiririz

  return (
    <div className="App">
      <Header  increment={increment} />
      <h2>{number}</h2>
      <br />
    
      <br/>
      <br/>
      <input value={text} onChange={({target})=>setText(target.value)}/>
    </div>
  );
}

export default App;
