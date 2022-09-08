import React from 'react'

const PageButton = ({pg,setPage,isPreviousData}) => {
    //HARIKA USER EXPERIENCE ORNEKLEMESI..BIZ OLABILECEK HER TURLU BEKLENMEDIK USEREXPERIENCE I GOZ ONUNDE BULUNDURUP 
    //ONA GORE BIR USERINTERFACE AYARLAMAMIZ GEREKIYOR...
    //Burda kullanici ornegin 1 kez 1. sayfaya tikladi ve 1. sayfa datalar i geldi,ve artik previousData bizim 1.sayfa
    //datalarimizdir ve kullanici geldi tekrar israrla 1.sayfa butona basiyor her seferinde bir daha bir daha cache den data
    //gelecek ve anlamsizdir ama kullanici yapabilir bunu, o zaman biz de yapmasin diye eger data degismedi ise bir onceki data
    //geldi ise o zaman biz, disabled yap diyoruz, ki kullanici gelip birck kez art arda basmasin...
  return <button onClick={()=>setPage(pg)}  disabled={isPreviousData}>
    {pg}</button>
  //Biz hangi sayfa numarasina tiklarsak o numara yi page de guncellemis olacagiz..ve button da o numarayi gosterecek
}

export default PageButton