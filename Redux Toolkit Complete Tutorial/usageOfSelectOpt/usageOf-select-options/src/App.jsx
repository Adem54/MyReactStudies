import { useState } from 'react'

import './App.css'
const users = [
  { id: 1, name: "Dude Lebowski" },
  { id: 2, name: "Neil Young" },
  { id: 3, name: "Dave Gray" },
];

function App() {
  const [userId, setUserId] = useState();
  console.log("userId: ",userId);
  //Burda option lara value olarak id verilir ama text kisminda, name gosterilir
  //Option selector lerde mantigimiz genellikle budur
  //Ve id ayri bir state olarak tutulur ki bu kolay birsekilde gonderecegimiz
  //yere gonderebilmek icin...Biz ne yapiyoruz bu tarz foreign key mantigindaki
  //datalar icin id lerini gondeririz sadece iste burda da ayni mantik gecerli olacak...
  //Cunku id sini bildgin dataya erismek cok kolaydir...
  //Bu value yi bizim normal input lara disardan girdigmiz deger
  //gibi dusunelim, bu direk e.target.value ye esit olacak
  //Dolayisi ile select icindeki onChange isleminde de biz
  //hangi id ye tiklanirsa onu, userId stateine atayacagiz...
  //Bu userId yi de select icinceki value attributune verdik mi
  //iste biz hangisine tiklarsak artik onu dinamik birsekilde alacagiz...
  const userOptions=users.map(({id,name})=>{
    return <option key={id} value={id}>
        {name}
    </option>
  })
  return (
    <div className="App">
    <h2>Welcome to React</h2>
    <hr/>
    <label htmlFor="user">Choose User:  </label>
    <select value={userId}
    onChange={(e)=>setUserId(e.target.value)}
    >
      {/*Burda ilk sayfa acilgidina gozukecek option icin 2 alternatif kullanabiliriz
      1-value "" bos verilir ve option text i bos birakilir doloayisi ile sadece gostermek istedigmiz
      data mizdaki user lar gozukur...
      2-Eger selcect option alani ilk acilginda bir placeholder mantiginda lutfen bir user seciniz gibi 
      gibi birsey gostermek istersek de onu text kisminda oyle birsey yazariz ama kullanici secim yaparken
      bu yazdgimiz option i secememsi gerekir ondan dolayi da bu option sadece ilk select option sayfada acilgiginda
      gozuksun diye, secilmesine izin vermemek icin disabled yapariz.
      */}
      <option value="" ></option>
      {/* <option value="" disabled>Lutfen bir user seciniz</option> */}
      {userOptions}
    </select>
    </div>
  )
}

export default App
