import React, { useEffect, useState } from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const NValuesInput = ({onChange, max=99, value:externalValue=0}) =>{
    const [ value, setValue ] = useState(0)

    useEffect(()=>{ onChange(value) }, [value])
    useEffect(()=>{ setValue(externalValue) }, [externalValue])

    return(
        <Stack style={{ flexDirection: 'row', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <IconButton onClick={()=> setValue(v => (v == 0) ? max : v - 1)}><ChevronLeftIcon/></IconButton>
            <Typography>{value}</Typography>
            <IconButton onClick={()=> setValue(v => (v == max) ? 0 : v + 1)}><ChevronRightIcon/></IconButton>
        </Stack>
    )
}

export default NValuesInput