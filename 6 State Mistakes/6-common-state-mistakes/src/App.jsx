import { useState } from 'react';
import './App.css'

function App() {
  const [number,setNumber]=useState(0);
const handleAsync=()=>{
  setTimeout(()=>{
   setNumber(number=>number+1);
  },2000);
}

const [product,setProduct]=useState({
  title:"",
  desc:"",
  price:0,
  category:"",
  tags:[],
  images:{
    sm:"",
    md:"",
    lg:"",
  },
  quantity:0,
})

  return (
    <div className="App">
      <h3>React</h3>
      <button onClick={()=>{
        setNumber(number+1)
      }}>Increase</button>

    <button onClick={handleAsync}>Increase Async</button>
      <br/>
      <h3>{number}</h3>
    </div>
  )
}

export default App
/*
1-useState i asenkrion islemlerde kullanirken , her zamaan setNumber(number=>number+1) modunda kullanmamiz gerekir,
setNumber(number+1) bu seklde degil cunku asenkron islem yaparken asenkron islemde yapaagimz degisiklik gerceklesene kadar, eger
number da bir degisme olur ise bu degiskligi de alabilmemiz icin setNumber(number=>number+1) bu sekilde kullanmaiz gerekir..
setNumber(number+1) burda re-creating number yani number i yeniden olsturarak datayi alma var
setNumber(currentNum=>currentNum+1) burda ise number i memory de guncelleme var.

2-Uzak api den data cekerken, o datayi biz bir state olusturup o state e gonderiyoruz, ama tabi islem asenkron oldugu icin gelmesi biraz zaman aliyor
ama biz tabi dogral olarak dogrudan gelmesini dusundgumz datayi yazdirmis oluyoruz ekrana, ama ornegin biz e gelen data bir dizi icin de objeler oluyor
ve biz o datayi hemen almadigmiz icin ilk basta, eger biz initialValue vermedi isek o zaman component mount edilir edilmez, daha api den gelmeyen 
ortada olmayan undefined olan bir datayi map lemeye calisir ve bu run-time hatasi ortaya cikarir ve ve kod kirilacaktir, error verecektir bunu cozmek icin
1-condinitional rendering yani eger data gelmis ise o zaman bunu ekrana bas diye bir conditioin yapip data gelene kadar da ekrana loading.... yazdirabiliriz
2-? optional chain ile,  users?.map diyerek data gelirse bu islemi yap, data y oksa hicbirsey yapma demis olurz
users && users.map ile users?.map ayni seydir aslinda
Aslinda burda bizim kesinlikle unutmamiz gereken durum, initialValue belirlemek her zaman state tmiz icin
3-Eger cok kompleks ve karisik bir objemiz var ise ornegin icerisinde string,number, dizi, farkli bir obje barindiran karisik bir objemiz var ise eger
boyle durumlarda useReducer kullanmak cok daha iyidir, ve dusunelimki data miz cok uzun ve surekli sen spread operatorune basvurarak kafamiz cok
karisabilir
useReducer olusturarak, her bir her bir degisiklik icin ayri aciton-method kullanmak daha mantikli olabilir boyle durumlarda
{
  title:"",
  desc:"",
  price:0,
  category:"",
  tags:[],
  images:{
    sm:"",
    md:"",
    lg:"",
  },
  quantity:0,
}
 
*/