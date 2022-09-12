import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {
  const { loginWithRedirect, logout, isAuthenticated,isLoading,user } = useAuth0();
  console.log("isAuthenticated: ", isAuthenticated);
  console.log("user: ", user);
  console.log("isLoading: ", isLoading);
  
  return (
    <div className="App">
      {isLoading ? <h2>Loading....</h2> :
      isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
      {
        isAuthenticated && <div>
          <img style={{borderRadius:"50%",marginTop:"2rem"}} src={user.picture} alt=""/>
          <h2>{user.name}</h2>
          <p>{user.email}</p>

        </div>
      }
    </div>
  );
}

export default App;

/*
App component
Burda bir login butonu olusturuyorz ve login butonun basilinca bir fonksiyon u tetiklemeiz gerekecek
Bu fonksiyon bize Auth0Provider dan gelecek
const {loginWithRedirect}=useAuth0();
yukledimgiz Auth0 paketi bize useAuth0() hookunu ve yani sira bircok fonksion vs kullanma firsati veriyor
 <button  
      onClick={loginWithRedirect}
      >Login</button>

      Simdi artik login butonuna kullanici tiklayinca, kullaniciyi bir login sayfasina  yonlendiriyor
      Yani bu login sayfasi nin hersey icerisinde yer aliyor form,input vs
      Kullanicinin giris yapabilecegi regiser,signup olabilecegi, signin olabilecegi sayfa geliyor artik karsimiza
      Simdi orda google hesabimiz uzerinden giris yapacak olursak daha dogrusu register ve login olurska o zaman
      eger bir problem cikmaz islem basari ile gerceklesirse bizi tekrar login butonmuzun oldugu App.js componentimize
      yonlendirecek bu herseyin yolunda gittigini gostgeriri bize
      Ancak biz Login olduktan sonra artik Login butonunu gostermek istemiyrouz onun yerine Logout cikis butonu olusturup
      eger login olmus isek logout butonu gozuksun istiyoruz, logout olunca da login butonu gozuksun istiyoruz
      Logout islemi icinde bize yine, logout isminde bir methodumuz useAuth0 hookundan method geliyor
     
     function App() {
  const {loginWithRedirect, logout  }=useAuth0();
      <button   onClick={loginWithRedirect} >Login</button>
      <button   onClick={logout} >Logout</button>

      Simdi biz, tabi login olup olmadigmiz i da kontrol edecek degerlere ihtiyacimz var ki biz login olmus isek logut butonunu gosterip
      login butonunu gostermeyelim, logout olunca da login butonunu gosterip, logout butonun gostermeyelim
      yine Auth0 hookundan gelecek olan isAuthenticated degerini alip kullanacagiz
      isAuthenticated degeri bize boolean bir sonuc donduruyor
      Eger login olmus isek isAuthenticated=true gelir yok login olmamis, ise kullanici isAuthenticated=false gelecek

       {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}

      bu sekilde kullanarak login olunmus ise logout butonu, logout olununca da login butonu gosterilebilir
      Simdi artik logout a basarak cikabiliyoruz ve login e basarak giris hesabimizi secerek de giris yapabiliyoruz
      Biz login-logut islemlerini test ettik ve sunu farkettik login oldgumuz zaman logout butonu geliyor ama
      cok kisa bir sure icin bize, login butonu gozukuyor bunu da onlemek icin yine bize useAuth0 hookundan gelen
      isLoading degeri ile login butonunun gorunmesini engelleyebiliriz

       return (
    <div className="App">
      {isLoading ? <h2>Loading....</h2> :
      isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={loginWithRedirect}>Login</button>
      )}
    </div>
  );

  Birde bize yine auth0 hooku uzerinden dondurulen kullanicin bilgileri var, kullanicin giris bilgileri
  normalde bunlar veritabaninda tutulup gonderilyor, burda da aynnen o sekilde yapiliyor giris yapmis olan
  kullanicinin giris li oldugunu kullanci bilgilerine erismesi ile de anlasilabilir
  useAuth0 hooku icine user objesi olarak gelecektir

   const { loginWithRedirect, logout, isAuthenticated,isLoading,user } = useAuth0();

user objesi asagidaki datalardan olusmaktadir
  email: "adem5434e@gmail.com"
email_verified: true
family_name: "Erbaş"
given_name: "Adem"
locale: "no"
name: "Adem Erbaş"
nickname: "adem5434e"
picture: "https://lh3.googleusercontent.com/a/AItbvmkGSDMIQz6xHuuDa0MIIEj5zFXYFXeuZUJe8IH-=s96-c"
sub: "google-oauth2|100309524437861847951"
updated_at: "2022-09-08T23:18:58.226Z"


sub: "google-oauth2|100309524437861847951" bu ilk deger hangi servisi kullanarak giris yaptigimz | den sonraki data ise bizim 
google daki id mizdir
Bu bilgilere eristigmze gore biz artik kullanici bilgilerinden olusan component olusturarak veya dogrudan App.js de kullanici
bilgilerini gosterebilirz...

Datalari en altta gosterebiliriz

{
        isAuthenticated && <div>
          <img style={{borderRadius:"50%",marginTop:"2rem"}} src={user.picture} alt=""/>
          <h2>{user.name}</h2>
          <p>{user.email}</p>

        </div>
      }

      Giris yaptigmizda bu bilgilerei user objesinden alacagiz ama cikis yaptimgzda user artik undefined olarak gelecek

*/
