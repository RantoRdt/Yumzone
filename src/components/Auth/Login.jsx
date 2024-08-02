import React from "react";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import useAuth from "../../hooks/useAuth"
import { useForm } from 'react-hook-form'
import ControlledInput from "../tools/ControlledInput"
import { Typography } from "@mui/material";
import useLanguage from "../../hooks/useLanguage";
import Submit from "../tools/Submit";
import useFeedback from "../../hooks/useFeedback";
import { fastfoodname } from "../../helper/conf";
import { LockOutlined } from "@mui/icons-material";

const Login = ({isAdmin=false}) => {
    const { control, handleSubmit, formState: {errors} } = useForm()
    const { login, feedback } = useAuth()
    const {text} = useLanguage()
    const { Feedback } = useFeedback()
    return(
        <>
            <Typography variant="h5" textAlign='center'>{ isAdmin ? text.connectasadminto : text.connectto} {fastfoodname}</Typography>
            <ControlledInput type="email" control={control} name="mail" placeholder={text.email} icon={<MailOutlinedIcon/>} error={errors.mail}/>
            <ControlledInput type="password" control={control} name="password" placeholder={text.password} icon={<LockOutlined/>} error={errors.password}/>
            <Feedback/>
            <Submit onClick={handleSubmit(data => login(data, isAdmin))} feedback={feedback}>{text.login}</Submit>
        </>
    )
}

export default Login