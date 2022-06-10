import { createContext, useState } from "react";
const UserContext = new createContext();
//Onemli-Hicbirzaman react hook ile ilgili bir methodu bir react functional component i disinda kullanamayiz hata aliriz...Ornegin direk disarda useState kullandigim icin su hatayi aldim....React - Error: Invalid hook call. Hooks can only be called inside of the body of a function component.
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
      const values = {user,setUser};
  return (
    <UserContext.Provider value={values}> {children}</UserContext.Provider>
  );
};

export default UserContext;
