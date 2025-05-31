import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Create new suggested task (by admin)
export const createSuggestedTask = async (title: string, tagsIds: string[]) => {
  const response = await axios.post(`${apiUrl}/suggested-tasks`, {
    title: title,
    tags: tagsIds,
  });
  return response;
};

// Get all suggested tasks
export const getSuggestedTasks = async () => {
  const response = await axios.get(`${apiUrl}/suggested-tasks`);
  return response;
};
// Edit suggested task name
export const editTaskName = async (newName: string, taskId: string) => {
  return await axios.patch(`${apiUrl}/suggested-tasks`, {
    _id: taskId,
    title: newName,
  });
};
