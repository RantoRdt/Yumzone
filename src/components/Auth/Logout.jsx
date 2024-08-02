import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import useLanguage from '../../hooks/useLanguage'
import BackOfficeNavItem from "../BackOffice/Navigator/Item";
import { Typography, Button, Dialog, DialogContent, DialogActions, Grow, ToggleButton } from "@mui/material";

const Logout = ({isAdmin=false}) => {
    const { logout } = useAuth()
    const { text } = useLanguage()
    const [ confirm, setConfirm ] = useState(false)
    return isAdmin ?
        <>
            <ToggleButton value='logout' variant="back-nav" onClick={()=> setConfirm(true)}><BackOfficeNavItem label={text.logout} Icon={LogoutIcon} /></ToggleButton>
            <Grow in={confirm}>
                <Dialog
                    open={confirm}
                    keepMounted
                    onClose={() => setConfirm(false)}
                >
                    <DialogContent><Typography>{text.qlogout}</Typography></DialogContent>
                    <DialogActions>
                        <Button variant="text" onClick={()=> logout(isAdmin)} style={{width: '50%'}}>{text.yes}</Button>
                        <Button variant="outlined" onClick={()=> setConfirm(false)} style={{width: '50%'}}>{text.no}</Button>
                    </DialogActions>
                </Dialog>
            </Grow>
        </>
        : <Button variant="contained" style={{width: 'fit-content'}} onClick={()=> logout(isAdmin)}>{text.logout}</Button>     
    
} 

export default Logout