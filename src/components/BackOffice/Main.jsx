import React, { useState } from "react";
import { Stack, IconButton, List, Drawer, Hidden, Box } from "@mui/material";
import BackOfficeNav from './Navigator/Main'
import Orders from './Comps/Orders'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Admin = () => {
    const [expanded, setExpanded] = useState(true)
    const [comp, setComp] = useState(<Orders/>)

    return(
        <Stack flexDirection='row' variant='all' style={{ padding: '5px  ', boxSizing: 'border-box'}}>
            <Stack style={{transition: '1s', width: expanded ? '100%' : '80px', maxWidth: 'max-content'}} height='100%'>
                <Hidden smDown>
                    <Stack width='100%' height='100%' style={{overflow: 'hidden', borderRadius: '0 28px 28px 0'}} variant="sidebar">
                        <List sx={{height:"100vh", display: "flex", justifyContent: "space-between", flexDirection: 'column'}}>                       
                            <BackOfficeNav setComp={setComp}/>
                        </List>
                    </Stack>
                </Hidden>  
                <Hidden smUp>
                    <Drawer
                        anchor="left"
                        open={expanded}
                        onClose={() => setExpanded(false)}
                    >
                        <BackOfficeNav setComp={setComp} smUpHidden/>
                    </Drawer>
                </Hidden>  

            </Stack>
            <Hidden smDown>
                <Stack style={{height: '85px', left: '100%',display: 'flex',  alignItems:'center', justifyContent: "center",}}>
                    <Stack style={{height: '40px', width: '30px', borderRadius: '0 50% 50% 0', overflow: 'hidden'}}>
                        <Stack variant="sidebar">
                            <IconButton onClick={() =>  setExpanded(!expanded) }><ChevronLeftIcon sx={{ transition: '.75s', transform: expanded ? 'none' : 'scaleX(-1)'}}/></IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Hidden>
            <Stack height='100%' width='100%'>
                <Hidden smUp>
                    <Stack display='flex' flexDirection='row' alignItems='center'>
                    <IconButton onClick={()=> setExpanded(!expanded) }>{expanded ? <CloseIcon/> : <MenuIcon/>}</IconButton>
                        <Box component="img" src="/images/logo.png" alt="" sx={{cursor: 'pointer', width: '50px'}}/>
                        <Stack height='65px' style={{background: 'transparent'}} flexDirection='row' gap='20px' alignItems='center' padding='0 15px'>
                        </Stack>
                    </Stack>
                </Hidden>
                {comp}
            </Stack>
        </Stack>
    )
}

export default Admin