import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton, Divider, Stack } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import useLanguage from "../../hooks/useLanguage";
import useAriary from "../../hooks/useAriary";

const OrderDetails = ({removable=false, list = [], onRemoveItem = () => {}, delivery=false}) => {
    const deliveryCost = 4000
    const { text } = useLanguage()
    const [total, setTotal] = useState(0)
    const [ deliveryAdd, setDeliveryAdd ] = useState(0)
    const { AriaryDisplayer } = useAriary()
    useEffect(() => { setDeliveryAdd(delivery ? deliveryCost : 0) }, [delivery])
    useEffect(() => {
        const newTotal = list.reduce((acc, { unit_price, quantity }) => acc + parseInt(unit_price * quantity), 0)
        setTotal(newTotal)
    }, [list])
    
    return <Stack spacing={1}>
        {
            list.map((o, i) => <Grid container key={`order${i}`} style={{ alignItems: "center" }}>
                <Grid item xs={6.5}><Typography>{o.name}</Typography></Grid>
                <Grid item xs={0.5}><Typography>{o.quantity}</Typography></Grid>
                <Grid item xs={0.5}/>
                <Grid item xs={2.5}><AriaryDisplayer variant="end">{o.unit_price * o.quantity}</AriaryDisplayer></Grid>
                { removable && <Grid item xs={2}><IconButton variant="contained" onClick={() => onRemoveItem(o.id)}><RemoveIcon/></IconButton></Grid>}
            </Grid>
        )}
        { delivery ? <Grid container style={{ alignItems: "center" }}>
            <Grid item xs={6.5}><Typography>{text.delivery}</Typography></Grid>
            <Grid item xs={1}/>
            <Grid item xs={2.5}><AriaryDisplayer variant="end">{deliveryCost}</AriaryDisplayer></Grid>
        </Grid> : <></> }
        <Divider/>
        <Grid container>
            <Grid item xs={7.5}/>
            <Grid item xs={2.5}><AriaryDisplayer variant="end">{parseInt(total) + parseInt(deliveryAdd)}</AriaryDisplayer></Grid>
            <Grid item xs={2}/>
        </Grid>
    </Stack> 
}

export default OrderDetails