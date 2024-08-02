import React, { useEffect, useState } from "react";
import { Stack, Icon, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestInfo } from "../../../redux/actions";
import { Place, DateRange, Phone } from '@mui/icons-material';
import useLanguage from "../../../hooks/useLanguage";
import useMoment from "../../../hooks/useMoment";
import Map from "../../tools/Map"
import { useForm } from 'react-hook-form'
import ControlledInput from "../../tools/ControlledInput";
import ControlledTimePicker from "../../tools/ControlledTimePicker";
import moment from "moment";
import Submit from "../../tools/Submit";
import useUpdater from "../../../hooks/useUpdater";
import useFeedback from "../../../hooks/useFeedback";

const Infos = () => {
    const dispatch = useDispatch()
    useEffect(()=>{ dispatch(fetchRestInfo()) }, [])
    const restInfo = useSelector(state => state.restInfo)
    const { text } = useLanguage()
    const { weeklyDay, timeFormat } = useMoment()
    const [ place, setPlace ] = useState(null)
    const { control, handleSubmit, setValue, formState: { errors } } = useForm()
    const { Feedback } = useFeedback()
    useEffect(()=>{
        setPlace(restInfo.place)
        setValue('phone', restInfo.phone)
        setValue('hour1from', moment(restInfo.schedule[0]?.from, 'HH:mm'))
        setValue('hour6from', moment(restInfo.schedule[1]?.from, 'HH:mm'))
        setValue('hour7from', moment(restInfo.schedule[2]?.from, 'HH:mm'))
        setValue('hour1to', moment(restInfo.schedule[0]?.to, 'HH:mm'))
        setValue('hour6to', moment(restInfo.schedule[1]?.to, 'HH:mm'))
        setValue('hour7to', moment(restInfo.schedule[2]?.to, 'HH:mm'))
    }, [restInfo])

    const { updateInfo } = useUpdater()
    
    return(
        <Stack spacing={2} style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <Typography>{text.currentinfo}</Typography>
            <Stack flexDirection='row' gap='5px'  ><Icon><Place/></Icon><Typography>{restInfo.place}</Typography></Stack>
            <Stack flexDirection='row' gap='5px' alignItems='center'><Icon><Phone/></Icon><Typography>+261 {restInfo.phone}</Typography></Stack>
            <Stack flexDirection='row' gap='5px' alignItems='center'  >
                <Icon><DateRange/></Icon>
                <Stack>{
                    restInfo.schedule.map((a, i) => 
                    <Typography key={`a${i}`}>{`${weeklyDay(a.day)} : ${timeFormat(a.from)} - ${timeFormat(a.to)}`}</Typography> ) 
                }</Stack>
            </Stack>
            <Map value={place} onChange={setPlace}/>
            <ControlledInput name="phone" placeholder={text.phonenumber} control={control} error={errors.phone} startAdornment={<><Icon><Phone/></Icon><Typography>+261</Typography></>}/>
            <Stack flexDirection="row" alignItems="center" gap="5px">
                <Typography>{weeklyDay(1)}</Typography>
                <ControlledTimePicker name="hour1from" placeholder="" control={control}/>
                <ControlledTimePicker name="hour1to" placeholder="" control={control}/>
            </Stack>
            <Stack flexDirection="row" alignItems="center" gap="5px">
                <Typography>{weeklyDay(6)}</Typography>
                <ControlledTimePicker name="hour6from" placeholder="" control={control}/>
                <ControlledTimePicker name="hour6to" placeholder="" control={control}/>
            </Stack>
            <Stack flexDirection="row" alignItems="center" gap="5px">
                <Typography>{weeklyDay(7)}</Typography>
                <ControlledTimePicker name="hour7from" placeholder="" control={control}/>
                <ControlledTimePicker name="hour7to" placeholder="" control={control}/>
            </Stack>
            <Feedback/>
            <Submit onClick={handleSubmit(data => updateInfo({ ...data, place }))}>{text.save}</Submit>
        </Stack>
    )
}

export default Infos