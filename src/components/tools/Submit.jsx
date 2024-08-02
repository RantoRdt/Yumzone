import React, { useState } from "react"
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material"

const Submit = ({ onClick, children, tooltip }) =>{
    const [loading, setLoading] = useState(false)
    const props = {
        variant:"contained",
        disabled: loading,
        onClick:  async e =>{
            setLoading(true)
            await onClick(e)
            setLoading(false)
        }
    }

    const Children = () => {
        return loading ? <CircularProgress/> : children
    }

    return Boolean(tooltip) ? <Tooltip title={tooltip}><span><IconButton {...props} style={{ aspectRatio: '1/1', width: 'auto', height: 'auto' }}><Children/></IconButton></span></Tooltip>
        : <Button {...props}><Children/></Button>
}

export default Submit