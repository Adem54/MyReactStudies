import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch';

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/javascript-store-products'

const Example = () => {
  const { loading, products } = useFetch(url)
  console.log(products)
  return (
    <div>
      <h2>{loading ? 'loading...' : 'data'}</h2>
    </div>
  )
}

export default Example

/*
Burda biz custom hook lar ile biz jsx elementlerinin reusability sinin degil fonksiyonelligin
reusability sini konusuyoruz bunu anlayalim. Yani bizim ornegin , component mount oldugunda
bir endpointten data fetch etmemiz gerek tek yapacagimz component mount edildiginde
datayi fetch edip, icinde loading, data state leri ile bu datayi almak ve bunu component icinde
map lemek eger data gelmis ise datayi gostermek, data gelene kadar da loading i handle etmek
amacimiz bu ve bu islev bize ornegin 10 farkli componentte lazim ne yapaagiz 
10 componente de gidip once useState olusturup icinde loading,data data larni koyacagiz ardindan gidip useEFfect
ile fetch veya axios ile datayi cekip sonra da o datayi kullaniciya loading ile birlikte handle ederek gosterecegiz
Bu cok mantikli degil 10 yerde ayni isi yapmak onun yerine bu anlatgimiz islevleri bir custom hook olusturup 
orda yapalim ve 10 farkli yerde bu islevi tek sartirda kullanabilelim...Iste reusability deki amacimiz,budur
*/