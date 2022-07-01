import "./styles.css";
import { Route,Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { data } from "./data";
import React,{createContext,useState} from "react";
/*createContext constructor ini invoke ediyoruz ve de bunun icerisinde Provider i var onun icine
 sarmamiz gerekiyor ki context imiz componentleri tanisin
Ardinda da tabi ki datatmzi BookContex.Provider a props olarak geceriz tum componentlerin erisebilmesi icin
En ust seviye componentimiz App oldugu icin context i burda tutmayi dusunduk,ama tabi tamamen ayri biryerde 
de tutulabilrdi context..
*/
export const BookContext=createContext();

export default function App() {
  const [state, setState]=useState({
    books:data,
    cart:[]
})

const increaseBook=(id)=>{
        setState({
          ...state,
          cart:state.cart.map(book=>book.id===id ? {...book,count:book.count+1}:book)
        })
}

const decreaseBook=(id)=>{
  setState({
    ...state,
    cart:state.cart.map(book=>book.id===id ? {...book,count:book.count>1 ? book.count-1 : book.count}: book)
  })
}

//addToCart i App.js icinde ousturuyoruz ama Cart componentinde kullanacagiz
const addToCart=(newBook)=>{
  setState({
    ...state,
    cart:state.cart.find(book=>book.id===newBook.id) ? 
  state.cart.map(book=>book.id===newBook.id ? {...book,count:book.count+1}:book)
  : [...state.cart,{...newBook,count:1}]
  
  })
}

const removeFromCart=(id)=>{
  setState({
    ...state,
    cart:state.cart.filter(book=>book.id!==id)
  })
}
/*

Sepete yeni kitap atarken soyle birsey yapacagiz, eger kitap ilk defa ekleniyor ise o zaman kitab
 objesini tamamen eklemenin yani sira ekledigmiz kitap objesinin icine count isminde bir property
  daha ekleyecgiz javascriptin prototyping yontemi ile ve baslangic degteri olarak da 1 verecegiz,
    yok kitap daha onceden sepete atilmis ise, o kitabin sadece count sayisini 1 arttiracagiz..,diger 
    bilgilerine dokunmyacagiz.....BESTPRACTISE....
Peki biz kitabin daha once cart dizimizde olup olmadigini nasil anlaycagiz tabi ki bize parametreden
 gelen book objesinin id sini elimzdeki cart arrayinde aryacagiz var mi yok mu ona bakacagiz...
REACTTA STATE LERI OLUSTURMAK VE YONTEMEK BIZIM JAVASCRIPT MVC DE MODEL OLUSTURMAK VE SONRASINDA 
ONU YONETMEK ILE AYNI SEY..MVC MANTIGINI HATIRLAYALIM COOK FAYDALI...
map ile gelen data nin id si uzerinden sorgulayip guncelleme islemini effektif bir sekilde yapabiliyoruz....
Guncellem islemin ayrica gelen datayi find metjhodu ile bulup sonra bulgugumuz obje icinden datayi 
degistirip o datayi tekrar ana data icinde spread operatoru ile guncelleyerek de yapabilriiz..
Ama guncelleme islemi denilince akla map gelmelidir gelen objenin idi si uzerindenn giderek....
Silme islemi denilince de filter gelmelidir akla
*/
//Biz im amacimiz tek bir merkezden tum uygulamayi yonetmek
const store={state,addToCart,increaseBook,decreaseBook,removeFromCart};
  return (
    <BookContext.Provider value={store}>
    <div className="App">
      <h1>
        Alişveriş Sepeti Yapimi
        <img
          src="https://avatars3.githubusercontent.com/u/60869810?v=4"
          alt="React Dersleri"
        />{" "}
        React Dersleri
      </h1>
      <Routes>
      <Route  path="/" element={<Products/>} />
      <Route path="/cart" element={<Cart/>} />
      </Routes>
    </div>
    </BookContext.Provider>
  );
}
