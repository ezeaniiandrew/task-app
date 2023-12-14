import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import TaskInput from "components/TaskInput/TaskInput";
import TaskList from "components/TaskList/TaskList";
import { initialData } from "data/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const variant = {
  initial: {
    y: -500,
  },
  final: {
    y: 0,
    transition: {
      duration: 0.6,
      // type: "spring",
    },
  },
};

function App() {
  const [tasksData, setTasksData] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? initialData
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }, [tasksData]);

  return (
    <main>
      <motion.div initial="initial" animate="final" variants={variant}>
        <Header />
        <TaskInput setTasksData={setTasksData} />
      </motion.div>
      <TaskList tasksData={tasksData} setTasksData={setTasksData} />
      <Footer />
    </main>
  );
}

export default App;
