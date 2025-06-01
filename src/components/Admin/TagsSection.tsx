import { useState, type BaseSyntheticEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import { createTag, updateTag } from "../../api/tagsApi";
import EditModal from "../EditModal";
import ErrorModal from "../ErrorModal";
import { CircularProgress } from "@mui/material";
import type Tag from "../../interfaces/Tag";
import { useTags } from "../../context/tagContext";

export default function TagsSection() {
  const [loading, setLoading] = useState(false);

  const { tags, refreshTags, addTag, updateTagInState, showSpinner } =
    useTags();
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  const [errorModalText, setErrorModalText] = useState("");

  const upperCaseFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleChange = (event: BaseSyntheticEvent) => {
    setInputValue(upperCaseFirstLetter(event.target.value));
  };
  // Submit new tag
  const handleClick = async () => {
    try {
      if (!inputValue.trim()) {
        setIsError(true);
        setErrorMsg("Title is required");
        return;
      }
      setIsError(false);
      setErrorMsg("");
      setLoading(true);
      const result = await createTag(inputValue);
      console.log(result);
      await refreshTags();
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        setErrorModalText(err.message);
      } else {
        setIsError(true);
        setErrorMsg(upperCaseFirstLetter(err.response.data.error));
      }
    } finally {
      setLoading(false);
      setInputValue("");
    }
  };
  // Open modal to change tag name
  const handleEditClick = async (tag: Tag) => {
    setCurrentTag(tag);
    setOpenEdit(true);
  };
  // Submit new tag name
  const handleSave = async (newTitle: string) => {
    try {
      if (!currentTag) return;
      console.log(newTitle);
      const upperCaseTitle = upperCaseFirstLetter(newTitle);
      currentTag.title = upperCaseTitle;
      const result = await updateTag(currentTag._id, upperCaseTitle);
      updateTagInState(result.data);
    } catch (err: any) {
      setErrorModalText("Somthing went wrong while editing the tag!");
      console.log(err);
    }
  };
  return (
    <section id="tags">
      <h1>Tags</h1>
      <div className="tags-form container">
        <TextField
          id="outlined-input"
          label="Tags Title"
          placeholder="Enter a title"
          value={inputValue}
          onChange={handleChange}
          error={isError}
          helperText={errorMsg}
        />
        <Button
          onClick={handleClick}
          endIcon={<SendIcon />}
          variant="contained"
          disabled={loading}
        >
          Add
        </Button>
      </div>

      <div className="tags-container container">
        {showSpinner ? (
          <CircularProgress className="spinner" />
        ) : !tags.length ? (
          <p className="empty-msg">No tags yet</p>
        ) : (
          <div className="tags-list">
            {tags.map((tag) => (
              <div className="single-tag" key={tag._id}>
                <p>{tag.title}</p>
                <EditIcon
                  onClick={() => handleEditClick(tag)}
                  sx={{
                    transition: "all 0.3s ease-in-out ",
                    "&:hover": {
                      transform: "scale(1.2)",
                      cursor: "pointer",
                    },
                  }}
                />
              </div>
            ))}
            <EditModal
              open={openEdit}
              label="Tags"
              onClose={() => setOpenEdit(false)}
              onSave={handleSave}
              initialValue={currentTag?.title || ""}
            />
          </div>
        )}
      </div>
      <ErrorModal
        open={errorModalText.trim() !== ""}
        message={errorModalText}
        onClose={() => setErrorModalText("")}
      />
    </section>
  );
}
