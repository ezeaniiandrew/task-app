/* eslint-disable react/prop-types */
import Checkbox from "components/Checkbox/Checkbox";
import styles from "./task.module.css";
import cancelIcon from "assets/icon-cross.svg";
import { Reorder } from "framer-motion";

const item = {
  initial: { x: "100vw" },
  final: {
    x: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 45 },
  },
};

function Task({ task, setTasksData }) {
  const { title, status, id } = task;

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
      value={task}
      className={styles.task}
    >
      <Checkbox type={status} handleChange={() => updateTaskStatus(id)} />
      <p className={status === "completed" ? styles.done : null}>{title}</p>
      <img src={cancelIcon} onClick={() => deleteTask(id)} alt="" />
    </Reorder.Item>
  );
}

export default Task;
