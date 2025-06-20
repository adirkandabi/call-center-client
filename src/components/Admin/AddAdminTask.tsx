import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tag from "../Tag";
import TagsMenu from "../TagsMenu";
import { useState, type BaseSyntheticEvent } from "react";
import type TagType from "../../interfaces/Tag";
import { createSuggestedTask } from "../../api/suggestedTasksApi";
import ErrorModal from "../ErrorModal";
import { useTags } from "../../context/tagContext";

interface AddTaskFormProps {
  onTaskCreated: (task: any) => void;
}

export default function AddAdminTask({ onTaskCreated }: AddTaskFormProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [chosenTags, setChosenTags] = useState<TagType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorModalText, setErrorModalText] = useState("");
  const { tags } = useTags();

  const openTagMenu = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.target);
  };
  const closeTagMenu = () => setAnchorEl(null);

  const handleTagSelect = (tag: TagType) => {
    setChosenTags([...chosenTags, tag]);
  };
  const handleChange = (event: BaseSyntheticEvent) => {
    const input = event.target.value;
    setInputValue(input.charAt(0).toUpperCase() + input.slice(1));
  };
  // Submit a new suggested task
  const handleSubmit = async () => {
    try {
      setIsError(false);
      setErrorMsg("");
      setLoading(true);
      // Validation
      if (!inputValue.trim()) {
        setIsError(true);
      } else if (!chosenTags.length) {
        setErrorMsg("At least one tag is required");
      } else {
        const tagsIds = chosenTags.map((tag) => tag._id);
        const result = await createSuggestedTask(inputValue, tagsIds);
        onTaskCreated(result.data);
        setChosenTags([]);
        setInputValue("");
      }
    } catch (err: any) {
      console.log(err);
      setErrorModalText(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="add-task-form container">
        <div className="title-row">
          <TextField
            id="outlined-input"
            label={isError ? "Task title is required" : "Task Title"}
            placeholder="Enter a title"
            sx={{ width: "100%" }}
            value={inputValue}
            onChange={handleChange}
            error={isError}
          />
          <Button
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            variant="contained"
            //disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
        <div className="tags-row">
          <h2>Tags</h2>
          <div className="chosen-tags">
            {chosenTags.map((tag) => (
              <Tag key={tag._id} _id={tag._id} title={tag.title} />
            ))}
            {chosenTags.length === tags.length ? (
              ""
            ) : (
              <AddCircleOutlineIcon onClick={openTagMenu} className="add-btn" />
            )}
          </div>
          <TagsMenu
            anchorEl={anchorEl}
            onClose={closeTagMenu}
            onSelect={(tag: TagType) => {
              handleTagSelect(tag);
              setErrorMsg("");
            }}
            selectedTags={chosenTags}
          />
        </div>
        {errorMsg ? <p style={{ color: "#d32f2f" }}>{errorMsg}</p> : ""}
      </div>
      <ErrorModal
        open={errorModalText.trim() !== ""}
        message={errorModalText}
        onClose={() => setErrorModalText("")}
      />
    </>
  );
}
