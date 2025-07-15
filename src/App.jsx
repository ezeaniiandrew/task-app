import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import TaskInput from "components/TaskInput/TaskInput";
import TaskList from "components/TaskList/TaskList";
import { initialData } from "data/data";
import { useEffect, useState } from "react";

function App() {
  const [tasksData, setTasksData] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? initialData
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
