import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import type CallTask from "../../interfaces/CallTask";
import { useState } from "react";
import AddNewItem from "./AddNewItem";

interface UserTasksProps {
  tasks: CallTask[];
  onSaveTask: (title: string) => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
}
// Custome tasks list - created by the user
export default function UserTasks({
  tasks,
  onSaveTask,
  onStatusChange,
}: UserTasksProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="user-tasks-container">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          New
        </Button>
      </div>
      <div className="tasks-wrapper container">
        {!tasks || tasks.length === 0 ? (
          <p className="empty-msg tasks">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div className="task-item container" key={task._id}>
              <p>{task.title}</p>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  value={task.status}
                  onChange={(event) =>
                    onStatusChange(task._id, event.target.value)
                  }
                  sx={{
                    border: `2px solid ${
                      task.status === "Open"
                        ? "#e2453c"
                        : task.status === "In Progress"
                        ? "#f8cd19"
                        : "#4caf50"
                    }`,
                    "& .MuiSelect-select": {
                      padding: "8px 14px",
                    },
                    // Disable focus ring & border highlight
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    // Remove box-shadow and highlight when focused
                    "&.Mui-focused": {
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </div>
          ))
        )}
      </div>
      <AddNewItem
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(newTitle: string) => onSaveTask(newTitle)}
      />
    </div>
  );
}
