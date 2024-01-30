import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Tooltip } from "@mui/material";
import "./UI.css";

function Logout(props) {
  return (
    <Tooltip title="LOGOUT">
      <button
        className="logout"
        style={{ display: "block" }}
        onClick={props.onClick}
      >
        <ExitToAppIcon />
      </button>
    </Tooltip>
  );
}

export default Logout;
