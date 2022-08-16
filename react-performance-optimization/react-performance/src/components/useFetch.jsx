import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getProducts();
  }, [url, getProducts]);
  return { loading, products };
};

/*
BESTPRACTISE...BU COK KARSILASABILECEGIMZ VE GERCEKTEN COZMEKTE ZORLANACGIMZ
CIDDI BIR PROBLEM COZUMU, BUNU IYI ANALIZ EDIP IYI IDRAK ETMEK GEREK
useFetch de olan durum nedir neden useCallback kullanmak durumunda kaldik?
useEffect icerisinde biz getProducts i caigriyoruz, ve her useFetch hooksumuz
render edildiginde, icindeki useEffect dependency array deki elemanlar olan url
ve getProducts i kontrol eder ki sunu iyi anlayalim, getProducts fonksiyonunun
kendisini gonderiyor datayi degil yani getProducts fonksiyonu her useFetch render
edildiginde, bastan tekrar olusturuldugu icin o useEffect i tetikliyor zaten cunku
her yeni olsutruldugunda farkli bir referans ile olusturuluyor sonra o useEffecti 
tetikliyor useEffect getProducts() i invoke ediyor ve o da yeniden bir fetch yaparak
products datasini getiriyor ve setProducts(products) i tetikliyor ve setProducts icindeki
products data si da her seferinde farkli bir referans ile yazildigi icin o da tekrar
useFetch hook unu render ediyor ve bu bu sekilde bir sonsuz donguye giriyor..
Iste bu problemi cozmek icin, useCallback ile biz getProducts fonksiyonunu her seferinde 
yeniden olusturmak yerine, sadece url degisirse onu yeniden olstur diyoruz ve bu sekilde 
de aslinda sunu sagliyoruz getProducts 1 kez calisiyor, ta ki ne zamana kadar url degisene
kadar 1 kez olusturuluyor, sonrasinda ise tekrar olusturulmadigi icin useEffect dependency arrayinde
bulundugundan dolayi useEffecti her degistiginde tetikliyor du bu durumda,  gidip de useEffect in
tekrar tetiklenmesine neden olamiyor..cunku useCallback ile her useFetch render edildginde
tekrar bastan olusturulmasini onlemis olduk....
*/
