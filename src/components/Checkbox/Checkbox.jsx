/* eslint-disable react/prop-types */
import styles from "./checkbox.module.css";

function Checkbox({ type }) {
  return (
    <label htmlFor="task status" className={styles.label}>
      <input
        className={styles.check}
        type="checkbox"
        checked={type === "completed"}
        id="task status"
        readOnly
      />
      <div className={styles[type]}></div>
    </label>
  );
}

export default Checkbox;
