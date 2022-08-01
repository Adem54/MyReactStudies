import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);//Authentication datamiz i biz, context te tutacagiz, ondan dolayi da context icerisinde, bir
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    //Autehnticate olmaya calistiginda,  yani su an burda biz Login islemi yapacagiz, ve burda prosess su sekilde isleyecek, kullanici daha once register olmus yani verilerii veritabanina kaydedilmis ve basarili bir sekilde, register oldugu zaman kullaniciya bir token gonderiyor api-back-end ve kullanicinin bu tokeni cookies lerde bir yerde tutuyor, dolayisi ile, simdi login olacak tekrar yani authenticate olacak, giris yapilacak, web-api niin bazi sinirlamalar getirdigi datalara, iste o datalara erismemiz icin bizden web-api token bilgisi bekleyecek ve biz login isleminde de elimizde bir token ile gitmemiz gerekecek...
    const [success, setSuccess] = useState(false);
    //Normalde success login olunca da navigate araciligi ile kullanici izin verilen sayfaya girmesi saglanacak...bu belki ana sayfa olur veya baska bir sayfa

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {//User eger userState ve passowrdState i degistirir ise, yani hata mesaji aldi kullanici ve ardindan gitti username ve passwordu degistiriyor o zaman bizde hata mesajini silelim artik, kullanici yeni bir asamaya gecti ve tekrardan, inputlara kullanici adi ve password giriyor demektir, bu useEffecti de user, pwd ye baglariz ki, biz oralarda islem yapildiginda erro mesaj i sifirlayabilelim...
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),//Burda back-end in bekldigi formatta datalari gondermek gerek, yani back-endeki obje de eger propertiesler ornegin, userName ise o zaman userName:user, ve back-endde data lar password:psw seklinde gonderilmelidir
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
             /*
             Biz burda 
             {"roles": [2001,1984],
            "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"} (bu sekilde uzun bir accesstoken alacagiz..)
            }
            Ve bu accesstoken i aldiktan sonra artik ornegin, api ye bundan sonra api nin sinirlandirdigi datalara ve endpointlere yapacagzimi requestlerde token imiz ile birlkte gidecegiz, tabi biz, token i guvenli biyerde tutmamiz gerekkiyor ki authenticate talep edilen requestlerde token imiz ile requesti gondeririz ve o sekilde dataya erisebilmis olacagiz.,,,token i header icerisinde godneririz...
             */   

            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            //BAck-end bize bir accesstoken ,uretip gonderecek...
            const roles = response?.data?.roles;
            //Birde, api bize data objesi altinda bir dizi olarak roles, yani spesifik rolleri gonderecek...admin,editor,teacher,studen..gibi..
            //roles dizi olmali, belki dizi icinde farkli rolleri olan sayilar da olabilir, farkli farli pozisyonlarda calisan gorevlilere farkli yetkliler verilebilir...
            //Ve back-endin response ettigi data lardan olusan objeyi biz destructing ile store umuz olan ve Context te tuttugmuz setAuth ile auth icerisine gondderiyoruz....
            setAuth({ user, pwd, roles, accessToken });//Api den gelen bu datalar global-contexte kaydedilir
            //Login islemi basarili olursa biz bir token bekleriz..
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {//Bu internet falan gittigi zaman problem olacak bir durumdur....
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            //Burdaki mantigi iyi kavrayalim, bu su demek oluyor biz olabilecek hatalari son kullaniciya, anlamli bir sekilde donebiliriz ve bu sekilde daha iyi bir user-experience sunabiliriz...bu onemlidir, bunmlarin disinda da hata mesajlari olabilir bu o anki yaptigmiz uygulamanin duurumuna gore ve kulllaniciya bu hatalari nasil sunmak istddigmize bagli olarak cesitlendirilebilir...
            errRef.current.focus();
            //Hata mesajini yazdigmiz yere focuslansin ki kullanici nin da dikkatini ceksin...
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    {/*Bir hata olustugu zaman, login isleminde, api den donen hata mesaji sayfanini en ustunde gosterilecek... */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* aria-live="assertive">{errMsg} bu kod  screen-reader chrome eklentisinin sayfaya gelir gelmez bu paragrafa focuslanmasini saglar...*/}
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}//Bu cok onemlidir, controlled form, controlled input olmasi icin cok onemldir...
                            required//Kullanici kendi username ve passwordunu bilmeli cunku sign-in, login yapiyor demekki daha once register olmus kullanici
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                        {/*Burda kullanici ornegin, username ve passwordun her ikisini de doldurana kadar butonu pasif olmasi islemi yapilmadi, cunku burda ornegin, kullanici eger input alanlarindan birini bos birakip singn in e basinca, hata dogrudan post-api den gelecek ve ornegin bize api den catche dusen hata mesaji  Missing userName or password, gibi bir mesaj gelecek kullaniciya bu gosterilebilir...ki bunlari zaten axios reques isleminde catch icerisinde yaptik...orayi iyice inceleyebiliriz....*/}
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login

/*
REGISTER-LOGIN-MANTIGI BACK-ENDDE NASIL ISLER...
        1-ONCE SISTEME KAYIT OLUYORUZ-REGISTER															
        https://localhost:5001/api/users-POST REQUEST															
															
         BODY YE ASAGIDAKI BILGILER GIRILIR-REQUESTTE GONDERILIR															
            {															
        "firstName": "Zehra",															
        "lastName": "Erbas",															
        "email": "zehra5434e@gmail.com",															
        "password": "Zehra5434@"															
             }															
           RESPONSE:  200OK															
       2-SISTEME LOGIN OLARAK TOKEN ALACAGIZ      															
       https://localhost:5001/api/users/connect/token-POST REQUEST															
       															
       BODY YE ASAGIDAKI BILGILER GIRILIR-REQUESTTE GONDERILIR															
      {															
          "email": "zehra5434e@gmail.com",															
          "password": "Zehra5434@"															
      }															
      RESPONSE:{															
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NTY4MzQ3NjMsImV4cCI6MTY1NjgzNTY2MywiaXNzIjoid3d3LnRlc3QuY29tIiwiYXVkIjoid3d3LnRlc3QuY29tIn0.1EYiciNq4O_hzYsPqvVYg3uO0d3se4ZtMAKl7IO4sfs",															
    "expiration": "2022-07-03T10:07:43.3517803+02:00",															
    "refreshToken": "c2c835fd-5289-41b5-ad21-bf002a2edbf6"															
}															
    3-GET BOOKS A TOKEN ILE BIRLIKTE ISTEK GONDER															
    AUTHORIZATION MENUSUNDEN TYPE BERARER TOKEN I SEC VE ORADA TOKEN YERINE															
    RESPONSE OLARAK DONEN TOKEN I YAPISTIR															
    BU HEADERS ICINDE KEY OLARAK AUTHORIZATION VE KARSISINA DA BEARER ILE BASLAYAN YANINA DA GONDERDIGMIZ TOKEN I YERLESTIRIYOR															
    https://localhost:5001/api/books															
    istegini token ile birlikte gonderince artik books datalarimiza token imiz ile birlike erisebiliyoruz															
Bizim webapimiz hem bir identityprovider-kimlik saglayici olarak davrandi hem de client olarka davrandi															
Token operation islemlerinde bir token olusturma, token provide etme yeri idi, burayi identity-provider olarka yapti															
Ama startup icerisinde de diyoruz ki sana bir token geldiginde, bu jwttoken protokolunde olabilir															
jwttoken in default semasini kullaniyordur ve genel olarak bunlar kontrol edilir diyoruz, sen onu cozmek icin bunu kullancaksin															
diyoruz,Startup da da token i cozmek icin gerekli olan configleri veriyoruz															
 yani esasinda hem token i webapimiz uretiyor hem de urettigi token i kendisi cozuyor dogruluyor															
 Bunlar aslinda farkli projeler icinde olabilir...,identityprovider ayri bir proje icinde disarda konumlanir															
 PEKI REFRESHTOKEN ILE TEKRAR BIR ACCESSTOKEN NASIL ALINIR ONA BAKALIM															
}															

*/