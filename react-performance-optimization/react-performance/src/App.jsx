import { useCallback, useMemo, useState } from "react";
import "./App.css";
import BigList from "./components/BigList";
import { useFetch } from "./components/useFetch";
const url = 'https://course-api.com/javascript-store-products'


// every time props or state changes, component re-renders
const calculateMostExpensive = (data) => {
  console.log("calculateMostExpensive...")
  return (
    data.reduce((total, item) => {
      const price = item.fields.price
      if (price >= total) {
        total = price
      }
      return total
    }, 0) / 100
  )
}

function App() {

  const { products } = useFetch(url)
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState(0)

  const addToCart = useCallback(() => {
    setCart(cart=>cart + 1)
  }, [])


  // const addToCart = () => {
  //   setCart(cart + 1)
  // }

  const mostExpensive = useMemo(() => calculateMostExpensive(products), [
    products,
  ])
/*
Hesaplamasi cok uzun zaman alacak fonksiyonlardan bahsediyourz
Ornegin, bizim App.js componentinden icerisinde text inputlarin oludugu
mesela text-area inputununda oldugu, form elementleri olsun ve biz controlled
form yapmak icin inputlar icine girilen her bir karakter App.js in render edilmesini 
saglar ve her render edildiginde de ornegin farzedelim ki cok zaman alan
ve uzun bir islem yapan ve de her islem soncunda da ayni sonucu donduren
 fonksiyon var ve her App.js render oldugunda o sonkfion da bastan calisiyor ve 
 bize ciddi performans kaybi yasatior ciddi bir maliyet olusturuyor bize 
 Iste bu senaryo tam de useMemo nun kullanilacagiz senaryodur..Iste 
 biz eger, biz bu tarz cok maliyetli fonksiyonlarin o componentte gerceklesen
 her bir render isleminde tekrar tekrar hesaplanarak, invoke edilerek gelmesini
 engelleyerek buyuk bir maliyet yukunden kurtulmak icin useMemo yu kulllaniirz
Bu arada, biz dependencya array a de hangi datayi kullaniyor isek onu
gireriz ki her o data degistiginde tekrar hesaplansin calculateMostExpensive fonksiiyonu
*/
  
  return (
    <>
      <h1>Count : {count}</h1>
      <button className='btn' onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{ marginTop: '3rem' }}>cart : {cart}</h1>
      <h1>Most Expensive : ${mostExpensive}</h1>
      <BigList products={products} addToCart={addToCart} />
    </>
  )
}

export default App;
