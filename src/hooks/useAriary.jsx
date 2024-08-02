import React from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const useAriary = () => {
    
    const separate = value =>{
        const strVal = value.toString().split('').reverse().join('')
        let fVal = ""
        for (let i = 0; i < strVal.length; i++){
            fVal = strVal[i] + ((i%3 == 0) ? " " : "") + fVal
        }
        return fVal
    }

    const AriaryDisplayer = ({ children, start, variant }) => {
        const getStyle = () => {
            switch (variant){
                case "end": return { textAlign: "end" }
                case "bold": return { fontWeight: "bold" }
                default: return {}
            }
        }
        return <Typography style={getStyle()}>{start} {separate(children)} Ar</Typography>
    }
    
    const AriaryInput = ({onChange, max=200000, value}) =>{
        return(
            <Stack style={{ flexDirection: 'row', display: 'flex', gap: '5px', alignItems: 'center' }}>
                <IconButton onClick={()=> onChange((value == 0) ? max : value - 500)}><ChevronLeftIcon/></IconButton>
                <AriaryDisplayer>{value}</AriaryDisplayer>
                <IconButton onClick={()=> onChange((value == max) ? 0 : value + 500)}><ChevronRightIcon/></IconButton>
            </Stack>
        )
    }


    return { AriaryInput, AriaryDisplayer }
}

export default useAriary