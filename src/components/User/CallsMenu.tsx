import { useState } from "react";

import type Call from "../../interfaces/Call";
import { Button, CircularProgress } from "@mui/material";
import AddNewItem from "./AddNewItem";

interface CallsMenuProps {
  calls: Call[];
  fetching: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: (title: string) => void;
}
// All calls list
export default function CallsMenu({
  calls,
  fetching,
  selectedId,
  onSelect,
  onCreate,
}: CallsMenuProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleSelect = (id: string) => {
    onSelect(id);
  };
  const handleAddCall = () => {
    setOpenModal(true);
  };
  const handleSubmitCall = (callTitle: string) => {
    onCreate(callTitle);
  };
  return (
    <>
      <div className="calls-menu container">
        <div className="menu-header">
          <h1>Calls</h1>
          <Button variant="contained" onClick={handleAddCall}>
            Add Call
          </Button>
        </div>

        {fetching ? (
          <CircularProgress className="spinner" />
        ) : calls.length ? (
          calls.map((call) => (
            <div
              className={`single-call ${
                selectedId === call._id ? "selected" : ""
              }`}
              key={call._id}
              onClick={() => handleSelect(call._id)}
            >
              <p>{call.title}</p>
            </div>
          ))
        ) : (
          <p className="empty-msg">No calls yet</p>
        )}
      </div>
      <AddNewItem
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(newTitle: string) => handleSubmitCall(newTitle)}
      />
    </>
  );
}
