import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const createSuggestedTask = async (title: string, tagsIds: string[]) => {
  const response = await axios.post(`${apiUrl}/suggested-tasks`, {
    title: title,
    tags: tagsIds,
  });
  return response;
};

export const getSuggestedTasks = async (tagsIds: string[] = []) => {
  const response = await axios.get(
    `${apiUrl}/suggested-tasks/${
      tagsIds?.length ? `?tags=${tagsIds?.join(",")}` : ""
    }`
  );
  return response;
};
