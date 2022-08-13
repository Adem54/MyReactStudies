import { useEffect, useState } from "react"
//Burda harika bir bestpractise uygulamis, cunku <T> generic repostory design pattern mantigni uygulayarak bu islei
//bircok farkli, type ile calisabilir hale getirerek globallestirmis aslinda...
//Bu custom hook cardItems in useState islemini burda yaptigi icin, cardItems icerisinde olan herhangi bir degisiklikte 
//bu customhook component, render edilecegi icin, surekli cartItems datamiz localStorage da guncellenecektir
//Burda da dikkat etmemiz gerekn durum su ki, initialValue denilen, localStorage a value olarak kaydetgiimz deger kimi zaman bir fonksiyonun return etmesi sonucunda donen deger olarak da alabiliriz ondan dolayi bizim onu da burda belirtmemiz gerekir ki o durumlari da handle edebilelim...
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
   //initialValue bos dizi olarak geliyor her zaman
  //useState icinde neden fonksiyon kullaniyoruz cunku
  /*
  what we want to do is we want to use the function version of it because we only ever want to invoke 
  checking our local storage one time, it is kind of a slow opearation and we don't want to do
   this every time our component re-renders 
   Yani useState icerisinde bu sekilde uzun islemleri birkac satirlik islemleri yapabilmek icin bizm 
   icerisinde bir fonksiyon invoke etmemiz lazm ki orda da bir kontrol yaparak, eger localSTorage icinde
  */
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === "function") {
      return (initialValue as () => T)()//Bunu yapmazsak o zaman bize initialvalue fonksyon olarak geldigi zaman tutup direk fonksiyonun kendsini donderir return ettigi dondermek yerine..
    } else {
      return initialValue
    }
  })
  
  /*
  Kisacasi eger localStorage da hicbirsey yok ise o zaman demekki ilk defa basliyor o zaman da initialValue yi ver ya direk ki o da bos dizi olarak gelecek ya da eger bir fonksiyonun return ettigi degeri verecek ise o zaman da onu ver demis oluyoruz, ki bu diyelim ki localStorage da data silindi o durumlarda
  ve de en bastan baslandigi durumlarda gecerlidir
  Ama zaten localStorage da data var ise o zaman da o datayi value olarak donder diyoruz ve de biz var olan datayi yani value yi localStorage da value de var olan her degisiklik durumunda, guncelleyerek surekli guncel tutmus oluyoruz ki zaten bu yazdigmiz localStorage custom hook u da cartItem, setCartItem a bagli olduklari icin, her cartItem degisikliginde bu useLocalStorage cagrilmis olacak ve datayi localStorage da guncellemis olacak...
  */

  useEffect(() => {
    console.log("useEffect");
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  console.log("value: ",value);
  console.log("setValue: ",setValue);
  
  return [value, setValue] as [typeof value, typeof setValue]
  //Bu da bestpractise, dondugmuz data nin type larini da vermemiz gerekiyor...VE bu sekilde kullanildigini daha once gormemistim...
}


/*
 const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )


  useLocalStorage hook u da  return [value, setValue] as [typeof value, typeof setValue] bu sekilde bir sey return ediyor
  Yani olay su aslinda 
   const [cartItems, setCartItems]=[value, setValue] as [typeof value, typeof setValue]
   boyle oluyor cartItems da ornegin increaseCartQuantity methodunda cartItems da degisiklik oluyor bu su demektir degisiklik value de oluyor demektir yani
   Ondan dolayi da useLocalStorage da yapilan islem eger localstorage da hic data  yok ise o zaman oraya bos bir dizi ile baslatmak key e de shopping-cart vermek
   ardindan da zaten ayni useState mantiginda, cartItems daki her degisiklik dogrudan, value ye yansiyor zaten...
  Burda setCartItems ile yapilan degisiklikler, ne yapiyor cartItems i render ediyor guncelliyor ve burda
*/