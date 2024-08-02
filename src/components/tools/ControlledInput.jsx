import React, { useState } from "react"
import { Stack, OutlinedInput, InputAdornment, IconButton, Icon, Alert } from "@mui/material"
import { Controller } from "react-hook-form"
import useLanguage from "../../hooks/useLanguage"
import { VisibilityOutlined } from "@mui/icons-material"
import { VisibilityOffOutlined } from "@mui/icons-material"

const ControlledInput = ({type='text', control, name, placeholder='', inputProps={}, error, required=true, icon= <></>, startAdornment, mini=false, defaultValue="", maskErrorText=false}) =>{
    const {text} = useLanguage()
    const isPassword = type === 'password'
    const initialType = (type === 'password') ? 'text' : type
    const [vis, setVis] = useState(!isPassword)
    const switchVis = () => setVis(vis => !vis)


    return(
        <Stack>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={(type === 'email') ? {
                    required: text.required,
                    pattern: {
                        value: new RegExp(`^[A-Z0-9._%+-]+@(gmail|yumzone).com$`, 'i'),
                        message: text.invalidemail
                    }}
                    : {required: (required) ? text.required : false}}
                render={({ field }) =>
                    <OutlinedInput {...field} error={Boolean(error)} type={(vis) ? initialType : 'password'} placeholder={placeholder} autoComplete="off"
                        style={ mini ? { height: '35px', width: '100%' } : {} }
                        inputProps={inputProps}
                        startAdornment={<InputAdornment position="start">{ startAdornment ? startAdornment : <Icon>{icon}</Icon>}</InputAdornment>}
                        endAdornment={(isPassword) ?<InputAdornment position="end"><IconButton onClick={switchVis}>{(vis) ?  <VisibilityOffOutlined /> : <VisibilityOutlined/>}</IconButton></InputAdornment>: <></>}/>
                }
            />
            {error && !maskErrorText && <Alert severity="error">{error.message}</Alert>}
        </Stack>
    )
}

export default ControlledInput