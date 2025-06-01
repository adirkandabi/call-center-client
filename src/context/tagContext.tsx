import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getTags } from "../api/tagsApi";
import type Tag from "../interfaces/Tag";

interface TagsContextType {
  tags: Tag[];
  refreshTags: () => void;
  addTag: (tag: Tag) => void;
  updateTagInState: (tag: Tag) => void;
  showSpinner: boolean;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const refreshTags = async () => {
    try {
      const response = await getTags();
      setTags(response.data);
    } catch (err) {
      console.error("Failed to fetch tags", err);
    } finally {
      setShowSpinner(false);
    }
  };
  const updateTagInState = (updatedTag: Tag) => {
    setTags((prev) =>
      prev.map((tag) => (tag._id === updatedTag._id ? updatedTag : tag))
    );
  };
  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };
  useEffect(() => {
    refreshTags();
  }, []);

  return (
    <TagsContext.Provider
      value={{ tags, refreshTags, addTag, updateTagInState, showSpinner }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) throw new Error("useTags must be used inside TagsProvider");
  return context;
};
