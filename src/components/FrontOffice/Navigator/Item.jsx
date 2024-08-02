import React, {useContext} from "react"
import { ToggleButton, ToggleButtonGroup, Divider, Button, Stack, Typography } from "@mui/material"
import useLanguage from "../../../hooks/useLanguage"
import { PageStateContext } from "../pageState"

const FrontOfficeNavItem = ({smUpHidden=false}) =>{
    const { pageState, changePage, pagesList } = useContext(PageStateContext)
    const {text} = useLanguage()
    return(
        <Stack flexDirection={ smUpHidden ? "column" : "row"} style={{gap: smUpHidden ? '0px': '40px', background: 'transparent'}}>
            <ToggleButtonGroup
                orientation={smUpHidden ? 'vertical' : 'horizontal'}
                value={pageState}
                exclusive
                onChange={(e, newState) => { if (Boolean(newState)) changePage(newState) }}
                style={{ gap: smUpHidden ? '0px': '40px', padding: smUpHidden ? '10px 0px' : '0px' }}

            >
                <ToggleButton value={pagesList.home} variant={ smUpHidden ? "back-nav" : "nav"}><Typography>{text.home}</Typography></ToggleButton>
                <ToggleButton value={pagesList.menu} variant={ smUpHidden ? "back-nav" : "nav"}><Typography>{text.menu}</Typography></ToggleButton>
                <ToggleButton value={pagesList.contact} variant={ smUpHidden ? "back-nav" : "nav"}><Typography>{text.contacts}</Typography></ToggleButton>
            </ToggleButtonGroup>
            { smUpHidden ? <Divider /> : <></> }
            <Button onClick={() => changePage(pagesList.login)} variant={smUpHidden ? "text" : "contained"}>{text.login}</Button>
        </Stack>
    )
}

export default FrontOfficeNavItem