import { useEffect, useState, type BaseSyntheticEvent } from "react";
import type TagType from "../../interfaces/Tag";
import {
  createSuggestedTask,
  getSuggestedTasks,
} from "../../api/suggestedTasksApi";
import ErrorModal from "../ErrorModal";
import DisplayAdminTasks from "./DisplayAdminTasks";
import AddAdminTask from "./AddAdminTask";
import type SuggestedTask from "../../interfaces/SuggestedTask";

export default function AdminTasksSection() {
  const [tasks, setTasks] = useState<SuggestedTask[]>([]);
  const [fetching, setFetching] = useState(true);

  const handleTaskCreated = (newTask: SuggestedTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const result = await getSuggestedTasks();
      console.log(result);
      setTasks(result.data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <section id="admin-tasks">
      <h1>Suggested Tasks</h1>
      <AddAdminTask
        onTaskCreated={(newTask: SuggestedTask) => handleTaskCreated(newTask)}
      />
      <DisplayAdminTasks tasks={tasks} fetching={fetching} />
    </section>
  );
}
