
import { Layout, Menu } from 'antd';
import Item from 'antd/lib/list/Item';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppState } from '../store';
import { isLoggedin } from '../store/actions/userAction';
import { UserDispatch } from '../types/user';

const { Header } = Layout;
/*
MENU BUTONLARINININ KULLANICININ GIRISLI-LOGIN OLUP OLMAMASINA GORE DINAMIK
BIR SEKILDE ORGANIZE ETMEK-BESTPRACTISE....
AppHeader.tsx icinde yani burasi uygulamaya giren herkes te otomatik calisacak bir component
Eger userState in data property si icerisinde kullaniciya ait herhangi bir deger var ise bu demektir ki
isLoggedIn fonksiyonu calismis, bu bilgiler geriye getirilmis demektir ya da 
kullanici daha once login olmus ve bu blgileri state e kaydetmis demektir
Yani eger data icinde user bilgileri var ise, yani bize api den response olarak
gonderilmis ve data icine kaydedilmise ise demekki kullanicimiz giris yapmis ¨
sisteme, o zaman biz neyi sorgulayacagiz userState icindeki data icinde user bilgileri
var mi onu sorugulayacagiz...
Simdi olayin dikkat etmemiz gereken noktasi su ki, bizim login requesti yapilirken
eger daha once register yapilmis ise login islemi basarili bir sekilde gerceklesmesi
beklenir ve de ayni zamanda bir response olarak bir de token gonderilmesi beklenir
Ama isLoggedIn requesti yapilirken bu token ile birlikte yapilmalidir yani eger
kullanici daha once login olmamis ise zaten kullanici da token yoktur, localStoreage a 
kaydedemmemistir ve de otomaik olarak isLoggedIn request i zaten invalid token dan
basarsizi olacaktir, isLoggedIn esasinda kullanici daha once login olmus mu olmamis mi
onu sorgulamis oluyor bir nevi....
Ve biz userState icinde data nin icine user bilgilerinin gelip gelmemesi uzerinden 
bir logic yazariz ve bu logice gore menu elemanlarinin hangilerinin gosterilip 
hangilerinin gosterilmeyecegini belirleyebiliriz....Yani kullanicinin daha onceden login
olup olmadigini login islemi sonucunda gonderilmesi beklenen data gonderilmis mi diye
sorgulayarak kullanici ilk defa uygulamayi actiginda ana menu butonlarimizdan 
Logout,Records,Categories i biz kullaniciya eger kullanicinin girisi var ise kullanici giris 
yapmis ise gosterecegiz, yok kullanici giris yapmamis ise de kullaniciya Login menu butonunu
gosterecegiz....
eger kullanici giris yapmis ise yani data icinde user bilgileri var ise
o zaman, kullanici login olmustur ve menu de logout,categories,records larig gosteririz
yok eger kullaniciya ait herhangi bir bilgi yok ise data icinde o zaman direk login
menu butonunu gosterriziz
BESTPRACTISE...ONEMLI....
Kullanicii girisli oldugunda, categories veya records da sayfa yuklenirken,
loading durumuda, menu de Login butonu gouzukuyor biz bunu istemiyor isek
o zaman asdgida loading durumunda Login i menusunu gosterme diye logic yazariz
  loading ? null :<Menu.Item key={"/login"}>Giris</Menu.Item>

Ayrica biz login sayfasina giridgmiz anda useEffect icinde token  kontrol edilior idi
ve eger kullaicinin token i var ise yani giris yapmis ise o zaman
zaten direk kullanici iceri aliniyordu ana sayfaya girmesine izin veriliyordu
  useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
         navigate("/");
        }
       },[data]);
  Ama yok token i yok ise o zaman login sayfasinin formu ile muhatap olmak zorunda kaliyordu
  Birde register islemini basarili bir sekilde gerceklestiridiginde yine login sayfasina 
  yonlendiriliyordu
  EGER KULLANICI DOGRUDAN ADRES CUBUGU UZERINDEN AUTHENTICATION-KIMLIK DOGRULAMA
  GEREKTIREN SAYFALARA ERISMEYE CALISIRSA NE OLUR?-PRIVATE COMPONENT
  Bir de biz categories,records componentlerini privatecomponent icine alarak
  bu componentleri adres cubugu uzerinden birisi erismeye calisirsa once login olup
  olmadigi, yani tokeni var mi localStore da onun sorgusu yapilyor eger token i var ise o zaman
  kullanici categories e de, records a da giris ini izin veriliyor du, yok token i yoksa o zaman dogrudan
  login sayfasina yonlendiriliyro giris yapilmasi isteniyordu
  Ki zaten menu uzerinden categories, ve records menulerini gorebiliyor ise zaten bu onun giris yapmis
  oldugunu gosteriyor.....
  Menu butonlarini biz react-router-dom daki Link componenti ile
  render edilmeden tiklama ile baska sayfaya veya compnente yonlendirmeyi sagliyoruz
  ki burda da onu yapacagiz....
  BESTPRACTISE...BURAYI COK IYI OKU VE ANLA.....ADVANCE....
  PROBLEMM??????????
  Ancak bir problem yasiyoruz... Link ile baska componente yonlendiriyoruz ama
  component icindeki, datalar gelmiyor cunku yonlendirdgimiz sayfa da yenilenme olmadigi
   icin sayfanin datalari gelmiyor?
   Biz sayfalandirmayi yaparken Route lar araciligi ile url ayarlamasini da yapiyoruz
   ve Link araciligi ile de bir componentten baska bir componente yani bir sayfadan bir url den 
   baska bir sayfaya url e render olmadan gecis yapabiliyoruz ve iste sayfalarimizin url
   lerine de yine react-router-dom dan gelen useLocation araciligi ile erisebiliyoruz
   const location = useLocation();
   Ve Link elementlerine data da gecebiliyoruz, data yi da link ile yonlendirdigmiz componente
   gonderebiliyoruz(state objesi icinde gondermeliyiz react-router-dom6 ile birlikte),
    ve o gonderilen datayi da yine useLocation yolu ile alabiliyoruz
   bu sayede Link ile gidilen componenet veya sayfada nerden gelindigi tespit edilebilir
   Biz useLocation araciligi ile su an hangi url de oldugumuzu alabiliyoruz.... 
YUKARDA,
ORNEK-LINK ILE DATA GECME,DATA GONDERME...
<Link to="/onboarding/profile" state={{ from: "occupation" }}>
  Next Step
</Link>
Now the only question that remains is, how do we get access to the data on state so we can update the UI based on it? To answer that, we need to look at the component that's being rendered at the /onboarding/profile route. For our example, let's call it Profile.

import { useLocation } from 'react-router-dom'
function Profile () {
  const location = useLocation()
  const { from } = location.state

  return (
    ...
  )
}
Anytime you pass data along via the state property, that data will be available on the location's state property, which you can get access to by using the custom useLocation Hook that comes with React Router.

Also, if the user were to use their browser's "Back" and "Forward" buttons to navigate through their route history, the state that we passed in would remain intact. That way, if they changed their mind about one of their selections, they can click "Back" without losing any of the state from their previous choices.

SIMDI PROBLEMIN COZUMUNU IYI ANALIZ EDELIM!!!
AppHeader componentinde
  <Item key={"/categories"}><Link to="/categories" state={{ from: "appheader" }}> Kategori</Link></Item>

  Category componentinde.
  diger comonentten gonderilen, data yi typescriptte nasil aliyoruz dikkat edelim!!!
  ONEMLI BIR BESTPRACTISE DIR...

interface locStateType {
  from:string;
}

const Category = () => {
  const location=useLocation();
  BURDA ? NOTASYONU ILE EGER FROM GELMEZSE UNDEFINED DAN DOLAYI
  COMOPNENT PATLIYOR ISTE ONU ? ILE KURTARIYORUZ EGER DATA VAR ISE
  STATE.FROM U VER YOK STATE DE FROM DIYE BIRSEY YOK ISE O ZAMAN
  HIC STATE UZERINDEN FROM U GOSTERME DEMEKTIR VE BIZI COK CIDDI BIR
  PROBLEMDEN KURTARIYOR.....
  const from=(location.state as locStateType)?.from;
  console.log("from: ",from);//Burasi eger bu comonente Link yolu ile
  AppHeader componentinden menu butonuna tiklanarak gelirse from
  degiskeni dolu olacak yoksa bos oalcak bu sayede biz AppHeaderdan
  Categories linkine tiklandigini anlayacagiz ve de ordan gelince burda bir render
  olussun istiyoruz
FROM U GORDUGUN ANDA, GELDIGI ANDA SAYFAYI RENDER ET DIYORUZ VE
PROBLEMI COZMUS OLUYORUZ...
  useEffect(()=>{
  },[from])
  

     BESTPRACTISE....
  const location=useLocation();
  const {pathname}=location;
  console.log("pathname: ",pathname);// /categories gelecek
  Biz bu pathname araciligi ile hangi menunun aktif oldugunu bulabiliriz
  Ve ona gore de sayfadaki, aktif menu ornegin arka plani aktif oldugunu
  isaret edecek bir background color verilebilir
  Alttaki Menu attribute lerinden  selectedKeys={[pathname]}
  icerisine pathname i koyarsak pathname yani o an icin uzerinde aktif
  olunan url hangisi ise onun arka plan rengini mavi yapiyor....
       
*/
const AppHeader = () => {
  const {data,loading,error}=useSelector((state:AppState)=>state.user);
const dispatch=useDispatch<UserDispatch>();
  useEffect(()=>{
    dispatch(isLoggedin());
  },[])

//ADRES CUBUGU UZERINDEN DINAMIK BIR SEKILDE O AN UZERINDE BULUNDUGUMUZ
//ADRES UZERINDEN MENU BUTONLARINDAN UZERINDE OLADUGMUZ ADRESE BIZI YONLENDIREN 
//HANGISI ISE ONU AKTIF GOSTERME PRATIGI---BESTPRACTISE......
  //BESTPRACTISE....USELOCATION ILE UZEIRNDE BULUNUGUMUZ URL I
  //BELIRLEYEREK MENU ELEMANLARINDAN HANGISI UZEIRNDE ISEK
  //ONU AKTIF GOSTERMEK,ARKA PLAN RENGINI FARKLI VEREREK.....

  const location=useLocation();
  const {pathname}=location;
  console.log("pathname: ",pathname);// /categories gelecek
  //Biz bu pathname araciligi ile hangi menunun aktif oldugunu bulabiliriz
  //Ve ona gore de sayfadaki, aktif menu ornegin arka plani aktif oldugunu
  //isaret edecek bir background color verilebilir
  //Alttaki Menu attribute lerinden  selectedKeys={[pathname]}
  //icerisine pathname i koyarsak pathname yani o an icin uzerinde aktif
  //olunan url hangisi ise onun arka plan rengini mavi yapiyor....

//BESTPRACTISE-BILMEK ONEMLI....
//Link elementini kullairken react-router-dom dan, eger asagidaki gibi <Menu.Item></Menu.Item> 
//javascript jsx elementi icerisinde bulunuyor ise Link elemntini biz en icerde kullanmamiz 
//gerekiyor....
  return (
      <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
     selectedKeys={[pathname]}
    >
      {data.username 
      ? 
      <Fragment> 
     <Menu.Item key={"/categories"}><Link to="/categories" state={{ from: "appheader" }}> Kategori</Link></Menu.Item>
      <Menu.Item key={"/records"}><Link to="/records">Harcama Kayitlari</Link></Menu.Item>
      <Menu.Item key={"/logout"}><Link to="/logout">Cikis</Link></Menu.Item> 
      {/*  //BU ARADA LOGOUT SAYFASININ BU COMPONENTI GORMESI ICIN, APP.TSX DE ROUTE LAR ICINDE BIZIM LOGOUT U
      YERLESTIRMEMIZ GEREKIYOR
           <Route path="/logout" element={<Logout />}/>
      */}
      </Fragment>
      :
      loading ? null :<Menu.Item key={"/login"}><Link to="/login">Giris</Link></Menu.Item>
       }
     
    </Menu>
  </Header>
  )
}

export default AppHeader;