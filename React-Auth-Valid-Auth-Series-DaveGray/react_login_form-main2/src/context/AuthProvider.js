import { createContext, useState } from "react";

const AuthContext = createContext({});//icerisine bir baslangic degeri gibi, bir deger veriliyor

//{children} AuthProvider icerisinde,yani nested olan, componentleri temsil ediyor...
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;