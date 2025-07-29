import Button from "../Button/Button";
import styles from "./bottom-tab.module.css";

import { ActiveTab, TABS, Task } from "../../types/task";

type BottomTabProps = {
  tab: ActiveTab;
  handleClick: (tab: ActiveTab) => void;
  numberOfActiveTasks: number;
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
};

function BottomTab({
  tab,
  handleClick,
  numberOfActiveTasks,
  setTasksData,
}: BottomTabProps) {
  return (
    <div className={styles.box}>
      <p>
        {numberOfActiveTasks} item{numberOfActiveTasks > 1 ? "s" : ""} left
      </p>
      <div>
        <Button
          aria-label="View all tasks"
          onClick={() => handleClick("all")}
          className={`${tab === TABS.ALL ? styles.active : ""}`}
        >
          All
        </Button>
        <Button
          aria-label="View active tasks"
          className={`${tab === TABS.ACTIVE ? styles.active : ""}`}
          onClick={() => handleClick("active")}
        >
          Active
        </Button>
        <Button
          aria-label="View completed tasks"
          className={`${tab === TABS.COMPLETED ? styles.active : ""}`}
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
