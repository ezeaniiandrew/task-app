/* eslint-disable react/prop-types */
import clsx from "clsx";
import styles from "./button.module.css";

function Button({ children, className, ...otherProps }) {
  const btnStyles = clsx({
    [styles.base]: true,
    [className]: className,
  });

  return (
    <button className={btnStyles} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
