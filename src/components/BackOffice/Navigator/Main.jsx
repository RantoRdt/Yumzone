import React, { useContext } from "react";
import Orders from '../Comps/Orders'
import Menu from '../Comps/Menu'
import Sales from '../Comps/Sales'
import Infos from "../Comps/Infos";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import BackOfficeNavItem from "./Item";
import { Box, Stack, Typography, Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Logout from '../../Auth/Logout'
import useLanguage from "../../../hooks/useLanguage";
import { PageStateContext } from "../../FrontOffice/pageState";
import { fastfoodname } from "../../../helper/conf";

const BackOfficeNav = ({setComp, smUpHidden=false}) =>{
    const {text} = useLanguage()
    const { bopageState, pagesList, boChangePage } = useContext(PageStateContext)
    const handleNav = value =>{
        boChangePage(value)
        switch (value){
            case pagesList.orders: setComp(<Orders/>); break
            case pagesList.bomenu: setComp(<Menu/>); break
            case pagesList.sales: setComp(<Sales/>); break
            case pagesList.infos: setComp(<Infos/>); break
            default: 
        }
    }
    return <>
        <Stack style={{background: 'transparent'}}>
            <Stack height='65px' style={{background: 'transparent'}} flexDirection='row' gap='20px' alignItems='center' padding='0 15px'>
                <Box component="img" src="/images/logo.png" alt="" sx={{cursor: 'pointer', width: '50px'}}/>
                <Typography>{fastfoodname}</Typography>
            </Stack>
            <ToggleButtonGroup
                orientation={'vertical'}
                value={bopageState}
                exclusive
                onChange={(e, newState) => { if (Boolean(newState)) handleNav(newState) }}
            >
                <ToggleButton value={pagesList.orders} variant="back-nav"><BackOfficeNavItem label={text.orders} Icon={ReceiptOutlinedIcon} /></ToggleButton>
                <ToggleButton value={pagesList.bomenu} variant="back-nav"><BackOfficeNavItem label={text.menu} Icon={LocalDiningIcon} /></ToggleButton>
                <ToggleButton value={pagesList.sales} variant="back-nav"><BackOfficeNavItem label={text.sales} Icon={PaidOutlinedIcon} /></ToggleButton>
                <ToggleButton value={pagesList.infos} variant="back-nav"><BackOfficeNavItem label={text.infos} Icon={InfoOutlinedIcon} /></ToggleButton>
            </ToggleButtonGroup>
        </Stack>
        { smUpHidden ? <Divider /> : <></> }
        <Logout isAdmin/>   
    </>
}

export default BackOfficeNav