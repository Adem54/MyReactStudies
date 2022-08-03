import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      {/*Layout ana Route dur tum diger componentleri ona nested olarak yerlestiriyoruz...Burasi ana componenttir ornegin menu, gibi header gibi tum sayfalarda  surekli olarak gelmesini istgedimgiz component var ise gideriz, Layout ta Outlet in ustune yerlestiririz ki her zaman hangi sayfa gelirse gelsin, veya hangi url e gidilirse gidilsin her zaman onu gorebiliriz...Ayrica Layout a nested olan tum componentlerin gorulmesi icin <Outlet/> kullanilmalidri Layout componenti icersinde, Outlet component Layouta un tum children componentlerini temsil ediyor */}
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
{/*
Burda ornegin bir sirkette sinizdir ve calisan, olarak permission veya rol u vardir ve siz oraya sadece calisan olarak girilmelerini istersiniz, belki rol olark sirket numrasi gonderilir, api den veya belki baska bir kod bunlar api dokumantasyonlarnda ogrenecegmiz bilgilerdir
ayni role sahip insanlar birden fazla componente erisirken, o role ile erismeleri gerekir ise o zaman da ayni rol propsunu gonderidimgz RequredAuth icerisine birden fazla componenti child olarak verebiliriz....path lerini de ayarlayarak
*/}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

/*
Role-based authorization..yani rol bazli yetkilendirme islemleri
Kullanici daha onces sisteme register olmus, evet, ardindan kullanici geliyor ve login de oluyor kullanici adi ve sifre ile 
Ancak editor sayfasi ve admni sayfalari icin editor permisson ve admin-permission i olmadigi icin,yani yetkisi olmadigi icin, 
o sayfalara tikladiginda oralardan iste senin editor yetkin yok dolayisi ile de bu sayfya giremezsin cunku o sayfa icin ozel editor
yetkisi gerekiyor cunku o sayfada editleme, iste ornegin blog yazilarinda silme,ekleme, guncelleme islemlerini yapma yetkisi 
verilmis, ve ayni sekilde admin sayfasinda da, nerdeyse her seyi yapilabiliyor, yani cok kritik islemler yapilabiliyor dolayisi ile
de oralara herkesin erismemesi gerekir, her ne kadar giris yapabilse bile
Buna ornek olarak discordu verecek olursak ornegn discor da bazi gruplarda mesaji sadece hocalar yazabiliyor ogrenciler sadece
yazilan mesaja emoji koyabiliyor cunku orda sadece ogretmenlerin mesaj yazma yetkisi var ogrencinin mesaj yazma yetkisi yok
Ayrica ornegin, ogrencilerden C# calisanlarin mesela javascript kismina eriisimleri olmayabiliyor, ve ozellikle bazi sayfalara, ornegin
konu ekleme, cikarma, duzenleme sayfalarina yine sadece yetkisi olan ogretmenler girebiliyor...gibi yetkilendirme islemleri var
Su mantigi anlayalim, yetkilendirme islemi ozelliikle cok kritik oneme sahip bazi spesifik sayfalarda spesifik ekleme, silme, duzenleme islemleri
yapilacak yerlere kullanici giris yapsa bile o sayfaya ozel izni olanlarin girmesne izin vermeyi saglayan mantiktir...Ki kimi zaman ornegin
bir kullaniciya sadece,ekleme, ve duzenleme yetkileri verilirken silme yetkisi verilmeyebilir bu da olabilir yani....
*/