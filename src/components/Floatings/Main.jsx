import React from "react";
import { Stack } from "@mui/material";
import ThemeSwitcher from './ThemeSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import Chatbot from "./Chatbot/Main";
import { isAdminSubdomain } from "../../helper/subdomains";

const FloatingComponents = () => {
    return(
        <Stack style={{display: 'flex', position: 'fixed', right: '5%', bottom: '5%', gap: '10px', background: 'transparent', alignItems: 'flex-end', zIndex: 4}}>
            <LanguageSwitcher/>
            <ThemeSwitcher/>
            { !isAdminSubdomain() && <Chatbot/> }
        </Stack>
    )
}
export default FloatingComponents