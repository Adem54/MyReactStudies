export type Theme = 'light' | 'dark';

//ThemeContextType biz hangi datayi Contexte gececek isek onlarin icinde bulundugu,type diyelim buna
export type ThemeContextType = {
    theme: Theme;
    changeTheme: (theme: Theme) => void;//? ile optional yapiyoruz bunu
  };