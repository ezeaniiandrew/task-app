import styles from "./header.module.css";
import sunIcon from "assets/icon-sun.svg";
import moonIcon from "assets/icon-moon.svg";
import { useTheme } from "context/index";
import Button from "components/Button/Button";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1>Todo</h1>
      <Button onClick={() => toggleTheme()}>
        <img
          src={theme === "light" ? moonIcon : sunIcon}
          alt="An icon of the sun"
        />
      </Button>
    </header>
  );
}

export default Header;
