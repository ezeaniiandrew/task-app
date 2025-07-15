/* eslint-disable react/prop-types */
import Task from "components/Task/Task";
import styles from "./task-list.module.css";
import BottomTab from "components/BottomTab/BottomTab";
import { useState } from "react";
import { Reorder } from "framer-motion";

function TaskList({ tasksData, setTasksData }) {
  const [activeTab, setActiveTab] = useState("all");

  const getTasks = (tab) => {
    switch (tab) {
      case "active":
        return tasksData.filter((task) => task.status !== "completed");

      case "completed":
        return tasksData.filter((task) => task.status !== "active");

      default:
        return tasksData;
    }
  };

  const tasks = getTasks(activeTab);

  return (
    <section className={styles.box}>
      <Reorder.Group axis="y" as="ul" values={tasks} onReorder={setTasksData}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} setTasksData={setTasksData} />
        ))}
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
