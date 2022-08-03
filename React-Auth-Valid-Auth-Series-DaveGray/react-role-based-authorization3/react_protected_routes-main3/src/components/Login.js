import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  //Kullanimi daha kolay ve daha temiz yapmis olyoruz bu sekilde....Cook guzel bir yaklasim...

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //Nerden gelmis ise oraya gonderiyoruz....
  //BURASI COOK ONEMLI, BURAYI DOGRU ANLAMAK GEREK....
  //Kullanicilar buraya ornegin, gidip korumali sayfalara, edit,admin,home, gibi korumali syfalara izinleri olmadigi halde girmeye calistiklari zaman o url de tabi ki girmek istedikleri sayfalarin url ine ya link e tiklayarak ya da dogrudan url den adres cubundan duserek, gelmek istediklerinde, onlari Protected Route karsiliyor ve onlara post login islemnden sonrakii response ile gelen bilgiler soruluyor o zaman da o bilgilere sahip degil ise yani login olmamis ise,(eger rol bazli degilse yapilan islem o zaman sadece user bilgilere veya token sorulur) o zaman login sayfasina yonlendirilir yani login sayfasina kullanicinin hangi protected page, compojnente gidip da ordan yonlendirildigini bilmek icin, hangi sayfaya girmeye calistigini bilmek icin, useLocation ile RequiredAuth componentinde Login yonldirmesinde gonderilen props u burda aliriz <Navigate to="/login" state={{ from: location }} replace /> ve bu sekilde kullanicinn hangi componente girmek isteyip de Login e yonlendirildigini biliriz sonra da eger kullanici login islemlerni gerceklestirir ise o zaman deriz ki tamam sen artik dogurdan istedgiin sayfa hangisi ise oraya yonlendirileceksin....Yani her giris yapani dogurdan homepage e yonlendirmekten ise eger kullanici dogurdan gelip ornegin editpage e girmek istemis ve logine yonlendiirilmis ise onu edit sayfasina gonderelim ama  yok kullanici ilk defa register olur olmaz login sayfasina geldi ise onu da zaten homepage e dusururuz...

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //api request te sorun oldugu gibi catche duser ondan dolayi, asagiya inemeyecegi icin setAuthe icine hicbir data ekleyememis olur normalde
      // const response = await axios.post(LOGIN_URL,
      //     JSON.stringify({ user, pwd }),
      //     {
      //         headers: { 'Content-Type': 'application/json' },
      //         withCredentials: true
      //     }
      // );
      // console.log(JSON.stringify(response?.data));
      // //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      
      //back-endimz tam calismadigi icin boyle bir simulasyon yapyoruz
      /*const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
} */
      //const roles = [2001, 1984, 5150];//Burda kullanicinin tum rolleri yetkileri var oldgugunu simule etmis olduk ama ornegin
      //Burda su mantigi dogru anlayalim, api den kullaniciya o kullaniciin hangi rolleri var ise, hangi persmission izinleri var ise onlar donecek 
      //roles=[2001,1984] veya roles=[1984,5150] , roles=[5001] seklinde roller donecek....Ornegin, login olmus tum kullanicilara zaten 2001 yani user rolu verilmis olacak,  user izni verilmis olacak...buda onemli, bunu bilmek, yani eger kullanici nin ekstra bir yetkisi yok ise zaten user yetkisi kesin olacak cunku user yetksi login olan herkese verilen bir yetki olmus olacak....
      const roles=[2001,1984]//Kullanicinin sadece editor rolu var, editor sayfasina erisme izni verilmis sadece ona erisebilecek,
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NTY4MzQ3NjMsImV4cCI6MTY1NjgzNTY2MywiaXNzIjoid3d3LnRlc3QuY29tIiwiYXVkIjoid3d3LnRlc3QuY29tIn0.1EYiciNq4O_hzYsPqvVYg3uO0d3se4ZtMAKl7IO4sfs";
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
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
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
