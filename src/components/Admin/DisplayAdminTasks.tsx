import { useState } from "react";
import type SuggestedTask from "../../interfaces/SuggestedTask";

import { CircularProgress } from "@mui/material";
import Tag from "../Tag";
import EditModal from "../EditModal";

interface componentProp {
  tasks: SuggestedTask[];
  fetching: boolean;
  onEditTaskName: (newName: string, taskId: string) => void;
}

// All system suggested tasks list
export default function DisplayAdminTasks({
  tasks,
  fetching,
  onEditTaskName,
}: componentProp) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [clickedTask, setClickedTask] = useState<SuggestedTask | null>(null);
  return (
    <>
      <div className="all-tasks-container container">
        {fetching ? (
          <CircularProgress className="spinner" />
        ) : tasks.length === 0 ? (
          <p className="empty-msg">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              className="single-task"
              key={task._id}
              onClick={() => {
                setClickedTask(task);
                setOpenEditModal(true);
              }}
            >
              {/* Add task content here */}
              <p>{task.title}</p>

              <div className="assigned-tags">
                {task.tags.map((tag) => (
                  <Tag key={tag._id} _id={tag._id} title={tag.title} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <EditModal
        open={openEditModal}
        label="Tasks"
        onClose={() => {
          setOpenEditModal(false);
          setClickedTask(null);
        }}
        onSave={(newTitle: string) =>
          onEditTaskName(newTitle, clickedTask?._id || "")
        }
        initialValue={clickedTask?.title || ""}
      />
    </>
  );
}
