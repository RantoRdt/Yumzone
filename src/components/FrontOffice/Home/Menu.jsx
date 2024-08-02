import React, { useState, useEffect, useContext } from "react"
import { Stack, Typography, Grid, Button, Dialog, Tabs, Tab, Alert,ToggleButtonGroup, ToggleButton } from "@mui/material"
import useLanguage from "../../../hooks/useLanguage"
import OrderDetails from "../../Menu/OrderDetails"
import Payment from "../../Menu/Payment"
import MenuFilter from "../../Menu/Filter"
import MenuList from "../../Menu/List"
import useCreator from "../../../hooks/useCreator"
import useFeedback from "../../../hooks/useFeedback"
import { DateTimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import moment from "moment";
import Map from "../../tools/Map"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import RoutesList from "../../../helper/routes"
import useAuth from "../../../hooks/useAuth"
import Submit from "../../tools/Submit"
import { AuthStateContext } from "../../Auth/authState"

const Menu = () => {
    const { text } = useLanguage() 
    const [ filter, setFilter ] = useState({ search: '', category: ['Pizza', 'Burger', 'Tacos'], pork: true })
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ delivery, setDelivery ] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth()
    const orderDelay = moment().add(1, "hour")
    const { userId } = useContext(AuthStateContext)
    const userInfo = useSelector(state => state.userInfo)
    const defaultPlace = useSelector(state => state.restInfo?.place)
    const [ deliveryDate, setDeliveryDate ] = useState(orderDelay)
    const [ deliveryPlace, setDeliveryPlace ] = useState({ place: defaultPlace, dineIn: false })
        useEffect(() => { if (!delivery) setDeliveryPlace(v => {return {...v, place: defaultPlace}}) }, [defaultPlace])
    const { createOrder } = useCreator()
    const { Feedback } = useFeedback()
    
    const [ orders, setOrders ] = useState([])
    const newOrder = ({ id, name, unit_price }, quantity) =>{
        const index = orders.findIndex(dish => dish.id == id)
        if (index == -1) setOrders([...orders, { id, name, unit_price, quantity }])
        else {
            const newList = [...orders]
            newList[index].quantity += quantity
            setOrders(newList)
        }
    }
    const removeOrderItem =  dishId => {
        const newList = orders.filter(dish => dish.id != dishId)
        setOrders(newList)
    }

    useEffect(()=>{ setDeliveryPlace({ dineIn: false, place: delivery ? "" : defaultPlace}) }, [delivery])
    useEffect(()=>{ if (deliveryDate.isBefore(orderDelay)) setDeliveryDate(orderDelay) }, [deliveryDate])

    return (     
        <Stack variant="container" id="menu" width='100%' padding="50px 10px">
            <Grid container spacing={5}>
                <Grid item xs={12} md={9} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <Stack flexDirection='row' display='flex' justifyContent='center' gap='15px' flexWrap='wrap' alignItems='center'>
                        <Typography variant="h4">{text.ourmenu}</Typography>
                        <MenuFilter value={filter} onChange={setFilter}/>
                    </Stack> 
                    {
                        userId ? 
                        <Stack flexDirection="row" alignItems="center">
                            <Typography>{text.connectedas} {userInfo.name}.</Typography>
                            <Button variant="text" onClick={()=> logout(false)}>{text.logout}</Button>
                        </Stack>
                        : <Alert severity="info">{text.mustbeconnectedtoorder} <Button variant="text" onClick={()=> navigate(RoutesList.auth)}>{text.login}</Button></Alert>
                    }
                    <Grid container style={{ rowGap: '30px' }}>
                        <MenuList filter={filter} onNewOrder={newOrder}/>
                    </Grid>  
                </Grid>
                <Grid item xs={12} md={3} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <Typography variant="h4">{text.yourorder}</Typography>            
                    <OrderDetails removable list={orders} onRemoveItem={removeOrderItem}/>
                    <Button variant="contained" disabled={(orders.length == 0) || !userId} onClick={() => setOpenDialog(true)}>{text.submitorder}</Button>
                </Grid>
            </Grid>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                variant="order"
            >
                <Stack spacing={2}>
                    <Tabs value={Number(delivery)} onChange={() => setDelivery(d => Boolean((d+1)%2))}>
                        <Tab value={0} label={text.pickup}/>
                        <Tab value={1} label={text.delivery}/>
                    </Tabs>
                    <Typography>{delivery ? text.deliveryplace : text.pickupplace}</Typography>
                    <Map invisible={!delivery} value={deliveryPlace.place} onChange={place => setDeliveryPlace({...deliveryPlace, place})}/>
                    {
                        !delivery && <ToggleButtonGroup
                            exclusive
                            value={deliveryPlace?.dineIn}
                            onChange={(e, newState) => setDeliveryPlace({...deliveryPlace, dineIn: newState})}
                        >
                            <ToggleButton value={false}><Typography>{text.takeout}</Typography></ToggleButton>
                            <ToggleButton value={true}><Typography>{text.dinein}</Typography></ToggleButton>
                        </ToggleButtonGroup>
                    }
                    <Typography>{delivery ? text.deliverydate : text.pickupdate }</Typography>
                    <DateTimePicker value={deliveryDate} minDate={moment()} maxDate={moment().add(10, "days")} onChange={setDeliveryDate} viewRenderers={{ hours: renderTimeViewClock, minutes: renderTimeViewClock,seconds: renderTimeViewClock }}/>  
                    <Alert severity="info" style={{ width: "100%", padding: "0" }}>{delivery ? text.deliverydelay : text.pickupdelay}</Alert>
                    <Payment/>
                    <Typography variant="h6">{text.facture}</Typography>
                    <OrderDetails list={orders} onRemoveItem={removeOrderItem} delivery={delivery}/>
                    <Feedback/>
                    <Stack style={{ flexDirection: 'row' }}>
                        <Submit onClick={() => createOrder({ deliveryDate: deliveryDate.toDate(), deliveryPlace: deliveryPlace.place, dineIn: deliveryPlace.dineIn, orders: orders.map(dish => ({ dish_id: dish.id, dish_quantity: dish.quantity })) })}>{text.confirm}</Submit>
                        <Button style={{ width: "50%" }} onClick={() => setOpenDialog(false)}>{text.back}</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </Stack>
    )
}

export default Menu