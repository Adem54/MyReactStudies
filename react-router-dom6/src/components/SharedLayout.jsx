import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import StyledNavbar from './StyledNavbar'
const Home = () => {
  return (
    <>
    {/* Bu home route parent componenti altindaki tum compnentlerde de gozukecektir...bazen
    biz tum home parent componenti ve onun altindaki componentler icinde sabit gostermek istedigmz 
    componentler olabilir iste, bu sekilde kullanabilirz
    */}
      <StyledNavbar/>
       <Outlet/>
    </>
  )
}

export default Home
/* 
Index Router--Bu da cok onemli
Peki burda suna dikkat edelim bizim burda tam olarak bir icerigimz yok buna dikkat edelim
Tabi ki buraya biz icerik girebiliriz ancak bu icerik tum componentler icinde gozukecek
Ama biz istiyoruz ki Home page a ait de bir icerik olsun...Bunu yapabilmek icin index route olustrmamiz gerekecek
*/
