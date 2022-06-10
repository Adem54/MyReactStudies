import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  console.log("Rendering:App component");
  const [count, setCount] = useState(0);
  const increase = () => {
    setCount((count) => count + 1);
  };
  //COOOK KRITIK VE ONEMLI BIR DURUM SOZ KONUSU....
  // const data={name:"Adem"};//Bu component her mount edildiginde bu data bellekte yeniden olusturuldugu icin yani yeniden bir yer tuttugu icin ve bu da bir obje oldugu icin biz bu datayi Header a gonderdigmiz zaman referans tip oldugu icin, degerine degil tabiki referansina, adresine bakiyor ve adresi de degismis olyor ondan dolayi da biz React.memo da kullansak Header in bu durumdan dolayi render edilmesini engelleyemiyoruz, eger bu deger data objesi degilde bir deger tip olsa idi number,string gibi ayni sey olmayacaakti....
  //Bu durumdan kurtulmak icin
  //1-data objesini component disinda tanimlarsak bu problemden kurtuluruz her mount olayinda datamiz yeniden bellekte olusturulmamis olur...
  //2-Illa da component icinde kullanacaksak baska veri ler le kullanma zorunlulugmz var ise o zaman da useMemo devreye giriyor ve biz useMemo icerisine data objemizi yazarsak bu problemden kurtulmus oluruz...
  //Biz burda obje ornegi verdik de bu bir fonksiyon da olabilir ve bize bir return islemi ile data donebilirdi,

  const data = useMemo(() => {
   // return { name: "Adem" };
  return calculateObject();
  }, []);
  //useMemo yu kullandigimzdan dolayi biz her defasinda ayni hesaplamayi yapmak zorunda kalmiyoruz, ayni methodun sonucunu bir yerde tutuyor ve tekrar hesaplayip sayfayi yormak yerine, ve de calculateObject() metodunu calistirmak yerine direk sonuc veriyor useMemo sayesinde......
  //Bu hesaplama array icerisne, dependency array icerisine girilen degisken degistirginde useMemo icindeki, fonksiyon tekrar hesaplanacak....Ondan dolayi da ne zaman tekrar fonksiyojn calismasini istiyorsak o zaman dependency array icine o degiskeni yerlestiririz

  //const data=calculateObject();
  //Peki bu data ne zaman yeniden hesaplanacak, dependency array e biz bir deger atarsak o atadigmiz deger her degistiginde data objemiz yeniden hesaplanacak ve bellekteki adresi, referns degeri degisecektir dolayisi ile

  return (
    <div className="App">
      <Header data={data} />
      {/*Boyle bir durumda count 5 ten kucuk oldugu durumlarda 0 verecek 5 ten buyuk oldugunda countu verecek ve degismeyecek, dolayisi ile, sayi 5 olana kadar Header degismeyecek ve render edilmeyecek... */}
      <br />
      <button onClick={increase}>Click me to increase the subcribers!</button>
      <p>Subscribed Person count: {count}</p>
      <List />
    </div>
  );
}
export default App;
function calculateObject() {
  for (let i = 0; i < 1000000000; i++) {
   
  }
  console.log("Calculating completed");
  return { name: "Ademmmm" };
}
/*
Memoization ile siz bir fonksiyonu çağırdığınızda uygulamanız fonksiyondan dönen sonucu kaydeder. Böylelikle siz fonksiyonu çağırdığınızda içerideki işlemleri tekrardan çalıştırmaktansa, kaydetmiş olduğu sonucu direkt olarak döndürür. Daha net anlaşılması adına basit bir örnek verelim. Elimizde çarpma işlemi yapan bir fonksiyon olduğunu düşünelim:

function production(x) {
   return x * x
}

console.log(production(5));

production fonksiyonu bir parametre almaktadır. Bu örneğimizde parametreye 5 değerini verdiğimizde sonuç olarak bize 25 değerini döndürür. Eğer memoization tekniklerinden birini kullanarak bu fonksiyonu çağırırsak, 5 değerine karşılık gelen 25 değeri kaydedilir. Böylelikle bu fonksiyonu aynı parametre ile tekrar çağırmamız durumunda, parametre değerine karşılık gelen sonuç zaten elimizde olduğu için bize direkt olarak sonucu döndürür ve tekrardan çarpma işlemini gerçekleştirmez.

React’ta ise memoization tekniğini kullanarak, componentlerin veya fonksiyonların gereksiz yere tekrar tekrar render edilmesini veya oluşturulmasını engelleyebiliriz. Şimdi case’ler üzerinden React’ta memoization kullanımlarına bir bakalım.

Case 1 —Bir Componentin Gereksiz Yere Render Edilmesi (React.memo)
Case 2- App.js componentindeki te ki bir obje nin veya fonksiyonun props olarak baska bir component e gonderilmesi ve her App.js render edilmesi durumunda obje veya fonks degeri degismemesine ragmen bellekte yeniden olusturulup, adresi yani referansi degistigi icin, ve de referan tiplerde deger degil referans karsilastirildigi icin bir degisiklik olmus oluyor ve React.memo burda birsey yapamiyor dolayisi ile useMemo devreye giriyor
Ayni zamanda birde icerisinde cok uzun islemler yapilan bazi fonksiyonlarin da her App.js edildginde render edilmesi uygulammizi cok ciddi yorabilir ve yine burda da useMemo devreye girerek ayni sonucu hesaplayan fonksiyonun her render islminde bir daha ayni sonucu hesaplamasi yerine, ilk bir kere hesaplayip daha sonra hic o fonkiyonu tekrar calistirmiyor ve o sonucu hafizasinda tutarak dogrudan o sonucu doneriyor ve bu vi

*/
