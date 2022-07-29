import React from 'react';
import { ThemeContextType, Theme } from '../@types/theme';
import { ThemeContext } from '../context/themeContext';

type wrapperProps={
    children:React.ReactNode;
}
const ThemeWrapper: React.FC<wrapperProps> = ({ children }) => {
  const { theme, changeTheme } = React.useContext(ThemeContext) as ThemeContextType;
  //Select option da event in type i bu sekilde olmalidir
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeTheme(event.target.value as Theme);
  };

  return (
    <div data-theme={theme}>
      <select name="toggleTheme" onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      {children}
    </div>
  );
};
export default ThemeWrapper;