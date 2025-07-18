/* eslint-disable react/prop-types */
import { useRef } from "react";
import styles from "./todo-edit-modal.module.css";
import { motion } from "framer-motion";

function TodoEditModal({
  id,
  title,
  setTasksData,
  setShowEditModal,
  setShowErrorMessage,
  showErrorMessage,
}) {
  const inputRef = useRef();

  const editTask = (id) => {
    const newTitle = inputRef.current.value.trim();

    if (!newTitle || newTitle === title.trim()) {
      setShowErrorMessage(true);
      return;
    }

    setTasksData((prevItems) =>
      prevItems.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
            }
          : task
      )
    );
    setShowEditModal(false);
  };

  return (
    <div className={styles.overlay}>
      <motion.form
        layoutId={id}
        onSubmit={(e) => {
          e.preventDefault();
          editTask(id);
        }}
      >
        <motion.input
          ref={inputRef}
          onChange={() => setShowErrorMessage(false)}
          layoutId={`input-${id}`}
          type="text"
          defaultValue={title}
          autoFocus
        />
        {showErrorMessage && (
          <p className={styles.error}>No changes detected</p>
        )}
        <div className={styles["btns-container"]}>
          <motion.button layoutId={`edit-${id}`} onClick={() => editTask(id)}>
            &#x2714;
          </motion.button>
          <motion.button
            layoutId={`cancel-${id}`}
            onClick={() => setShowEditModal(false)}
          >
            &#10060;
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}

export default TodoEditModal;
