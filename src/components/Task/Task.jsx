/* eslint-disable react/prop-types */
import Checkbox from "components/Checkbox/Checkbox";
import styles from "./task.module.css";
import cancelIcon from "assets/icon-cross.svg";
import { Reorder } from "framer-motion";
import { useState } from "react";

const item = {
  initial: { y: "-5vw", opacity: 0 },
  final: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
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
      initial="initial"
      animate="final"
      value={task}
      exit={{ x: "-15vw", opacity: 0 }}
      key={id}
      className={`${styles.task} ${isDragging ? styles.dragging : ""}`}
      layout
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
