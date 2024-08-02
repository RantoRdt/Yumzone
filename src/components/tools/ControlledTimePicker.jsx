import React from "react"
import { Controller } from "react-hook-form"
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers"

const ControlledTimePicker = ({control, name, placeholder=''}) =>{

    return <Controller
                control={control}
                name={name}
                render={({ field }) => <TimePicker {...field} label={placeholder} viewRenderers={{ hours: renderTimeViewClock, minutes: renderTimeViewClock,seconds: renderTimeViewClock}}/>}
            />
    
}

export default ControlledTimePicker