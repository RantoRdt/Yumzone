import React, { useState, useContext } from "react"
import { Stack, Typography, Button, Divider } from "@mui/material"
import useLanguage from "../../hooks/useLanguage"
import Login from "./Login"
import SignUp from "./SignUp"
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin"
import { PageStateContext } from '../FrontOffice/pageState'

const Auth = ({isAdmin=false}) => {
    const {text} = useLanguage()
    const [ isLogin, setIsLogin ] = useState(true)
    const { changePage, pagesList } = useContext(PageStateContext)

    return(
        <Stack variant="all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack spacing={3}>
                { isLogin ? <Login isAdmin={isAdmin}/> : <SignUp/> }
                { !isAdmin &&  <Button variant="outlined" onClick={()=> setIsLogin(!isLogin)}>{isLogin ? text.signup : text.login}</Button> }
                <Button variant="outlined" onClick={()=> changePage( isAdmin ? pagesList.admintomain : pagesList.logintomain)}>{text.backtohome}</Button>
                {
                    !isAdmin && <>
                        <Divider><Typography>{text.orloginwith}</Typography></Divider>
                        <GoogleLogin/>
                        <FacebookLogin/>
                    </>
                }
            </Stack>
        </Stack>
    )
}

export default Auth