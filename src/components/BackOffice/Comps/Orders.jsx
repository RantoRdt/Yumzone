import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/actions";

const Orders = () => {

    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchOrders()) }, [])

    const orders = useSelector(state => state.orders)

    return(
        <Stack spacing={2}  style={{overflowY: 'scroll'}}>
            <Typography>En cours</Typography>
            <Stack>
            {
                orders.current?.map(order => <Stack key={`order${order.id}`}>
                    <Typography>Num: {order.id}</Typography>
                    <Typography>Date: {order.date}</Typography>
                    <Typography>Place: {order.place}</Typography>
                    ...
                    {/* Voir le console log pour la liste complète des éléments */}
                </Stack>)
            }
            </Stack>
            <Typography>Passées</Typography>
            <Stack>
            {
                orders.past?.map(order => <Stack key={`order${order.id}`}>
                    <Typography>Num: {order.id}</Typography>
                    <Typography>Date: {order.date}</Typography>
                    <Typography>Place: {order.place}</Typography>
                    ...
                    {/* Voir le console log pour la liste complète des éléments */}
                </Stack>)
            }
            </Stack>
        </Stack>
    )
}

export default Orders