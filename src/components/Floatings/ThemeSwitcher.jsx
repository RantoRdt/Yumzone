import React, { useContext } from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { IconButton, Tooltip } from "@mui/material";
import { ThemeStateContext } from "../../theme/themeState";
import useLanguage from "../../hooks/useLanguage";

const ThemeSwitcher = () =>{
    const { isDark, switchTheme } = useContext(ThemeStateContext)
    const { text } = useLanguage()
    return(
        <Tooltip title={isDark ? text.switchtolightmode : text.switchtodarkmode} placement="left-end">
            <IconButton variant="floating" onClick={switchTheme}>{isDark ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/>}</IconButton>
        </Tooltip>
    )
}
export default ThemeSwitcher