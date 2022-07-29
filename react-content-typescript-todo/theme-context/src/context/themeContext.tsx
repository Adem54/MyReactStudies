import React, { createContext, useState } from "react";
import { Theme, ThemeContextType } from "../@types/theme";

const defaultState = {
  theme: "light",
};

type ThemeProps = {
  children: React.ReactNode;
};

// export const ThemeContext=createContext<ThemeContextType | null>(null);
//Eger defaultState kullanmak istersek de bu sekilde ele alabiliriz....
export const ThemeContext = createContext(defaultState);

const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const values = {
    theme,
  };

  return <ThemeContext.Provider value={values}></ThemeContext.Provider>;
};

export default ThemeProvider;