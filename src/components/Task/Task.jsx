/* eslint-disable react/prop-types */
import Checkbox from "components/Checkbox/Checkbox";
import styles from "./task.module.css";
import cancelIcon from "assets/icon-cross.svg";
import { Reorder } from "framer-motion";
import { useState } from "react";

const item = {
  initial: { x: "100vw" },
  final: {
    x: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 45 },
  },
};

function Task({ task, setTasksData }) {
  const { title, status, id } = task;
  const [isDragging, setIsDragging] = useState(false);

  const updateTaskStatus = (id) => {
    setTasksData((prevItems) =>
      prevItems.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "active" : "completed",
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasksData((prevItems) => prevItems.filter((task) => task.id !== id));
  };

  return (
    <Reorder.Item
      variants={item}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      value={task}
      className={`${styles.task} ${isDragging ? styles.dragging : ""}`}
    >
      <Checkbox type={status} handleChange={() => updateTaskStatus(id)} />
      <p className={status === "completed" ? styles.done : null}>{title}</p>
      <button onClick={() => deleteTask(id)}>
        <img src={cancelIcon} alt="Delete Icon" />
      </button>
    </Reorder.Item>
  );
}

export default Task;
