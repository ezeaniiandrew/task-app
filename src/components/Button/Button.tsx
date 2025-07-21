import clsx from "clsx";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

function Button({ children, className, ...otherProps }: ButtonProps) {
  const btnStyles = clsx(styles.base, className);

  return (
    <button className={btnStyles} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
