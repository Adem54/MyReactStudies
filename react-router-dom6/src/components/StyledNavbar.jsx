import React from 'react'
import {NavLink} from "react-router-dom";
const StyledNavbar = () => {
    return (
        <nav>
         <NavLink  to="/"  
            className={({isActive})=>(isActive ? "link active" : "link")}
         >Home</NavLink>
         <NavLink  to="/about"
           className={({isActive})=>(isActive ? "link active" : "link")}
         >About</NavLink>
         <NavLink  to="/products"
           className={({isActive})=>(isActive ? "link active" : "link")}
         >Products</NavLink>

        <NavLink  to="/login"
           className={({isActive})=>(isActive ? "link active" : "link")}
         >Login</NavLink>

       
        </nav>
       )
}
/*
NavLink kullanildigi zaman react-router dom otomatikmen kendisi
a link elementi ne tiklanan navbar elemnti veya o an uzerinden olunan
Nav menu elementine active className i ni otomatik olarak
atiyor ve eger biz css dosyamiza gidip .active class i cin farkli bir
color rengi atarsak o zaman gorecegiz ki artik uzerine tiklanan menu
elementi farkli bir renk ile gelecek

NavLink icerisine biz ekstra style yazabiliriz ki style icine bunu bir
anonim, arrow function uzerinden yapabilirz bu reac-router-dom tarafindan
NavLink elementine saglanmis olan bir ozelliktir, ve paramereye isActive
yazmamiz gerekir

<NavLink  to="/"  style={(isActive)=>{
            return {color:isActive ? "red":"gray"}
         }}>Home</NavLink>

 bu sekilde kullanabiliriz ama bunun yerine className de kullanabilirz     
 daha cok className yaklasimi kullaniliyor
 <NavLink  to="/"  
            className={({isActive})=>(isActive ? "link active" : "link")}
         >Home</NavLink>

  Eger biz dogrudan css de .active className i icin style verir isek zaten 
  o zaman compnent icinde inline-class ile hemen ustte yaptimgz islemlere de 
  gerek kalmayacak ama class yaklasimi en cok kullanilan yaklasimdir       
*/

export default StyledNavbar
