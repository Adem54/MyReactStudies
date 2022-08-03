import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();//Bu direk context icindeki auth, setAuth datasini icinde barindiriyor ve auth data sina da data, axios da login post isleminden response olarak gelen, token ve roles datalarini barindiriyor
    //auth api den roles=[2001,1984,5150], [2001,1984] seklinde bir data olarak gelecektir...
    const location = useLocation();
    //Bu da harika bestpractise, Navigate ile ayni sayfadan baska sayfaya Redirect, yonlendirme yaptimgzda, yonlendirdigmz sayfada gelen componentin hangi sayfadan geldignin anlasimlasi icin location gonerilirse zaten direk url, veya pathUrl den url adresi uzerinden hangi sayfadan geldigi de anlasilacaktir...
    return (
        //api den gelen auth.roles icindeki role numaralarini tek tek gezip, kullanicinin girmek istedigi sayfada gerekli olan yetki izni-rolu nun kullanicinin yaninda getirdigi auth.roles icerisinde var mi, yani kullanici girmek istedigi sayfanin yetkisini yaninda getirmis mi onu kontrol ediyor...
        auth?.roles?.find(role => allowedRoles?.includes(role))//Iki ayri dizi icinden elementler karsilastiriliyor....ONEMLI
            ? <Outlet />//Outlet children i temsil eder...Yani RequiredAuth ornegin App.js icinde 3 farkli yerde 3 farkli children ile kullanildi hangi sine gidilirse onun children ini gosterir bu Outlet iste, yani bize ciddi bir dinamiklik katiyor aslinda...
            : auth?.user //Eger kullanici login-post request yapmis ve ordan ornegn token ini almis user bilgileir geri gonderilmis ise ama hic bir role sahip degil ise o zaman kullanicya unauthorized, sayfasina yonlendirilir yok kullanicinin elinde user bilgisi de yok ise demekki bu vatandas, login de olmamis o zaman da login sayfasina yonlendirilir
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
//SADECE TOKEN BAZLI-LOGIN ISLEMI OLSA IDI O ZAMAN ASAGIDAKI GIBI OLACAKTI...
//EGer hicbir rol durumu falan olmasa idi ve sadece kullanici login olmus mu o sorgulanacak olsa idi, o zaman da zaten login-post isleminde api den, user bilgiliri ve token geliyor bizim user bilgisni sorgulamamiz da yeterli olacakti.. biz burda sadece sunu sorgulayacaktik kullanici bilgileri  var ise, o zaman <Outlet/> yok ise o zaman da Login sayfasina yonlendirecektik....Sonrasinda da ornegin Outlet olarak hangi, ccomponente gidecek ise orda ihtiyacimiz olan, data ya token ile birlikte yeniden, api request gonderilip datalara erisilecektir...
/*
auth?.user  ? <Outlet/>
                : <Navigate to="/login" state={{ from: location }} replace />

Burda ornegin zaten kullanici, butonlar uzerinden gitmek istedigi zaman ona, login olmadan, HOme,Editor,Admin,Lounge sayfalarina giden link ler butonlar gosterilmez ama, diyelim ki bu kullanici gitti url uzerinden, ana domain veya url un devamninda http://localhost:3000/home bu sekilde bir url e dusmek istedi iste, bu tarz durumd da bizim, home page imiz korumali oldugu icin, ondan dolayi, tabi ki onu yine Protected Route olan, RequreAuth karsilayarak once bir sorgulamassini yapacak ve bakacak elinde, user datasi var mi, token i var mi eger var ise, buyur gec diyecek ve girmek istedigi home sayfasina girecek yok eger ki user i yok, token i yok o zaman hayir deyip o tekrar login e yonlendirilerek, giris yapmasi istenecek.....

    App.js de de o zaman sadece su sekilde yapacaktik...rol-bazli olmayan sadece token alarak,login ile giris yaparak erisilebilen islemlerde 
    <Route element={<RequireAuth/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="editor" element={<Editor/>}/>
    <Route path="admin" element={<Admin/>}/>
    <Route path="/lounge" element={<Lounge/>}/>
    </Route>            
*/
export default RequireAuth;

/*
    const { auth } = useAuth();//Bu direk context icindeki auth, setAuth datasini icinde barindiriyor ve auth data sina da data, axios da login post isleminden response olarak gelen, token ve roles datalarini barindiriyor

    Login compnenti icindeki post-request islemin e bakacak olur isek eger...Gelen responsu setAuth icine token ve, roles olarak ayri ayri aliyoruz...
    Api den roles olarak gelen data su sekilde olacaktir muhtemelen roles=[2001,1984,5150] gibi bir data olacaktir...
    App.js icerisinde de bu rolleri, yetkilerii olan kullanicilarin erisebilecegi componentler RequiredRoute ile sarmalanmis olacaktir  ki bu ozel yetki ile girilebilen componentlere herkes oyle elini kolunu sallayarak girmesin ve bu componentler korunmus olsun. Tamam ama yetki , ve ozel role ile girilecek olan bu componentlerin hangi role hangi yetkiye sahip olan kullanici hangi componente girebilme izni olabilecek, iste bunu da dogrurdan tek tek, RequiredRoute ile koruma altina aldigmiz yetki ile girilecek componentler icerisinde props ile hangi yetki ile girilebilecegini gonderisek o zaman iste, zaten api den gelen yetkileri useAuth dan aliyoruz, kullanici yetkiye ihtiyaci olan componentlerden herhangi birini tiklar veya adresten oraya dusmeye calisirsa, onu direk RequiredRoute karsilamis olacak....ve ondna sonra da ora da cek edilecek bu kullanici api den hangi role ile gelmis ona bakilir
    Bu ise back-end de de su sekildedir, bir kullanicinin rolu ne ise o en basta bellidir ve bu web-sitesinin tamamini yoneten yoneticiler tarafindan veritabanina, hangi kullanicilar hangi rollerde olacak ise onlarin register olmalari saglanir ya da onlar register olduktan sonra onlarin rollerini, web-sitesi yoneticileri veritabanina kaydeder ki bu vatandaslar da web-sitesi yonetiminde verilen gorevleri yapabilsinler ornegin adam editor dur edit etme yetkisi olmasi gerekir o adama edit rolu yetkisi verilir ki adam da gitsin ekleme, silme, updat etme isleri ile ugrassin yani sekilde adam admin ise ve yapmasi gereken isler var ise , adamin admin isini yapabilmesi icin erismesi greken ornegin admin sayasina erismesi gerekir ve en bastan da adamin admin rolune sahip olmasi gereki ki veritabaninda, bu adam login oldugu zaman bu adama ozel rolu ile birlikte gelsin, response ve de bu da front-end de kullanilabilsin...... 

Front-end de de back-end den kullanici hangi roller ile gelebilecegi, muhtemlen api dokumantasyonunda verilecektir ki front-end ile ugrasan kisi bunu bilsin ve ona gore boyle bir obje olustursun ve bunlari, da yetki ve ozel izin ile girilmesi gereken Protected Route, componentlere props olark versin....
    const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}
try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
*/