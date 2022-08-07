import React, { useEffect } from "react";

const MyComponent = () => {

  useEffect(() => {
    console.log("Helloooo")
     
    document.addEventListener("click", () => console.log("Hello world") );
    //if you use addEventlistener you should always clean it up
  }, []);
  return <div>MyComponent</div>;
};

export default MyComponent;
/*
Biz normalde react te useeffect i getrequest ile initaial datayi api endpointinden almak icin, kullaniyoruz
React17 de normalde useEffect icerisinde request response islemini gerceklestiren method mount edildiginde isini yapar ve sonund ada
clean funct ile return ile unmount edilip sona ererdi
Ama in the future react in  ile reusebel state mantigindan dolayi, initialmount ve unmount arasinda compnent 2 kez remount ediliyor
mount->unmount->mount->unmount  ve bundan dolayi da her mount da bizim useEffect icinde calisan execute edilen methodumuz 2 kez gerceklesigi icin
biz, 2 kez datayi api den almis oluyoruz useEffect icerinde
React-18 strict mode da iste bu ayni mantiktan dolayi 2 kez bizim datamizi getiriyor
Problemle nasil bas ederiz
useEffectOnce solution approach i - bu yaklasim cok dogru bir yaklasim degildir

*/
