import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CallsMenu from "./CallsMenu";

export default function UserPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };
  return (
    <div className="user-page">
      <div className="header">
        <h1>User Page</h1>
        <Button variant="contained" onClick={handleClick}>
          Management System
        </Button>
      </div>
      <div className="user-container">
        <CallsMenu />
      </div>
    </div>
  );
}
