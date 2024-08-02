import { Icon, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";

const Writing = () =>{
    return <Typography className="writing" variant="received-message">
        <Icon className="writing-item" style={{ height: '25px', width: '12px' }}><CircleIcon style={{ height: '9px', width: '9px' }}/></Icon>
        <Icon className="writing-item" style={{animationDelay: '.3s', height: '25px', width: '12px' }}><CircleIcon style={{ height: '9px', width: '9px' }}/></Icon>
        <Icon className="writing-item" style={{animationDelay: '.6s', height: '25px', width: '12px' }}><CircleIcon style={{ height: '9px', width: '9px' }}/></Icon>
    </Typography>
}

export default Writing