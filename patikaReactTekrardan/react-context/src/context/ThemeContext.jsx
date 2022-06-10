import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  //Eger localStorage dan silinir de hicbirsey bulunmaz ise localStorage da o zaman light yazsin diyoruz || bu bestpractise kullanimdir ve bizi cogu zaman ciddi problemlerden kurtaracatktir ondan dolayi bunu kullanma yi iyi bilmeliyiz.....
  const values = {
    theme,
    setTheme,
  };
  //Bu theme state i her degistiginde bize soyle diyoruz
  useEffect(()=>{
    console.log("theme:"+theme);
    localStorage.setItem("theme",theme);
  },[theme])
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
//Her seferinde useContext i ayri ayri componentler icinde yapmaktansa o isi burda 1 kez yapip direk burdan gonderelim ve de her comonentte bu isin ayri ayri yapilmasinin onune gecmis olalim
export const useTheme=useContext(ThemeContext);
//Bu arrow function ile ThemeProvider hook unun disinda kullanmaliyiz cunku export etmek istiyoruz ondan dolayi da useContext bir hookdur ve ancak hook function icinde dogrudan kullanilabilir, ancak disarda kullanacaksak eger o zaman onu arrow function icinde kullanmaliyiz yoksa hata aliriz....Invalid hook call. Hooks can only be called inside of the body of a function component. 
//Artik disariya ThemContext yerine useTheme yi gondermemiz yeterli olacaktir....
//export default ThemeContext;

