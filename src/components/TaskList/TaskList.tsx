import TaskItem from "../TaskItem/TaskItem";
import styles from "./task-list.module.css";
import BottomTab from "../BottomTab/BottomTab";
import { useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { ActiveTab, TABS, Task } from "../../types/task";

type TaskListProps = {
  tasksData: Task[];
  setTasksData: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskList({ tasksData, setTasksData }: TaskListProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>(TABS.ALL);

  const getTasks = (tab: ActiveTab): Task[] => {
    switch (tab) {
      case TABS.ACTIVE:
        return tasksData.filter((task) => task.status !== "completed");

      case TABS.COMPLETED:
        return tasksData.filter((task) => task.status !== "active");

      default:
        return tasksData;
    }
  };

  const tasks = getTasks(activeTab);

  return (
    <section className={styles.box}>
      <Reorder.Group axis="y" as="ul" values={tasks} onReorder={setTasksData}>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} setTasksData={setTasksData} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <BottomTab
        tasksData={tasksData}
        tab={activeTab}
        handleClick={setActiveTab}
        setTasksData={setTasksData}
      />
    </section>
  );
}

export default TaskList;
