import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../store";

import { logout } from "../store/actions/userAction";
import { UserDispatch } from "../types/user"

const Logout = () => {
    //componenti login e yonlendirmeden once state in temizlendiginden
    //emin olmamiz gerekiyor....
    const {data}=useSelector((state:AppState)=>state.user);
    const dispatch=useDispatch<UserDispatch>();
    //Component mount olur olmaz, hemen logut methodu calisacak
    //localhosttan token i silecek ve sayfayi render edip sonra da 
    //logic yaparak eger data.username bos ise, yok ise o zaman sen
    //dogrudan sayfayi, git, login componenti sayfasina yonlendir
    //AppHeader.tsx menu componentinde Logout butonu icne Link ile logout
    //adresine yonlendirdik ama tabi App.tsx icinde logout adresine gittiginde
    // <Menu.Item key={"/logout"}><Link to="/logout">Cikis</Link></Menu.Item> 
    //Logout comopnenti ni okusun gorsun dememiz gerekiyor
    //     <Route path="/logout" element={<Logout />}/>

    useEffect(()=>{
        dispatch(logout());
      
    },[])
//data silinmis ise <Navigate ile eski redirecttir bu direk sayfa yi kendisi baska sayfaya
//yonlendirir
    if(!data.username) return <Navigate to="/login"/>;
  
    return (
    <div>
        Logging out...
    </div>
  )
}

export default Logout