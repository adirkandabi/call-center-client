import axios from "axios";
const apiUrl = `${import.meta.env.VITE_API_URL}`;

// Get all calls
export const getCalls = async () => {
  return await axios.get(`${apiUrl}/calls`);
};
// Create a new call
export const CreateCall = async (title: string) => {
  return await axios.post(`${apiUrl}/calls`, { title });
};
// Assign tag
export const AssignTag = async (callId: string, tagId: string) => {
  return await axios.patch(`${apiUrl}/calls/assign-tag`, {
    _id: callId,
    tag_id: tagId,
  });
};
// Add new call task
export const addTask = async (title: string, callId: string) => {
  return await axios.post(`${apiUrl}/tasks`, { title, call_id: callId });
};
// Assign suggested task
export const assignSuggestedTask = async (taskId: string, callId: string) => {
  return await axios.post(`${apiUrl}/tasks`, {
    suggested_id: taskId,
    call_id: callId,
  });
};
// Update task status
export const updateStatus = async (taskId: string, newStatus: string) => {
  return await axios.patch(`${apiUrl}/tasks/${taskId}/status`, {
    status: newStatus,
  });
};
