import { useEffect, useRef, useState } from "react";
import styles from "./todo-edit-modal.module.css";
import { motion } from "framer-motion";
import Button from "../Button/Button";

type TodoEditModalProps = {
  id: string;
  title: string;
  setTasksData: React.Dispatch<React.SetStateAction<any[]>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
};

function TodoEditModal({
  id,
  title,
  setTasksData,
  handleCloseModal,
}: TodoEditModalProps) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);

  const editTask = (id: string) => {
    if (!inputRef.current) return;
    const newTitle = inputRef.current.value.trim();

    if (!newTitle || newTitle === title.trim()) {
      setShowErrorMessage(true);
      inputRef.current?.focus();
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
    handleCloseModal();
  };

  useEffect(() => {
    if (!modalRef.current) return;

    const focusableSelectors = "input, button";
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(focusableSelectors);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleCloseModal();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            (lastFocusableElement as HTMLElement).focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            (firstFocusableElement as HTMLElement).focus();
          }
        }
      }
    }

    modal.addEventListener("keydown", handleKeyDown);
    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseModal]);

  return (
    <div className={styles.overlay} ref={modalRef}>
      <Button
        autoFocus
        aria-label="Close Edit todo dialog"
        className={styles.close}
        onClick={handleCloseModal}
      >
        &#10060;
      </Button>
      <div
        role="dialog"
        id="dialog"
        aria-labelledby="dialog_label"
        aria-modal="true"
        className={styles.modal}
      >
        <h2 id="dialog_label">Edit Todo</h2>
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
          />
          {showErrorMessage && (
            <p className={styles.error}>No changes detected</p>
          )}
          <div className={styles["btns-container"]}>
            <motion.button
              layoutId={`edit-${id}`}
              aria-label="Confirm changes"
              onClick={() => editTask(id)}
            >
              &#x2714;
            </motion.button>
            <motion.button
              layoutId={`cancel-${id}`}
              aria-label="Cancel changes"
              onClick={handleCloseModal}
            >
              &#10060;
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default TodoEditModal;
