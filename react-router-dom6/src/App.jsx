
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import NotFound from './components/NotFound';
import About from './components/About';
import SharedLayout from './components/SharedLayout';
import ProductDetail from './components/ProductDetail';
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SharedProductLayout from './components/SharedProductLayout';

function App() {
const [user,setUser]=useState(null);
  return (
   
      <BrowserRouter>
      {/*
      En basit yaklasim bu..
     1- BrowserRouter altina normal jsx-html elemnti yerlestirebiliriz ancak
      Router veya Router icerisinde bunu yapamayiz
      Burasi sunun icin onemli biz tum projede gozukmesini istdgimz yapilari nav-footer gibi bu sekilde kullanabiliriz
      Ama bu biraz daha eski bir yaklasimdir bunun yerine biz, bunlari Layout icinde de yerlestirebilecegiz
      
      2-Parent-route(nested route)
      Ana elemnti Home yapip path ini de / belirleyip, Route u children alacak sekilde
      cift aclip kapanan Route a koyariz ve artik Parent route olmustur ve home un children i olan
      elementleri gorebilmemiz icin Home icinde Outlet kullanilmalidir
      Home parent konnumunda odugu icin kendi children i konumunda olan componentlerin hepsinde de 
      Home componentinin children i pozisyonundaki componentlerin pathi de home page in pathi ne ise once o yazilir
      arkasindan children componentlerinin pathleri eklenince onlara erisiriz...
      <Routes>
      <Route path="/"  element={<Home/>}>
       <Route path="about" element={<About/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
      </Routes>
      */}
      {/* <nav>our navbar</nav> */}
      <Routes>
        {/* Bazen biz home componenti ve onun altindaki tum componenlterde gostermek istedgim navbar gibi 
      componentler olabilir iste onlari da gidip, Home component i icine yazariz..Bu onemlidir,cok karsilasabiliriz. */}
      {/*Anlamamiz gereken cok onemli noktalardan biri de ana parent component SharedLayout compnenttir bu su demek bu compnent icinde
      yazacagimz ekstra componentler Navbar,footer gibi onlar parent element icindeki tum children componentlerde gozukecek demektir
      ancak parent elemnte nested component olarak index route component ekledigmz zaman, ki parent compnent ile path leri ayni oluyor
      index componentinin index yaptigimiz icin, ve Home componenti nin de kendine ait ayri bir icerigi olacagi icin iste o icerik index
      route olan compnentte olusturulacak
      */}
        <Route path="/"  element={<SharedLayout/>}>
          <Route index element={<Home/>}/>{/* Ana componentimz olan Home componentinin kendisine ait icerikkleri biz bu sekilde index route componenti ile olusturabiliyoruz onemli bir ozelliktir,Route icinde index oldugu zaman bu index, parent route elementinin path i ne ise onu alacktir, o dur aslinda, index route icerik olarak sadece ana Home componentine ait icerigi barindirir */}
          <Route path="about" element={<About/>}/>{/* /about ile erisilir bu sayfaya */}
        {/* <Route path="products/*" element={<Products/>}/> */}
        {/* path="products/*" demek bu path bir group pathidir yani Products componenti icinde de bir grup <Routes> <Route path="productdetail" element={<ProductDetail/>} />  <Route  path="productcategory" element={<ProductCategory/>}/>    */}
        <Route path="products" element={<SharedProductLayout/>} >{/*Burda, Products zaten kendisi nested bir component ayrica bir de onu Route parent elementi yapabilir miyiz, onu bir cek etmemiz gerekir.. */}
        <Route index element={<Products/>} />
        <Route path=":productId" element={<ProductDetail/>} />
        {/* http://127.0.0.1:5173/products/111   gibi herhangi bir sayi girildiginde ProductDetail sayfasina gidecektir */}
        </Route>
          <Route path="login" element={<Login setUser={setUser}></Login>}/>
          <Route path="dashboard" element={<ProtectedRoute user={user}><Dashboard user={user}/></ProtectedRoute>}/>

        <Route path="*" element={<NotFound/>}/>
        </Route>
        {/* <Route path="dashboard" element={<div>dahsboard</div>}>
        <Route path="stats" element={<div>Stats</div>}/>{/* bu componente dashboard/stats adresinden erisilir  }
        </Route>
        */}
        
      </Routes>
      {/* <footer>our footer</footer> */}
      </BrowserRouter>
  
  )
}

export default App
