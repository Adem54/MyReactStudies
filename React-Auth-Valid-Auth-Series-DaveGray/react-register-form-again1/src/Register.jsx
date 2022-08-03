import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";

//REGULAR EXPRESSIONSLAR, BIZIM KULLANICILARI BELLI NOKTALARA KADAR SINIRLANDIRIP DOGRU YONLENDIREBILMEMIZ ICIN BIZE COOOK YARDIMCI OLUR...BU COOK ONEMLIDIR...
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//Bu, ^[A-z]=> kucuk harf veya buyuk harf ile, baslasin, ama sadece A-z arasi karakter girebilsin demektir..yani gidip sayi veya ozel sembol ile baslayamamsi icin yapilior, cunku, kullanicinin ismi sayi veya ozel karakter ile baslamiyor..
//[A-z0-9-_]  bu demek oluyor ki, username A-z arasindaki harflerden, ayrica 0-9 arasi rakalmlardan ve de _ alt cizgiden olussun yani bunlarin disindaki herhangi bir karakter vs kullanamasin
// {3,23} 3 ile 23 karakter arasi olsun diyoruz ki kullanici gelip de oraya bir ton uzun uzun birseyler yazmasin
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//Burda da en az 1 kucuk harf, en az 1 de buyuk harf demek, ve en az 1 digit(0-9 arasi sayi) ve 1 tane [!@#$%] bu ozel karakterlerden birtanesi ve de en az 8 en fazla 24 karakter olmali
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef(); //user input icin, ve kullanicinin inputa focus olmasi, component yuklendiginde kullancinin inputa focus olmasi icin kullanacagiz...
  const errRef = useRef(); //Bunu da, error, hata alirsak, odagi ona gore kaydirmak  icin

  //user
  const [user, setUser] = useState(""); //bu inputtaki degeri alacagimiz state
  const [validName, setValidName] = useState(false); //Bu girilen degerin valid olup olmadigini kontrol edecegimz state
  const [userFocus, setUserFocus] = useState(false); //Kullanicinin input a focus olup olmadini kontrol ediyor burda da

  //Password
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //passwordu confirm yapip bir daha girmesi istendiginde
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //errorMessage, success mi degil mi
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //Bu useEffect ise userName i valide etmek icin, kullanacagiz..yani user state ine baglaycagiz,
  //Once hazirladigmiz patterne girilen data uygun mu degil mi onu check ederiz ve bize uygun ise true, degil ise false gelir...
  /*
  let text = "The best things in life are free";
let pattern = /x/;
let result = pattern.test(text); Sonuc false, ama ornegin text stringi icinde olan herhangi bir harf veya kelime girersek o zaman true gelecekti...
  */
  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log("result: ", result);
    console.log("user: ", user);
    setValidName(result);
    //Eger kullanici bizim patternimize uygun bir data girdi ise o zaman valid state i de ordan gelecek sonuca bagliyoruz direk....
  }, [user]);
  //user ne zaman degisse anlik olarak, user in degisimini takip edecek ve de her degistiginde, otomatik olarak, bir kez daha onun bizim patternimize uyup uymadigini kontrol edecek....
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    console.log("result: ", result);
    console.log("pwd: ", pwd);
    setValidName(result);
    const match = pwd === matchPwd; //match degiskenini paswwordumuz ile, matchPassword yani, passwordu onaylama inputu ile karsilastirmasindan gelen boolean sonucu veriyoruz match e ki, sonra da bu match i , setValidMatch e atayarak, password onaylanmasi state ini de burda dogrudan, password ile conformastion passwordun stateinin karsilastirmasi sonucunu vererek, mathcPasswordu de otomatik olarak, cek edip sonucu  da setMatchValue ye girmis oluyoruz....
    setValidMatch(match); //Burda da paswword ile ayni kurallara uyuyor ise o zaman, confirm passwordu be valid hale getirmis oluyoruz...
  }, [pwd, matchPwd]);
  //mathcPasswordu, normal passworde bagladik direk confirm password dogrudasn password un durumuna gore sekil alacak....Ornegin , biz once passwordu ve mathcPasswordu girdik ve her ikiside olumlu dogru validation a uygun girdik, sonra gittik normal passworun bir kac karakterini sildik ve validation a uymayacak hale getirdik, iste o zaman mathchPassworde patlayacak...
  //Burda anlik olarak, pwd ve matchPwd yi kontrol altina aliyoruz...Coook onemli bir bestpractise...useEffect bizim icin cok harika isler cikariyor useEffecti kullanmayi cok iyi bilmeliyiz....
  //Anlik olarak her degistiginde, pwd ve matchPwd yi kontrol etmis oluyoruz....bu sekilde...

  //Bir de error message icin, useEffect kullanmamiz gerekiyor...
  //Eger error message uygun oldugunda gosterilir ise ve ondan sonra herhangi bir input umuzda degisiklikl oldugu anda hemen o hata mesajini sifirlayalim ki, kullanici, tekrar inputlarda bir degisiklik yapiyor hata yaptiktan sonra demektir, ve hala kullaniciya hata mesaji vermenin anlami yok....
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  /*
   useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

  */

  const canSave =
    Boolean(validName) && Boolean(validPwd) && Boolean(validMatch);
  //!validName || !validPwd || !validMatch ? true : false

  //event objesi, paramtre olarak default geliyor bunu gelip de illa, handleSubmit i form attributunde paramtre olarak vermemize gerek yok..
  //   <form onSubmit={handleSubmit}> bu zaten kendisi her turlu, default olarak gelecektir....
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if button enabled with Js hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      //Her ikiside regex e uymuyor ise...
      setErrMsg("Invalid Entry");
      return;
    }
    //Burda olur da bizim validation kurallarimiz, dan gecilmemesine ragmen, eger buton enable olmus ise o zaman da burdan gecemeyecek, yani hicbirsekilde bir aralik bulamamasi gerekiiyor...cok onemli bu detayi dusunebilmek..
    //Burda kullanciiyi invalid information gondermekten kurtariyoruz

    //Burda apiye data gonderilecek ve response olarak api den error mesaji veya success mesaji gelecek normalde onu kullanacaggiz ama biz su anda
    //elimizde bir back-end api yok ondan dolayi biz direk success mesaji almis gibisinden ve user, pwd yi tekrar almis gibi, manuel olarak islem yapiyoruz

    // console.log(user,pwd);
    // setSuccess(true);
    try {
      //back-end eger user olsa ve biz de burdas datayi userName olarak tutmus olsa idik o zaman user:userName diye gonderirdik,back-endin bekledigi proprty isimlerine riayet etmemiz gerek bu cook onemlidir...
      //Ayni mantik ta eger biz burda password isminde tutsa idik statei  o zamanda pwd:password seklinde gonderirdik
      const response = await axios.post(
        REGISTER_URL,
        { user: JSON.stringify(user, pwd) },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      /*
            If you pass a JavaScript object as the 2nd parameter to the axios.post() function, Axios will automatically serialize the object to JSON for you. Axios will also set the Content-Type header to 'application/json', so web frameworks like Express can automatically parse it.
            
            Axios automatically serializes `{ answer: 42 }` into JSON.
            const res = await axios.post('https://httpbin.org/post', { answer: 42 });
            res.data.data; // '{"answer":42}'
            res.data.headers['Content-Type']; // 'application/json;charset=utf-8',
            This means you normally don't have to worry about serializing POST bodies to JSON: Axios handles it for you.
            With Pre-Serialized JSON
            If you happen to have a serialized JSON string that you want to send as JSON, be careful. If you pass a string to axios.post(), Axios treats that as a form-encoded request body.
            The solution is easy: make sure you set the Content-Type header if you pass a pre-serialized JSON string to axios.post().
            const json = JSON.stringify({ answer: 42 });
            const res = await axios.post('https://httpbin.org/post', json, {
            headers: {
                 Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
            });
            res.data.data; // '{"answer":42}'
            res.data.headers['Content-Type']; // 'application/json',
            */
           console.log(response.data);
           console.log(response.accessToken);
           console.log(JSON.stringify(response)); 
           setSuccess(true);
           //clear input fields...maybe, here isLoading false
    } catch (err) {//Ornegin inertet baglantisi koptu buraya dusecek kod, kodu handle edilmesi onemli...
        if(!err?.response){
            setErrMsg("No Server Response");
        }else if(err.response?.status===409){
            setErrMsg("UserName Taken");//Belkide ayni isimde bir kullanci ismi girdi...
        }else{
            setErrMsg("Registration failed")
        }
        //Burda da error mesajini yazdirdimgz alana focuslansin istiyoruz...
        errRef.current.focus();
    }
  };
  return (
    <>
      {/*Success mesajimzii ayarlayacagiz burda */}
      {success ? (
        <section>
          {" "}
          {/*Eger submit basarili olur ise o zaman zaten basari mesaji gosterilecek sadece ekranda, form yerine */}
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          {/*Eger hata ortaya cikarsa o zaman p elementi icine hata mesajimizi yazariz...
     Birde biz dogrudan DOM a erismek istedigmzde ve erismek istedigimz elemente attribute olarak, ref={errorRef} seklinde kullarak o elemente useEffect veya bir call back icerisinde errRef.current ile erisebiiriz....
      */}
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              {/*burasi da olumlu iconu ok iconu koyar, kullanici validName girmeye basldigi andan itibaren... */}
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
              {/*burasi eger x iconu koyar, kullanici input girerken, input hatali oldugu zaman */}
            </label>
            <input
              type="text"
              id="username"
              ref={userRef} //bizim bu elementi direk dom da kullanabilmek icin useRef i attributunde kullanmamz gerekir ki gidip userRef.current.focus diyerek focus ozelligine mudahale edebilelim...
              autoComplete="off"
              //bir onceki, userName i suggestion olarak vermemesi icin kullaniyoruz autoComplete="off" u
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : true}
              //The aria-invalid state indicates the entered value does not conform to the format expected by the application.
              // The aria-invalid attribute can be used with any typical HTML form element, and is not limited to elements that have an ARIA role assigned.
              /*The attribute should be set with JavaScript as a result of a validation process. If a value is determined to be invalid or out-of-range, set aria-invalid="true" and tell the user there is an error. For better user experience, provide suggestions for how the error can be corrected. Do not set aria-invalid="true" on empty required elements until after the user attempts to submit the form. They may still be working on filling it out. */
              aria-describedby="uidnote"
              /*The global aria-describedby attribute identifies the element (or elements) that describes the element on which the attribute is set. 
            Bu accessibility icin cook onemlidir...screen input e okumaya basladiginda, once type=text i okur ardindan aria-invalid i okur sonra da aria-describeby i okur ki input hakkinda description vermek icin, screen reader okumasi icin...
            */
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {/*onBlur, kullanici inputa focus olmaktan ciktigi anda tetiklenecek
            onFocus da kullanici inputa focus oldugu anda tetiklenecek
            */}
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              } //kullanici focus olmus,inputa deger girmeye baslamis ve de validName girmis ise de offscreen ile instructions i gostermiyoruz, className de  yazdgimz positon-absolute , left:999 diyerek mesaji ekranda gozukmeyen yere gonderiliyor
            >
              {/*kullanici henuz inputa bir deger girmeden, instructons i gostermenin anlami olmadigi icin userState de birseyler girilmeye baslandiktan sonra, yani kullanici evet artik inputu doldurmaya basliyor ondan sonra instructions lari gosteririz... */}
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              //type-password oldugu icn zaten bunda autocomplete ozelligi gelmiyor ondan dolayi da off yapmaya gerek yok..
              //Burda referans da kullanmiyoruz, cunku bu inputa component yuklendiginde focus olmaycagiz zaten username e focus olunuyor...
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              //Burda kullanici pasworde focuslaninca ve password valid olmadigi zaman, instructions lari goster demisi burda username den farki, input password alanina kullanici herhangi bir data girmeden focuslaninca hemen instructions lari gosterecek, cunku burasi pasword burda hemen gostermesi kullanici deneyimi icin daha isabetlidir...
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
                //onaylama passwordu, valid degil ise ve mathPwd ile confirm inputuna data girilmis ise o zaman, invalid oldugunu gosteren, x iconu goster yoksa gizle...
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              //aria-invalid, ve aria-describedby bunlarin varlik sebepleri screen-reader chrome eklentisi ile, eger kullanici, input icindeki data yi girerken hangi descriptionlar veya hangi validation kurallari var ise onlarin da ekran okuyucu tarafindan okunmasi icin veriliyor ve de onlar, ne zaman okunmasini da yine, aria-invalid ile ayarlioruz yani, aria-invalid true olunca galiba, kullaniciya bilgi vermenn gerekliligi ok olmus olyor gibi
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            {/* Ozellikle aria-invalid ve aria-descirbedby ozelliklerinin accesibility ile nasil bir faydasi oldugunu gormek icin chrome da screean reader extension i ekleyip o sekilde form input alanlarini girerek test yapabiliriz.... */}
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button disabled={!canSave}>Sign Up</button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
/*
aria-live="assertive" should only be used for time-sensitive/critical notifications that absolutely require the user's immediate attention. Generally, a change to an assertive live region will interrupt any announcement a screen reader is currently making. As such, it can be extremely annoying and disruptive and should only be used sparingly.
*/
export default Register;
