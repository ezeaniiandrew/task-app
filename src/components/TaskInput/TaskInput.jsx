/* eslint-disable react/prop-types */
import styles from "./task-input.module.css";
import { useState } from "react";

function TaskInput({ setTasksData }) {
  const [inputValue, setInputValue] = useState("");
  const id = crypto.randomUUID();

  const createNewTask = (e) => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }

    setTasksData((prevTasks) => {
      return [{ id, title: inputValue, status: "active" }, ...prevTasks];
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
