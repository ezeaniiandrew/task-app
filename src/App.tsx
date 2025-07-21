import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import { initialData } from "./data/data";
import { useEffect, useState } from "react";
import { Task } from "./types/task";

function App() {
  const [tasksData, setTasksData] = useState<Task[]>(
    (() => {
      const storedTodos = localStorage.getItem("tasks");
      return storedTodos ? (JSON.parse(storedTodos) as Task[]) : initialData;
    })()
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }, [tasksData]);

  return (
    <main>
      <Header />
      <TaskInput setTasksData={setTasksData} />
      <TaskList tasksData={tasksData} setTasksData={setTasksData} />
      <Footer />
    </main>
  );
}

export default App;
