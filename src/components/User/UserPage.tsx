import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CallsMenu from "./CallsMenu";
import CallContainer from "./CallContainer";
import { useEffect, useState } from "react";
import {
  addTask,
  assignSuggestedTask,
  AssignTag,
  CreateCall,
  getCalls,
  updateStatus,
} from "../../api/callsApi";
import type Call from "../../interfaces/Call";
import ErrorModal from "../ErrorModal";
import AddNewItem from "./AddNewItem";
import type Tag from "../../interfaces/Tag";
import type CallTask from "../../interfaces/CallTask";
import type AssignedTasks from "../../interfaces/AssignedTasks";

export default function UserPage() {
  const [fetchingCalls, setFetchingCalls] = useState(true);
  const [calls, setCalls] = useState<Call[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [assignedTasksIds, setAssignedTasksIds] = useState<AssignedTasks[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCalls();
  }, []);
  const handleError = (err: any = null) => {
    setIsError(true);
    setErrorMsg(
      err?.response?.message || err?.message || "Somthing went wrong"
    );
  };
  const fetchCalls = async () => {
    try {
      const result = await getCalls();
      // Map each call to an AssignedTasks object
      const assigned = result.data.map((call: Call) => {
        const suggestedTaskIds = call.callTasks
          .filter((task: CallTask) => task.isSuggested && task.suggestedTaskId)
          .map((task: CallTask) => task.suggestedTaskId as string); // assume it's defined

        return {
          callId: call._id,
          tasksIds: suggestedTaskIds,
        };
      });
      setAssignedTasksIds(assigned);
      setCalls(result.data);
    } catch (err: any) {
      console.log(err);
      handleError(err);
    } finally {
      setFetchingCalls(false);
    }
  };
  const handleSelectCall = (id: string) => {
    const selectedCall = calls.find((call) => call._id === id);
    setSelectedId(id);
    setSelectedCall(selectedCall || null);
  };
  const handleCreateCall = async (title: string) => {
    try {
      const result = await CreateCall(
        title.charAt(0).toUpperCase() + title.slice(1)
      );
      setCalls((prev) => [...prev, result.data]);
      setSelectedId(result.data._id);
      setSelectedCall(result.data);
    } catch (err: any) {
      console.log(err);
      handleError(err);
    }
  };
  const handleAssignTag = async (tagId: string) => {
    try {
      const callId = selectedCall?._id;
      if (!callId) {
        handleError();
        return;
      }

      const result = await AssignTag(callId, tagId);
      console.log(result);
      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          call._id === result.data._id ? result.data : call
        )
      );

      setSelectedCall(result.data);
    } catch (err: any) {
      console.log(err);
      handleError(err);
    }
  };
  const addCallTask = async (title: string) => {
    try {
      const callId = selectedCall?._id;
      if (!callId) {
        handleError();
        return;
      }
      const result = await addTask(title, callId);
      renderUpdatedCalls(result.data);
    } catch (err: any) {
      console.log(err);
      handleError(err);
    }
  };
  const handleStatusChanged = async (taskId: string, newStatus: string) => {
    try {
      const result = await updateStatus(taskId, newStatus);
      setCalls((prevCalls) =>
        prevCalls.map((call) => ({
          ...call,
          callTasks: call.callTasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  status: newStatus as "Open" | "In Progress" | "Completed",
                }
              : task
          ),
        }))
      );

      setSelectedCall((prevCall) =>
        prevCall
          ? {
              ...prevCall,
              callTasks: prevCall.callTasks.map((task) =>
                task._id === taskId
                  ? {
                      ...task,
                      status: newStatus as "Open" | "In Progress" | "Completed",
                    }
                  : task
              ),
            }
          : null
      );
    } catch (err: any) {
      console.log(err);
      handleError(err);
    }
  };
  const handleAssignSuggestedTask = async (taskId: string) => {
    try {
      const callId = selectedCall?._id;
      if (!callId) {
        handleError();
        return;
      }
      const result = await assignSuggestedTask(taskId, callId);
      // Update assignedTasksIds
      setAssignedTasksIds((prev) => {
        const exists = prev.find((entry) => entry.callId === callId);
        if (exists) {
          // Avoid duplicates
          const alreadyExists = exists.tasksIds.includes(taskId);
          if (!alreadyExists) {
            return prev.map((entry) =>
              entry.callId === callId
                ? { ...entry, tasksIds: [...entry.tasksIds, taskId] }
                : entry
            );
          }
          return prev; // no change needed
        } else {
          // Add new callId entry
          return [...prev, { callId, tasksIds: [taskId] }];
        }
      });
      renderUpdatedCalls(result.data);
    } catch (err: any) {
      console.log(err);
      handleError(err);
    }
  };
  const renderUpdatedCalls = (task: CallTask) => {
    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call._id === task.callId
          ? {
              ...call,
              callTasks: [...(call.callTasks || []), task],
            }
          : call
      )
    );
    setSelectedCall((prev) =>
      prev
        ? {
            ...prev,
            callTasks: [...(prev.callTasks || []), task],
          }
        : null
    );
  };
  const handleNav = () => {
    navigate("/admin");
  };
  return (
    <>
      <div className="user-page">
        <div className="header">
          <h1>User Panel</h1>
          <Button variant="contained" onClick={handleNav}>
            Management System
          </Button>
        </div>
        <div className="user-container">
          <CallsMenu
            calls={calls}
            fetching={fetchingCalls}
            selectedId={selectedId}
            onSelect={handleSelectCall}
            onCreate={handleCreateCall}
          />
          <CallContainer
            call={selectedCall}
            assignedTasksIds={assignedTasksIds}
            onCreate={() => setOpenModal(true)}
            onAssignedTag={(tag: Tag) => handleAssignTag(tag._id)}
            onAddNewTask={(title: string) => addCallTask(title)}
            onChangeStatus={(taskId: string, newStatus: string) =>
              handleStatusChanged(taskId, newStatus)
            }
            onAssignedTask={(taskId: string) =>
              handleAssignSuggestedTask(taskId)
            }
          />
        </div>
      </div>
      <ErrorModal
        open={isError}
        message={errorMsg}
        onClose={() => {
          setErrorMsg("");
          setIsError(false);
        }}
      />
      <AddNewItem
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(callTitle: string) => handleCreateCall(callTitle)}
      />
    </>
  );
}
