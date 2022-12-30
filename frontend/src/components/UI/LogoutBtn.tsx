import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router";

const LogoutBtn = () => {
  const [logout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  return (
    <div className="absolute right-4">
      <IconButton onClick={logoutHandler}>
        <Tooltip title="Вийти" className="text-blue">
          <LogoutIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
};

export default LogoutBtn;
