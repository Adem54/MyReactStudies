import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// import useRefreshToken from "../hooks/useRefreshToken";
//useRefreshToken i biz sirf test etmek icin burda kullandik...
//Ama sunu bilelim normal token suresi bitince refresht token ile biz bir request gondeririz refresh token endpointine

const Users = () => {
  //  const refresh=useRefreshToken();
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  //Bu Users admin rolune sahip, admin yetkisi olan kullanicilarin oldugu componenttir, Burda kullanicinin ilk sing-in yaptigi anda back-endden token
  //alip o token ile diger istekleri gondererek diger sayfalara erismesi  o token suresi ne kadar expire time i back-endde ne kadar belirlenmi ise
  //Back-enddeki belirlenen surenin sona ermesi ile birlikte, kullanci tekrardan ornegin Admin sayfasina geldiginde, ki Users componenti Admin
  //componentinin icerisindedir...Iste o zaman, Users icinde useEffectte refresh token islemi var, o refresh token i her zaman senin token in suresi
  //sona ermis mi onu takip ediyor onu kontrol ediyor....Yani Users  componenti her mount edildiginde, bu kontrol ediliyor...ve eger
  //accesstoken suresi sona ermis ise o zaman refrsh token istegi gonderiyor....
  //Butun bunlar arka da gerceklesirken, kullanicinin ne refresh token bilir, ne de accesstoken bilir neler oldugunun farkinda bile degildir aslinda
  //Hersey normal sekilde yoluna devam eder kullanici icin..
  //Her accesstoken in suresi bittiginde refreshtoken guvenli cookie olan HttpOnly Cookie de barindirilan refresh token, axios tarafndan refresh-endpointe
  //yeni bir request gonderiyor, ve yeni bir accesstoken ve yeni bir refresh token response olarak donuyor...Yine ayni yerde tutuluyor, httpOnly cookie
  //de tutuluyor, secur cookie, javscript kodlari ile erisilemez ve de request ve response larda her ikisinde de gidip gelen bilgilerdir..
  //Peki refresh token suresi de biterse o zaman ne olacak, iste o zaman, kullanicidan reauthenticate olmasi yani login olmasi ve bir back-end den
  //yeni bir token almasi beklenir..yani yeniden login olmasi veya sign-in olmasi
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    //cancellation tokens,component unmount edilir ise,ve o esnada fetch islemi devam ederse ne olur...iste o zaman hata aliyoruz ondand dolayi da iste AbortController() bu islemi gerceklestirebiliyor
    //Burasi onemli useEFfect icinde try-catch kullaniyor ve de getUsers icerisinde ve sonra da bu methodu calistiriyor...getUsers i disarda olusturup useEffect icinde de cagirabilirdik...pending durumunda olan, bir request islemin saglikli bir sekilde cancel etmeyi sagliyor, yani biz setUsers a ortadan kaldirilmis unmount edilmis bir componentten gelecek datayi atamaya calisiyoruz tabi ortalik karisiyor orda, o zaman da bu isi bizim iicn saglikli bir ssekilde, request islemini fetch edecek olan, AbortController devreye giriyor, icerisinde signal propertiesi(bunu request isleminde parametreye gonderir ki bunun sayesinde zaten cancel islemini yapabilecek..) ve abort methodu() bulunuyuor. Tabi biz abort u bu sekilde bir senaryo ile karsilasma durumumuz var ise kullaniriz
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
        //Kullanicinin refresh token ida sona erer ise o zaman, tekrar login sayfasina gonderilir ama dikkat edelim..
        //Ve from location ile birlikte login olunca hangi sayfadan login sayfasina refresh token suresi de bittigi icin
        //geldi ise o sayfaya gonderilmesi icindir...
      }
    };

    getUsers();
    //Clean-up function componenti unmount yaptiran yerdir, ve de component unmount oldugu icin, zaten isMounted false oluyor, dolayisi ile de isMounted false yaparak, Users component unmount edildigi zaman, da setUsers islemi yapmasini onlemis oluyoruz, cunku yukarda isMounted true durumunda sadece setUsers islemini yap demis olduk, ki component unmount ediliyorsa ortadan kaldiriliyor sa o zaman isMounted false olacak ve setUsers islemi yapmayacak..
    //Cleanup fonksiyonunda isMounted ve controller.abort() birlikte kullanilir
    return () => {
      isMounted = false;
      controller.abort(); //Burda da request i iptal ediyor pending durumda olan, requesti iptal etmis oluyor...
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {
        users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.username}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        ) //Her zaman data nin bos gelme ve gelmeme durumlarini hesap etmeliyiz ve kullaniciya olabilecek en olumsuz durumlarda nasil bir kullanici deneyinmi-UX-user experience sunabiliriz buna kafa yoralim...Yazilimcilikta cok onemli bir yeri vardir bunuun
      }

      {/* <button onClick={()=>refresh()}>Refresh</button> */}
    </article>
  );
};

export default Users;
