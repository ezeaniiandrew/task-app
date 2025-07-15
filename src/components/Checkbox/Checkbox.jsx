/* eslint-disable react/prop-types */
import styles from "./checkbox.module.css";

function Checkbox({ type, handleChange }) {
  return (
    <label htmlFor="task status" className={styles.label}>
      <input
        className={styles.check}
        type="checkbox"
        checked={type === "completed"}
        id="task status"
        onChange={handleChange}
      />
      <div className={styles[type]}></div>
    </label>
  );
}

export default Checkbox;
