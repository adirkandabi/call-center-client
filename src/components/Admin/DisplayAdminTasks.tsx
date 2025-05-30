import { useEffect, useState } from "react";
import type SuggestedTask from "../../interfaces/SuggestedTask";
import { getSuggestedTasks } from "../../api/suggestedTasksApi";
import { CircularProgress } from "@mui/material";
import Tag from "../Tag";

interface componentProp {
  tasks: SuggestedTask[];
  fetching: boolean;
}

export default function DisplayAdminTasks({ tasks, fetching }: componentProp) {
  return (
    <div className="all-tasks-container container">
      {fetching ? (
        <CircularProgress style={{ marginTop: "3rem" }} />
      ) : tasks.length === 0 ? (
        <p className="empty-msg">No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <div className="single-task" key={task._id}>
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
  );
}
