/* eslint-disable react/prop-types */
import Task from "components/Task/Task";
import styles from "./task-list.module.css";
import BottomTab from "components/BottomTab/BottomTab";
import { useState } from "react";
import { Reorder, motion } from "framer-motion";

const list = {
  final: {
    y: [500, 0],
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

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

  return (
    <motion.section
      initial="initial"
      animate="final"
      variants={list}
      className={styles.box}
    >
      <Reorder.Group
        axis="y"
        as="ul"
        values={tasksData}
        onReorder={setTasksData}
      >
        {getTasks(activeTab).map((task) => (
          <Task key={task.id} task={task} setTasksData={setTasksData} />
        ))}
      </Reorder.Group>
      <BottomTab
        tasksData={tasksData}
        tab={activeTab}
        handleClick={setActiveTab}
        setTasksData={setTasksData}
      />
    </motion.section>
  );
}

export default TaskList;
