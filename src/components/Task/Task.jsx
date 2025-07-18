/* eslint-disable react/prop-types */
import Checkbox from "components/Checkbox/Checkbox";
import styles from "./task.module.css";
import { Reorder, motion } from "framer-motion";
import { useEffect, useState } from "react";
import TodoEditModal from "components/TodoEditModal/TodoEditModal";

const item = {
  initial: { height: 0, opacity: 0 },
  final: {
    height: "auto",
    opacity: 1,
  },
  exit: { x: "-15vw", opacity: 0, transition: { duration: 0.15 } },
};

function Task({ task, setTasksData }) {
  const { title, status, id } = task;
  const [isDragging, setIsDragging] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  useEffect(() => {
    const handleCloseOverlay = (e) => {
      if (e.key === "Escape") {
        setShowEditModal(false);
      }
    };
    window.addEventListener("keydown", handleCloseOverlay);

    return () => {
      window.removeEventListener("keydown", handleCloseOverlay);
    };
  }, []);

  return (
    <>
      <Reorder.Item
        variants={item}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        initial="initial"
        animate="final"
        exit="exit"
        value={task}
        layoutId={`input-${id}`}
        key={id}
        className={`${styles.task} ${isDragging ? styles.dragging : ""}`}
      >
        <div className={styles.container}>
          <Checkbox type={status} handleChange={() => updateTaskStatus(id)} />
          <p className={status === "completed" ? styles.done : null}>
            {task.title}
          </p>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              gap: "10px",
            }}
          >
            <motion.button
              title="edit"
              className={styles.edit}
              layoutId={`edit-${id}`}
              onClick={() => setShowEditModal(true)}
            >
              <span>&#9998;</span>
            </motion.button>

            <motion.button
              title="delete"
              layoutId={`cancel-${id}`}
              onClick={() => deleteTask(id)}
            >
              &#10060;
            </motion.button>
          </div>
        </div>
      </Reorder.Item>
      {showEditModal && (
        <TodoEditModal
          title={title}
          id={id}
          setTasksData={setTasksData}
          setShowEditModal={setShowEditModal}
          setShowErrorMessage={setShowErrorMessage}
          showErrorMessage={showErrorMessage}
        />
      )}
    </>
  );
}

export default Task;
