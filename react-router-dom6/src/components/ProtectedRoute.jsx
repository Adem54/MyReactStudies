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
      {/*Burda children kullaniriz cunku  <Route path="dashboard" element={<ProtectedRoute user={user}><Dashboard user={user}/></ProtectedRoute>}/>
      Eger asagidaki gibi kullansa idik o zaman da Outlet kullanmamiz gerekirdi
      <Route  element={<ProtectedRoute user={user}/>}>
      <Route path="dashboard"  element={<Dashboard user={user}/>}/>
      </Route>
       */}
    </div>
  )
}

export default ProtectedRoute
