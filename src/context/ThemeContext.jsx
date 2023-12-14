/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { themeContext } from "./index";

const { Provider } = themeContext;

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));

    document.body.className = theme;
  }, [theme]);

  return <Provider value={{ toggleTheme, theme }}>{children}</Provider>;
}

export default ThemeProvider;
