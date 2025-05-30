import { useEffect, useState } from "react";
import { CreateCall, getCalls } from "../../api/callsApi";
import ErrorModal from "../ErrorModal";
import type Call from "../../interfaces/Calls";
import { Button } from "@mui/material";
import AddNewItem from "./AddNewItem";

export default function CallsMenu() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [calls, setCalls] = useState<Call[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const result = await getCalls();
      setCalls(result.data);
      console.log(calls);
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setErrorMsg(err.response.message);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };
  const handleAddCall = () => {
    setOpenModal(true);
  };
  const handleSubmitCall = async (callTitle: string) => {
    try {
      const result = await CreateCall(
        callTitle.charAt(0).toUpperCase() + callTitle.slice(1)
      );
      setCalls((prev) => [...prev, result.data]);
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setErrorMsg(err.response.message);
    }
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
        {calls.length ? (
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
        onSave={(callTitle: string) => handleSubmitCall(callTitle)}
      />
      <ErrorModal
        open={isError}
        message={errorMsg}
        onClose={() => {
          setErrorMsg("");
          setIsError(false);
        }}
      />
    </>
  );
}
