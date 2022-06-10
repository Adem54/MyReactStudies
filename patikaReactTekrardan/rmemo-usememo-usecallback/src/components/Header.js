import React, {memo} from 'react'
const Header = ({increase}) => {
console.log("Rendering:Header component");
  return (
      <div>
     
      <button onClick={increase}>Click</button>
      </div>
  )
}
export default memo(Header);
//React.memo...cok onemli ihityacimiz cook olacak...
//Bu component App.js icerisinde kullaniliyor ve Header componentinde hicbirdesigiklikl olmamasina ragmen, App.js deki increase butonuna her bastigimizda, her degisiklikte Header componenti de render ediliyor yani gereksiz bir render islemi gerceklesiyor...Projemiz buyudukce bu tarz gereksiz render lar artacak ve performans  da ciddi yavaslamalara sebep olabilir dolaysii ile Header i gereksiz kendi icerisindeki bir state degisimi haricinde render edilmekten korumak icin export ederken Reac.memo(Header) parantezi icine, React memo ile sarmalayarak hallederiz...
//Header componenti icerisinde props veya state ler ne zaman degisirse o zaman render edilecektir...Biz daha sonradan butona her tikladigmizda degisen count degerini Header a gonderdik ve onun da degistigini ve Header da artik render olacak her butona basildiginda, ve bu render gerekli bir render dir artik ondan dolayi render edilmesi gerekiyor zaten
//React memo kullandigmiz  zaman alinan prop un bir onceki degeri ile yeni degeri karsilastirilir, prop olark gelen deger karsilastirilir, parametreye gelen deger karsilastirilir eger ayni ise o zaman, render edilmez ama degismis ise re-render edilir....