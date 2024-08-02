import React, { useEffect, useContext } from "react";
import { Stack, Typography, IconButton, Icon, Box, Divider } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from "react-redux";
import { fetchRestInfo } from "../../../redux/actions";
import { ThemeStateContext } from "../../../theme/themeState";
import { PageStateContext } from "../pageState";
import useMoment from '../../../hooks/useMoment'

const Footer = () =>{
    const dispatch = useDispatch()
    const { isDark } = useContext(ThemeStateContext)
    const { changePage, pagesList } = useContext(PageStateContext)
    const restInfo = useSelector(state => state.restInfo)
    const { weeklyDay, timeFormat } = useMoment()
    
    useEffect(()=>{ dispatch(fetchRestInfo()) }, [])
    
    return(
        <Stack id="contacts" variant="footer" style={{width: '100%'}} >
            <Stack variant="container" style={{height: isDark ? '0px' : '100px'}}><Box component='img'  src={'/svg/wave2.svg'} alt="" sx={{height: '100%'}}/></Stack>
            <Stack style={{padding: "0 0 10px 0"}} spacing={2}>
                <Stack flexDirection='row' display='flex' alignItems='center' flexWrap='wrap' justifyContent='space-evenly' gap='25px' >
                    <Box onClick={()=> changePage(pagesList.home) } component="img" src="/images/logo.png" alt="" sx={{cursor: 'pointer', width: '10%'}}/>
                    <Divider orientation="vertical" flexItem />
                    <Stack flexDirection='row' gap='5px'  ><Icon><PlaceIcon/></Icon><Typography>{restInfo.place}</Typography></Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack flexDirection='row' gap='5px' alignItems='center'  ><Icon><PhoneIcon/></Icon><Typography>{restInfo.phone}</Typography></Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack flexDirection='row' gap='5px' alignItems='center'  >
                        <Icon><DateRangeIcon/></Icon>
                        <Stack>{
                            restInfo.schedule?.map((a, i) => 
                            <Typography key={`a${i}`}>{`${weeklyDay(a.day)} : ${timeFormat(a.from)} - ${timeFormat(a.to)}`}</Typography> ) 
                        }</Stack>
                    </Stack>
                </Stack>
                <Stack display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap='30px' >
                    <IconButton size="medium" color="secondary"><FacebookIcon fontSize="inherit"/></IconButton>
                    <IconButton size="medium" color="secondary"><XIcon fontSize="inherit"/></IconButton>
                    <IconButton size="medium" color="secondary"><LinkedInIcon fontSize="inherit"/></IconButton>
                </Stack>
                <Typography alignSelf='center'>©2024</Typography>         
            </Stack>
        </Stack>
    )
}

export default Footer