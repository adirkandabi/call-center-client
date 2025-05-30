import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newTitle: string) => void;
}

export default function AddNewItem({ open, onClose, onSave }: AddModalProps) {
  const [value, setValue] = useState("");

  const handleSave = () => {
    onSave(value.trim());
    onClose();
    setValue("");
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "inherit",
          backdropFilter: "blur(1px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 14,
          p: 4,
          borderRadius: 2,
          minWidth: 300,
        }}
      >
        <div className="tags-form">
          <TextField
            id="outlined-input"
            label="Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={handleSave}
            endIcon={<SendIcon />}
            variant="contained"
            disabled={!value.trim()}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
