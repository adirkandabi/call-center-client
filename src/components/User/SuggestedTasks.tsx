import { AddCircleOutline } from "@mui/icons-material";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import type SuggestedTask from "../../interfaces/SuggestedTask";
import type AssignedTasks from "../../interfaces/AssignedTasks";

interface SuggestedTasksProp {
  suggestedTasks: SuggestedTask[] | null;
  assignedTasksIds: AssignedTasks[];
  callId: string;
  onAddTask: (taskId: string) => void;
}
// Admin suggested tasks list by assigned tags
export default function SuggestedTasks({
  suggestedTasks,
  assignedTasksIds,
  callId,
  onAddTask,
}: SuggestedTasksProp) {
  return (
    <div className="suggested-tasks-container">
      <div className="tasks-header">
        <h1>Suggested Tasks</h1>
      </div>
      <div className="suggested-tasks-wrapper container">
        {!suggestedTasks || suggestedTasks.length === 0 ? (
          <p className="empty-msg tasks">No suggested tasks</p>
        ) : (
          suggestedTasks.map((task) => (
            <div className="task-item container" key={task._id}>
              <p>{task.title}</p>
              {assignedTasksIds.some(
                (entry) =>
                  entry.callId === callId &&
                  entry.tasksIds.some((taskId) => taskId === task._id)
              ) ? (
                <CheckCircleOutlineOutlined sx={{ color: "green" }} />
              ) : (
                <AddCircleOutline
                  className="add-btn"
                  onClick={() => onAddTask(task._id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
