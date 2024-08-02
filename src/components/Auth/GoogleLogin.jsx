import React from "react";
import { googleClientId } from "../../helper/authsId";
import { LoginSocialGoogle } from "reactjs-social-login";
import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";

const GoogleLogin = () =>{
    const { googleLogin } = useAuth()
    return(
        <LoginSocialGoogle
            client_id={googleClientId}
            onResolve={async resp => await googleLogin(resp)}
            onReject={()=>{}}
        >
            <Button style={{ width: '100%' }}>Google</Button>
        </LoginSocialGoogle>
    )
}

export default GoogleLogin