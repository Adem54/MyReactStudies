import React, { useEffect } from "react";
import SingleProduct from "./SingleProduct";

const BigList = ({ products, addToCart }) => {
  
  useEffect(() => {
    console.count('hello from big list');
  });

  return (
    <section className='products'>
      {products.map((product) => {
        return (
          <SingleProduct
            key={product.id}
            {...product}
            addToCart={addToCart}
          ></SingleProduct>
        )
      })}
    </section>
  )
}

export default React.memo(BigList);
/*
BigList icerisinde map yapiyoruz ve SingleProduct componenti tum datalari getiriyor
Ve tabi icindeki SingleProduct ornegin toplam 64 data var ise 64 kez render oluyor 
ilk seferde, ama sonra App.js iceriisnde BigList ile alakasiz baska bir counter datasi
butona basinca 1 artiyor ama BigList i de render ediyor ve o esnada 12 kez de
SingleProduct componenti render oluyor..Bunu onlemek icin ise React.memo yu yukardaki gibi
kullanmamiz gerekiyor. Tum componenti sarmalamamiz gerekiyor bu nu engellemek icin
React.memo ne yapiyor gelen propsu cek ediyor eger gelen props da bir degisme yok ise
re-render yapmiyor BigList i. Cunku react re-render islemi props ve state lerin degismesi ile
gerceklesiyordu
*/