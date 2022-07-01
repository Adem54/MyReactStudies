import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";
import Loading from "./components/Loading";
import { CountryType } from "./types";
const App = () => {
  const [countries,setCountries]=useState<CountryType[]>([]);
  const [loading,setLoading]=useState<boolean>(false);


//Eger biz useState ve axios da type ini vermez isek, o zaman api den gelecek data yi alamayacaktir
//type ini never olarak alacaktir...CCook onemli, api den datayi alabilmek icin
//axios.get<CountryType[]>("https://restcountries.com/v3.1/all"); ve useState<CountryType[]>([]);
//tipleri girmemiz cook onemlidir

  //ONEMLI....
  //axiousu kullanirken get onune parantez icerisinde bize donen data yi
  //olusturdugjmzu interface in type olarak girmemiz gerekiyor
  const getCountries=async ()=>{
    setLoading(true);
    try {
      const {data}=await axios.get<CountryType[]>("https://restcountries.com/v3.1/all");
      setCountries(data);
      
    } catch (error) {
      console.log("Ulkeleri alirken hata olustu!");
      
    }finally{
      setLoading(false);
    }
    //BESTPRACTISE.---
    //try-catch i biz nerde kullaniyoruz...Ozellikle api ye istek gonderdik ama,
    //istek te bir hata olabilir, veya baska problem lerde olabilir, iste try-catch kullanimi icin
    //cok mantikli bir yer..
    //Ayni mantikta, biz back-end de de front-enten gonderilen data bizde eger yok ise ve 
    //response veremiyorsak ve kullaniciya neden cevap veremedgimzi donmeki cin try-cach kullaniyorduk

  }

  useEffect(()=>{
      getCountries();
  },[])
  //Dependency arr useEffect icindeki fonksiyonun ne zaman calisacagini soyler bize
  //Bos bir dizi gireriz cunku uygulamam ilk calistiginda icindeki methodu tetiklesin ve 
  //componentim mount oldugunda hazir verilerle gelsin diye getCountries methodunu burda calitiririz
  //Typescript bizim api den aldigmiz verinin verdigmiz tipe uyup uymadigina bakmaz, o bizim sorumlulugumuzdadir
  //Ondan dolayi typedefinitionl arimizi ousturmadan once testlerimizi mutlaka yapmakta fayda var..
  console.log(countries);
  return (
    <div>
      <Loading loading={loading}>
      {countries.map((country,index)=>(
        <Country key={index}  country={country}/>        
      ))}
      </Loading>
    </div>
  )
}

export default App
/*Ulke bilgilerini gonderirken istersek ayri ayri gonderebiliriz
Istersek de eger data nin tamamina bir alt comopnentte ihtiyacimiz var ise de tamamini da gondrebilriz
Biz datanin tamamini gonderecegiz
*/