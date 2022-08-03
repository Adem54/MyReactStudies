import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//Bu da aslindas bir bestpractise kullanimdir, cunku bu component bir custom hook dur ve sadece Context imiz olan AuthProvider icinden bizim ihtiyazimz olan data yi aliyor , hem namin convention bakimindan hem de data temiz islem bakimindan cok mantikli ve bestpractise bir yaklasimdir...bunu iyi ele alalim, yani ihtiyac olan data gidilip, AuthProvider dan da alinabilir ama daha temiz, clean-code, ve anlasilir kod olmasi icin kendi custom -hook umuzu olusturup hangi dataya ihtiyacimiz var ise onu burda alip, sonra da kullanmak istedigimiz yerde bu custom hook u kullanmak....Cok harika bir yaklasim....
const useAuth = () => {
    return useContext(AuthContext);
    //Dogrudan AuthContext teki statimizi veren bir component olmus oluyor...
}

export default useAuth;