import { STATUS, Task } from "../../types/task";
import styles from "./task-input.module.css";
import { FormEvent, useState } from "react";

type TaskInputProps = {
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskInput({ setTasksData }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");
  const id = crypto.randomUUID();

  const createNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    setTasksData((prevTasks) => {
      const newTodo = { id, title: inputValue, status: STATUS.ACTIVE };
      return [newTodo, ...prevTasks];
    });

    setInputValue("");
  };

  return (
    <form onSubmit={(e) => createNewTask(e)}>
      <label
        htmlFor="task-input"
        aria-label="Create a new todo"
        className={styles.label}
      >
        <input
          autoFocus
          type="text"
          id="task-input"
          placeholder="Create a new todo..."
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span className={styles.circle}></span>
      </label>
    </form>
  );
}

export default TaskInput;
