/* eslint-disable react/prop-types */
import styles from "./checkbox.module.css";

function Checkbox({ type, task, handleChange }) {
  const checkboxId = `task-status-${task.id}`;

  return (
    <label htmlFor={checkboxId} className={styles.label}>
      <input
        className={styles.check}
        type="checkbox"
        aria-label={`Mark ${task.title} as ${
          type === "active" ? "completed" : "active"
        }`}
        checked={type === "completed"}
        id={checkboxId}
        onChange={handleChange}
      />
      <div className={styles[type]}></div>
    </label>
  );
}

export default Checkbox;
