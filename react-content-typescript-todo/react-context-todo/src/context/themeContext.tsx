import * as React from 'react';
import { Theme, ThemeContextType } from '../@types/theme';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);
type ThemeProps = {
    children: React.ReactNode;
  };
  
const ThemeProvider: React.FC<ThemeProps> = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme: themeMode, changeTheme: setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;