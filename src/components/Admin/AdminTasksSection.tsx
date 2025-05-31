import { useEffect, useState, type BaseSyntheticEvent } from "react";
import type TagType from "../../interfaces/Tag";
import {
  createSuggestedTask,
  editTaskName,
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
  const handleEditTaskName = async (newName: string, taskId: string) => {
    try {
      const result = await editTaskName(newName, taskId);
      console.log(tasks);
      console.log(result.data);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, title: newName } : task
        )
      );
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <section id="admin-tasks">
      <h1>Suggested Tasks</h1>
      <AddAdminTask
        onTaskCreated={(newTask: SuggestedTask) => handleTaskCreated(newTask)}
      />
      <DisplayAdminTasks
        tasks={tasks}
        fetching={fetching}
        onEditTaskName={(newName: string, taskId: string) =>
          handleEditTaskName(newName, taskId)
        }
      />
    </section>
  );
}
