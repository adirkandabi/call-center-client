import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getTags = async () => {
  const response = await axios.get(`${apiUrl}/tags`);
  return response;
};

export const createTag = async (title: string) => {
  const response = await axios.post(`${apiUrl}/tags`, { title });
  return response;
};

export const updateTag = async (id: string, title: string) => {
  const response = await axios.put(`${apiUrl}/tags`, { _id: id, title });
  return response;
};
