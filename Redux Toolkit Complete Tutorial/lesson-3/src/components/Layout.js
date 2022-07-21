import { Outlet } from "react-router-dom";

import React from "react";
import Header from "./Header";

const Layout = () => {
  return (
    <>
    {/*Burda suna dikkat edelim ana componentimiz burasi yani ana director, hangi sayfaya gidersek o sayfa Outlette gozukecek yani bu component
    her zaman calisacak, bu component her zaman gozukecek biz, ornegin header,footer gibi her zaman sabit olan sayfalarimiz var ise burda konumlandiririz
    ondan dolayi
    */}
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
//<Outlet /> i hatirlayacak olursak, icinde bulundugu component olan Layout ana route dur ve parent konumundadir
//Bu parent route icersinde children route konumunda olan route lar dan url adres olarak hangisine gidilirse
//onu dinamik olarak gosteren, iste Outlettir....
//Burayi cook iyi algilayalim ve bize sagladigi kolayligi bir anlayalim buarsi ana componenttir cunku tum
//post lari burda gosteriyoruz Layout u da ana component yaptik yani kullanici sayfaya ilk geldiginde tum children post
//lari getirir...dikkat edelim cook yardim ediyor bize...
/*
 <Routes>
      Layout componenti burdaki diger tum componentlerin parent i durumundadir  
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
*/
