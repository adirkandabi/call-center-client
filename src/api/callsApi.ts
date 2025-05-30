import axios from "axios";
const apiUrl = `${import.meta.env.VITE_API_URL}/calls`;

export const getCalls = async () => {
  return await axios.get(apiUrl);
};
export const CreateCall = async (title: string) => {
  return await axios.post(apiUrl, { title });
};
