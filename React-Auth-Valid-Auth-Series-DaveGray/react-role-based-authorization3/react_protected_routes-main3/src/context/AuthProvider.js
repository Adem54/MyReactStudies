import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
//Burdaki setAuth uzerinden ornegin biz, axios ile, login post islemi yapip kullaniciya request gonderince response olarak, api den icerisinde hem token hem de roles lerin oldugu data gelecek ve o data setAuth araciligi ile, alinacak ve netice itibari ile burda ki auth state i bizim api den gelen ve kullanicinin hangi rolleri alabileceginin listesi ile gelecektir ki normalde zaten api dokumaninda bunlari biz ogreniriz, yani hangi role ve yetkiye sahip kullanici hangi, datalara erisebilecegini, hangi sayfalara erisebilecegini, biz api nin, dokumanindan da okuyabilirz ayrica kendimiz de front-end kismini planlayabiliriz...
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;