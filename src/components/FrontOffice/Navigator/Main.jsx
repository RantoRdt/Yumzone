import React, { useContext, useState } from "react"
import { PageStateContext } from "../pageState"
import FrontOfficeNavItem from "./Item"
import { Stack, Box, IconButton, Hidden, Drawer } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const FrontOfficeNav = () =>{
    const { changePage, pagesList } = useContext(PageStateContext)
    const [open, setOpen] = useState(false)
    return(
        <Stack variant="header">
            <Stack height='100%' style={{display: 'flex', width: '100%', alignItems: 'center', flexDirection: 'row', gap: '10px', justifyContent: 'space-between', background: 'transparent'}}>
                <Hidden smUp>
                    <Stack height='100%' flexDirection='row' display='flex' alignItems='center' style={{background: 'transparent'}}>
                        <IconButton onClick={()=> setOpen(!open) } variant='light_'>{open ? <CloseIcon/> : <MenuIcon/>}</IconButton>
                        <Box onClick={()=> changePage(pagesList.home) } component="img" src="/images/logo.png" alt="" style={{cursor: 'pointer', height: '75%'}}/>
                        <Drawer
                            anchor="left"
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <FrontOfficeNavItem smUpHidden/>
                        </Drawer>
                    </Stack>
                </Hidden>
                <Hidden smDown>
                    <Box onClick={()=> changePage(pagesList.home) } component="img" src="/images/logo.png" alt="" style={{cursor: 'pointer', height: '75%'}}/>
                    <FrontOfficeNavItem/>
                </Hidden>
            </Stack>
        </Stack>
    )
}

export default FrontOfficeNav