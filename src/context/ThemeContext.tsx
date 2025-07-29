/* eslint-disable react/prop-types */
import { useEffect, useState, ReactNode } from "react";
import { themeContext } from "./index.tsx";

const { Provider } = themeContext;

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const prefersDarkMode =
    localStorage.getItem("prefersDarkMode") !== null
      ? JSON.parse(localStorage.getItem("prefersDarkMode") as string)
      : window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

  const toggleDarkMode = (mode: boolean) => {
    setIsDarkMode(mode);
    localStorage.setItem("prefersDarkMode", JSON.stringify(mode));
  };

  useEffect(() => {
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      localStorage.setItem("prefersDarkMode", JSON.stringify(e.matches));
      setIsDarkMode(e.matches);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    document.body.className = isDarkMode ? "dark" : "light";

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [isDarkMode, setIsDarkMode]);

  return <Provider value={{ isDarkMode, toggleDarkMode }}>{children}</Provider>;
}

export default ThemeProvider;
