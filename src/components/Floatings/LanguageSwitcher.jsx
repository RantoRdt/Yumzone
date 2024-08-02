import React from "react";
import { SpeedDial, SpeedDialAction, Tooltip } from "@mui/material";
import { FR, GB } from 'country-flag-icons/react/3x2'
import useLanguage from '../../hooks/useLanguage'
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher = () =>{
    const { text, changeLanguage } = useLanguage()
    return(
        <Tooltip title={text.changelanguage} placement="left-end">
            <SpeedDial icon={<LanguageIcon/>} ariaLabel="Language" style={{alignItems: 'flex-end'}}>
                <SpeedDialAction onClick={()=> changeLanguage('en')} icon={<GB style={{height: '15px'}}/>} tooltipTitle={text.english}/>
                <SpeedDialAction onClick={()=> changeLanguage('fr')} icon={<FR style={{height: '15px'}}/>} tooltipTitle={text.french}/>
            </SpeedDial>
        </Tooltip>
    )
}
export default LanguageSwitcher