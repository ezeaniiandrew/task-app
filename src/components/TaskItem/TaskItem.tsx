import Checkbox from "../Checkbox/Checkbox";
import styles from "./task.module.css";
import { Reorder, motion } from "framer-motion";
import { useRef, useState } from "react";
import TodoEditModal from "../TodoEditModal/TodoEditModal";
import { Task } from "../../types/task";

type TaskItemProps = {
  task: Task;
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
};

const item = {
  initial: { height: 0, opacity: 0 },
  final: {
    height: "auto",
    opacity: 1,
  },
  exit: { x: "-15vw", opacity: 0, transition: { duration: 0.15 } },
};

function TaskItem({ task, setTasksData }: TaskItemProps) {
  const { title, status, id } = task;
  const [isDragging, setIsDragging] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const updateTaskStatus = (id: string) => {
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

  const deleteTask = (id: string) => {
    setTasksData((prevItems) => prevItems.filter((task) => task.id !== id));
  };

  const closeModal = () => {
    setShowEditModal(false);
    if (previouslyFocusedElementRef.current) {
      previouslyFocusedElementRef.current.focus();
    }
  };

  const openModal = () => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    setShowEditModal(true);
  };

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
          <Checkbox
            type={status}
            task={task}
            handleChange={() => updateTaskStatus(id)}
          />
          <p className={status === "completed" ? styles.done : null}>
            {task.title}
          </p>
          <div>
            <motion.button
              aria-label={`edit ${title} task`}
              className={styles.edit}
              layoutId={`edit-${id}`}
              onClick={openModal}
              disabled={status === "completed"}
            >
              <span>&#9998;</span>
            </motion.button>

            <motion.button
              title={`delete ${title} task`}
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
          handleCloseModal={closeModal}
        />
      )}
    </>
  );
}

export default TaskItem;
