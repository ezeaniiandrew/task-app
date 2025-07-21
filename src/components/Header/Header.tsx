import styles from "./header.module.css";
import sunIcon from "assets/icon-sun.svg";
import moonIcon from "assets/icon-moon.svg";
import { useTheme } from "../../context/index";
import Button from "../Button/Button";

function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className={styles.header}>
      <h1>Todo</h1>
      <Button
        aria-label={`Change to ${isDarkMode ? "light" : "dark"} theme`}
        onClick={() => toggleDarkMode(!isDarkMode)}
      >
        <img
          src={isDarkMode ? sunIcon : moonIcon}
          alt={`${isDarkMode ? "sun" : "moon"} icon`}
        />
      </Button>
    </header>
  );
}

export default Header;
