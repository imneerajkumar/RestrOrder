import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Tooltip } from '@material-ui/core';
import './UI.css';

function Logout(props) {
  return (
    <Tooltip title="LOGOUT">
      <button 
        className='logout' 
        style={{display: "block"}}
        onClick={props.onClick}
      >
        <ExitToAppIcon />  
      </button>
    </Tooltip>
  );
}

export default Logout;