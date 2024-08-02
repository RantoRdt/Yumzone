import React from "react";
import useAuth from "../../hooks/useAuth"
import { useForm } from 'react-hook-form'
import ControlledInput from "../tools/ControlledInput"
import { Typography } from "@mui/material";
import Submit from "../tools/Submit";
import useLanguage from "../../hooks/useLanguage";
import useFeedback from "../../hooks/useFeedback";
import { LockOutlined, MailOutlined, PersonOutlined } from "@mui/icons-material";

const SignUp = () => {
    const { control, handleSubmit, formState: {errors} } = useForm()
    const { signUp } = useAuth()
    const { Feedback } = useFeedback()
    const {text} = useLanguage()
    return(
        <>
            <Typography variant="h5" textAlign='center'>{text.signupto} </Typography>
            <ControlledInput type="text" control={control} name="username" placeholder={text.username} icon={<PersonOutlined/>} error={errors.username}/>
            <ControlledInput type="email" control={control} name="mail" placeholder={text.email} icon={<MailOutlined/>} error={errors.mail}/>
            <ControlledInput type="password" control={control} name="password" placeholder={text.password} icon={<LockOutlined/>} error={errors.password}/>
            <ControlledInput type="password" control={control} name="cpassword" placeholder={text.cpassword} icon={<LockOutlined/>} error={errors.password}/>
            <Feedback/>
            <Submit onClick={handleSubmit(signUp)}>{text.signup}</Submit>
        </>
    )
}

export default SignUp