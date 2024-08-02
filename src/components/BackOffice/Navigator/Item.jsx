import React from "react";
import { ListItemIcon, ListItemText, ListItem } from "@mui/material";

const BackOfficeNavItem = ({ label, Icon }) => {
    return(
        <ListItem style={{maxHeight: '50px', padding:'15px'}}>
            <ListItemIcon ><Icon/></ListItemIcon>
            <ListItemText primary={label} sx={{whiteSpace: 'nowrap'}}/>
        </ListItem>
    )
}

export default BackOfficeNavItem