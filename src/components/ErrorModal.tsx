import { Modal, Box, Typography, Button } from "@mui/material";

interface ErrorModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}
// Default erro modal
export default function ErrorModal({
  open,
  message,
  onClose,
}: ErrorModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: "inherit",
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: 2,
          boxShadow: 5,
          p: 4,
          width: 350,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
