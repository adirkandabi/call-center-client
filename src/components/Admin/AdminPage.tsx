import AdminTasksSection from "./AdminTasksSection";
import TagsSection from "./TagsSection";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="admin-page">
      <div className="header">
        <h1>Admin Page</h1>
        <Button variant="contained" onClick={handleClick}>
          User Panel
        </Button>
      </div>
      <div className="admin-container">
        <TagsSection />
        <AdminTasksSection />
      </div>
    </div>
  );
}
