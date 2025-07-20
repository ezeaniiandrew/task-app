/* eslint-disable react/prop-types */
import Button from "components/Button/Button";
import styles from "./bottom-tab.module.css";

function BottomTab({ tab, handleClick, tasksData, setTasksData }) {
  return (
    <div className={styles.box}>
      <p>
        {tasksData.length} item{tasksData.length > 1 ? "s" : ""} left
      </p>
      <div>
        <Button
          aria-label="View all tasks"
          style={{ color: tab === "all" ? "var(--active-btn-color)" : null }}
          onClick={() => handleClick("all")}
        >
          All
        </Button>
        <Button
          aria-label="View active tasks"
          style={{ color: tab === "active" ? "var(--active-btn-color)" : null }}
          onClick={() => handleClick("active")}
        >
          Active
        </Button>
        <Button
          aria-label="View completed tasks"
          style={{
            color: tab === "completed" ? "var(--active-btn-color)" : null,
          }}
          onClick={() => handleClick("completed")}
        >
          Completed
        </Button>
      </div>
      <Button
        aria-label="Clear completed tasks"
        className={styles.clearBtn}
        onClick={() =>
          setTasksData((prevTasks) =>
            prevTasks.filter((task) => task.status !== "completed")
          )
        }
      >
        Clear completed
      </Button>
    </div>
  );
}

export default BottomTab;
