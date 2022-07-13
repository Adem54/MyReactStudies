import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, addContacts } from "../../redux/contactSlice";
import { nanoid } from "@reduxjs/toolkit";
import {useLocation} from "react-router-dom";
//Kenidimz ekledigmiz elemana bir de uniq id vermemiz gerekiyor

const Form = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    //Bos birakinca tiklattirmayalim
    if (!name || !number) return false;
    //Coklu data eklemek icin
    // const names=name.split(",");
    // const data=names.map((name)=>({id:nanoid(),name}));
    // dispatch(addContacts(data));
    dispatch(addContact({ id: nanoid(), name,phone_number:number }));
    setName("");
    setNumber("");
  };

  //COZUM TEKLIFI-ONERISI-BESTPRACTISE...
  //AYNI FORMU HEM ADD-HEM DE EDIT ICIN KULLANMAK ISTERSEK EGER..
  //Biz hangi sayfada bulundgumuzu dinamik bir sekilde useLocation uzerinden alabiliyoruz
  //Burda pathname uzerinden gidip eger pathname ornegin /y5ywqe1QyCPD4IJJDXwHj bu ise o zaman
  //bu demektir ki ben edit sayfasindayim o zaman da form inputlari icnde ki value ler
  //id elimizde var zaten, ve total dataya da erisebiliyoruz, o zaman bu id  uzerinden hangi
  //data ya tiklandigini buluruz ve input lar icindeki valu lere deriz ki
  //eger pathname==="/y5ywqe1QyCPD4IJJDXwHj" o zaman value olarak o id li data icindeki name ve number i
  //input lar icinde goster deriz...yok path bu degil de sadece "/" ise demekki ben add ekleme sayfasindayim
  //demektir o zaman da zaten input value si name -number direk state leri alabilir...
  //const {pathname}=useLocation(); bu sekilde pathname i alabilirz


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
         style={{height:"1.4rem", marginRight:"0.5rem"}}
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
        style={{height:"1.4rem", marginRight:"0.5rem"}}
          placeholder="phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;

/*
Eger kullanici input icine aray virgul koyarak birden fazla isim ekleyebilsin
istersek o zaman da
Biz ne yapiyoruz dizi ile calisiyoruz genellikle cunku dizi uzerinden bircok mehtod uygulayabilioruz
Peki bizim birden fazla datamiz yanyana yaziliorsa string seklidne o zaman da string methodlarindan
datamizi, isim isim ayirip onlari dizii icine atacak bir method lazm bize...ONEMLI-BESPTRACTISE....
const names=name.split(",");//virgule gore ayirarak dizi icine atiyor
sonra da names dizisi icinde artik eklenen isimler mevcut o zaman ben names dizisini
forEach ile dondererek, her bir donmede de addContact i uygulayarak birden fazla name i de eklemis olurum
  names.forEach(name=>dispatch(addContact({id:nanoid(),name})));
 dispatch(addContact({id:nanoid(),name})); //tek bir data eklerken bu sekilde ekleriz
Bu arada biz bu sekilde yaptik ama bizim kullanacagimiz yontem bu degil cunku bize birden fazla data eklmek icinde
yine createEntityAdapter addMany diye hazir method veriyor onun uzerinden yapacagiz bu isi
Bizim sadece neye ihtiyacimiz var dizi icindeki her bir eleman icinde bir uniq id eklememiz gerekiyor
Dikkat edelim burda iyi bilmemiz gereken nokta biz eklenen her bir data icin uniq id vermemiz gerekyor
 const handleSubmit=(e)=>{
        e.preventDefault();
        Bos birakinca tiklattirmayalim
        if(!name)return false;
        const names=name.split(",");//virgule gore ayirarak dizi icine atiyor
        sonra da names dizisi icinde artik eklenen isimler mevcut o zaman ben names dizisini
        forEach ile dondererek, her bir donmede de addContact i uygulayarak birden fazla name i de eklemis olurum
       names.forEach(name=>dispatch(addContact({id:nanoid(),name})));
       dispatch(addContact({id:nanoid(),name})); //tek bir data eklerken bu sekilde ekleriz
      Bu arada biz bu sekilde yaptik ama bizim kullanacagimiz yontem bu degil cunku bize birden fazla data eklmek icinde 
      yine createEntityAdapter addMany diye hazir method veriyor onun uzerinden yapacagiz bu isi
      Bizim sadece neye ihtiyacimiz var dizi icindeki her bir eleman icinde bir uniq id eklememiz gerekiyor
      const data=names.map((name)=>({id:nanoid(),name}));
      dispatch(addContacts(data));
      tek seferde 3 kaydi birden ekledio
      
      vz-VOWTtf5NjN5Kit9m0B(pin):{id:'vz-VOWTtf5NjN5Kit9m0B',name:'adem'}
qTtmKYdemkwRzWUquMAlU(pin):{id:'qTtmKYdemkwRzWUquMAlU',name:'zehra'}
hq-QAPTxC7WcZvLHi63R5(pin):{id:'hq-QAPTxC7WcZvLHi63R5',name:'zeynep'}
    dispatch(addContact({id:nanoid(),name}))
        setName("");
    }

*/
