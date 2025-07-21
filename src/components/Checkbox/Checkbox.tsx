import { Task, STATUS, typeOfStatus } from "../../types/task";
import styles from "./checkbox.module.css";

type CheckboxProps = {
  type: typeOfStatus;
  task: Task;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({ type, task, handleChange }: CheckboxProps) {
  const checkboxId = `task-status-${task.id}`;

  return (
    <label htmlFor={checkboxId} className={styles.label}>
      <input
        className={styles.check}
        type="checkbox"
        aria-label={`Mark ${task.title} as ${
          type === STATUS.ACTIVE ? "completed" : "active"
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
