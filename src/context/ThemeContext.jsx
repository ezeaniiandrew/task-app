/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { themeContext } from "./index";

const { Provider } = themeContext;

function ThemeProvider({ children }) {
  const prefersDarkMode =
    localStorage.getItem("prefersDarkMode") ??
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleDarkMode = (mode) => {
    setIsDarkMode(mode);
    localStorage.setItem("prefersDarkMode", JSON.stringify(mode));
  };

  useEffect(() => {
    const handleColorSchemeChange = (e) => {
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
