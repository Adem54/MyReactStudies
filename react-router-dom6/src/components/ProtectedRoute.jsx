import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
const ProtectedRoute = ({user,children}) => {
    console.log("protectedRouteUser: ",user);
     if(!user)return <Navigate to="/login"/>
//Burda kullanicinin yetkisini veya token  ya da kullanici
//login olduguna dair back-end den donen her ne data ise o data
//burda cek edilir, o data var ise demekki kullanici giris yapmis
//o zaman burda dashobard sayfasina erismesine izin verilir yoksa
//dogru kullanici Login sayfasina yonlendirilir giris yap da gel diye

  return (
    <div>
      {/* <Outlet/> */}
      {children}
      {/*Burda ister Outlet ister children kullaniriz, ki Outlet react-router-dom 6 ile geldi, onun icin Outlet kullanmak daha mantiklidir
      Outlet de aslinda children i temsil ediyor */}
    </div>
  )
}

export default ProtectedRoute
