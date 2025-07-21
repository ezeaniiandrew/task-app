import { useContext, createContext } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: (mode: boolean) => void;
};

const ThemeContext: ThemeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

export const themeContext = createContext(ThemeContext);
export const useTheme = () => useContext(themeContext);
