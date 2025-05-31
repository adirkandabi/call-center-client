import type Call from "../../interfaces/Call";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tag from "../Tag";
import { useState, type BaseSyntheticEvent } from "react";
import TagsMenu from "../TagsMenu";
import type TagType from "../../interfaces/Tag";
import UserTasks from "./UserTasks";
import SuggestedTasks from "./SuggestedTasks";
import type AssignedTasks from "../../interfaces/AssignedTasks";

interface CallProp {
  call: Call | null;
  assignedTasksIds: AssignedTasks[];
  onCreate: () => void;
  onAssignedTag: (tag: TagType) => void;
  onAddNewTask: (title: string) => void;
  onChangeStatus: (taskId: string, newStatus: string) => void;
  onAssignedTask: (taskId: string) => void;
}

export default function CallContainer({
  call,
  assignedTasksIds,
  onCreate,
  onAssignedTag,
  onAddNewTask,
  onChangeStatus,
  onAssignedTask,
}: CallProp) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [callTags, setCallTags] = useState<TagType[] | undefined>(call?.tags);
  const handleNewCall = () => {
    onCreate();
  };
  const handleClickNewTag = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.target);
  };
  const closeTagMenu = () => {
    setAnchorEl(null);
  };
  const handleAssingedTag = (tag: TagType) => {
    onAssignedTag(tag);
  };
  return (
    <div className="call-container container">
      {!call ? (
        <p className="empty-msg new-call" onClick={handleNewCall}>
          Create a new call <AddCircleOutlineIcon sx={{ marginTop: "3px" }} />
        </p>
      ) : (
        <>
          <h1>{call.title}</h1>
          <div className="call-tags-container container">
            <h2>Calls: </h2>
            <div className="call-tags-list">
              {call.tags?.map((tag) => (
                <Tag key={tag._id} _id={tag._id} title={tag.title} />
              ))}
              <AddCircleOutlineIcon
                onClick={handleClickNewTag}
                className="add-btn"
              />
            </div>
          </div>
        </>
      )}
      <TagsMenu
        anchorEl={anchorEl}
        onClose={closeTagMenu}
        onSelect={(tag: TagType) => handleAssingedTag(tag)}
        selectedTags={call?.tags}
      />
      {call ? (
        <div className="tasks-container">
          <UserTasks
            tasks={call.callTasks}
            onSaveTask={(title: string) => onAddNewTask(title)}
            onStatusChange={(taskId: string, newStatus: string) =>
              onChangeStatus(taskId, newStatus)
            }
          />
          <SuggestedTasks
            suggestedTasks={call.suggestedTasks}
            assignedTasksIds={assignedTasksIds}
            callId={call._id}
            onAddTask={(taskId: string) => onAssignedTask(taskId)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
