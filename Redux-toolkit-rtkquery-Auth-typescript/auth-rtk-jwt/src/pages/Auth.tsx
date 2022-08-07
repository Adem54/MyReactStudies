import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import { useLoginUserMutation,useRegisterUserMutation } from "../services/authApi";
import { toast } from "react-toastify";
import { setUser } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../app/hooks";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
 export interface formValueType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Auth = () => {
  //Typescriptte direk useDispatch kullanmak yerine, bizim icin type i ile birlikte hazirlanmis, useAppDispatch i hooks dosyasindan import ederk kullanirz
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  const [formValue, setFormValue] = useState<formValueType>(initialState);

  const [registerUser,{data:registerData,isError:isRegisterError,isSuccess:isRegisterSuccess,error:registerError,isLoading:registerLoading}]=useRegisterUserMutation();
  
  const { email, firstName, lastName, password, confirmPassword } = formValue;
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [loginUser,{isLoading:isLoginLoading,isError:isLoginError,data:loginData,isSuccess:isLoginSuccess,error:loginError}]=useLoginUserMutation();
  //Ayni componentte birden fazla mutation kullanirken  her ikisi de data ismi ile geldigi icin eger direk data ismi ile kullanirsak bir
  //cakisma olacaktir, bu cakismayi ortadan kaldirmak icin, biz data:loginData seklinde islem yapariz..

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]:e.target.value
    })
  };

  const isAllFill=Boolean(firstName) && Boolean(lastName) && Boolean(email) && Boolean(password) && Boolean(confirmPassword)
const handleRegister=async ()=>{
  if(password!==confirmPassword){
    return toast.error("Password don't match"); 
  }
  if(isAllFill){
    await registerUser({firstName,lastName,email,password,confirmPassword});
  }else {
    toast.error("Please fill all Input fields")
  }
}


  //RTK-QUERY ISLEMI BURDA YAPILIYOR
  const handleLogin=async()=>{
if(email && password){
 await loginUser({password,email});
 //Bu islemden biz bir name ve birde token alacagiz ve bu data otomatikmen,asagidaki kodda dusuyor..ve biz de ordaki datalarin hepsini dogrdan
 //ordan alip kullaniriz..ornegin kendi lokal state timize de yine burdan donen data uzerinden alarak kullaniriz
//  const [loginUser,{isLoading:isLoginLoading,isError:isLoginError,data:loginData,isSuccess:isLoginSuccess,error}]=useLoginUserMutation();

}else{
  toast.error("Please fill all Input field");
}
  }

  //LOKALDEKI STATEIMIZE DATAYI YINE REDUX-TOOLKIT ILE BURDA EKLIYORUZ..
  //Bu noktayi cok iyi anlamak gerek, hep bu sekilde calsacagiz...cook onemli..
  useEffect(()=>{
if(isLoginSuccess){
  toast.success("User Login Successfully");
  dispatch(setUser({name:loginData.result.name,token:loginData.token})) //authSlice isminde bizim normal, redux-toolkit ile createSlice ile ana datayi olustururuz ve
  //sonra da reducers kisminda setUser isminde bir action methodu olusturuz bu su islemi yapar, eger request islemi basari ile gerceklesmis ise
  //o zaman api ile ilgili islem basarilidir o zaman da ben, datayi kendi stateime ekleyebilirim diyerek bu iselmi yapiyor...iste bu mantik onemli...
  //Peki datayi nerden aliyoruz datayi da tabik i yine rtkquery ile useLoginUserMutation() yapilinca gelen data ya eger yine ordan gelen isSuccess true
  //iste diyerek true oldugunda request islemi bsari ile gerceklesmis ve reponse almis kabul ediyoruz..
  navigate("/dashboard");
}

if(isRegisterSuccess){
  toast.success("User Register Successfully");
  dispatch(setUser({name:registerData.result.name,token:registerData.token}))
  navigate("/dashboard");

}
  },[isLoginSuccess,isRegisterSuccess])
/*
Burda bilmemiz gereken soyle bir konu da var, burda dikkat edersek hem register isleminde hem de login isleminde token response ediliyor
back-end den bu herzaman boyle olmayabilir bu tamamen back-end in token islemini nasil ele aldigi ile ilgili birseydir
Kimi back-end de de register isleminden sonra hicbirsey donmeden kullanicinin signin veya login formuna yonlendirilerek ordasn giris yaparak
token almasini  ister ve ondan sonra kullaniciya protected search, i public yapar...Ama burda register da zaten token i elde ediyoruz
dolayisi ile, regster islemi ile birlikte dogrudan, dashboard sayfasina gidebilirz

*/

//Burda back-endden gelen hata mesajlarini kullanarak, hatanin nerden kaynaklandigina dair de kullaniciya ipucu vererek onu dogru yoneldnirmis olyoruz
useEffect(()=>{
if(isLoginError){
    toast.error((loginError as any).data.message)
    //typescriptte bir objeynin altindaki properyt leri yazdirirken, o objenin type i eger hem undefined olablir hem de bekledigmiz deger olablir olarak type i verilmis ise, o zaman undefined gelme ihtimaline binaen hata alirz ondan dolayi da typescriptte deriz haci biz bunun datasi gelecegini
    //dusuneerek bu islemi yapiyoruz   as any sen bunu boyle kabul et diyoruz...
    
    }
  if(isRegisterError){
    toast.error((registerError as any).data.message)

  }  
},[isLoginError,isRegisterError])

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className=" fw-bold mb-2 text-uppercase">
                    {!showRegister ? "Login" : "Register"}
                  </h2>
                  <p className="text-white-50 mb-4">
                    {!showRegister
                      ? "Please enter your Email & Password"
                      : "Please enter User detail"}
                  </p>
                  {showRegister && (<>
                    <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      label="First Name"
                      className="form-control form-control-lg"
                      placeholder="FirstName"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      label="Last Name"
                      className="form-control form-control-lg"
                      placeholder="LastName"
                    />
                  </div>
                  </>) }
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>
                  {showRegister && (
                      <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                      />
                    </div>
                  )}
                  {!showRegister ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  )}

                  <div style={{position:"absolute", bottom:"0", left:"27%"}}>
                    <h5 className="mb-0">
                      {!showRegister ? (
                        <>
                          Don't have an account ?{" "}
                          <p
                            className="text-white-50 fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowRegister(true)}
                          >
                            Sign Up
                          </p>
                        </>
                      ) : (
                        <>
                          Already have an acoount ?{" "}
                          <p
                            className="text-white-50 fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowRegister(false)}
                          >
                            Sign In
                          </p>
                        </>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
