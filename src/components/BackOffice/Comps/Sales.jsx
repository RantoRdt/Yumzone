import React, { useEffect, useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../../../redux/actions";
import { PieChart } from "@mui/x-charts/PieChart"

const Sales = () => {
    const dispatch = useDispatch()
    const sales = useSelector(state => state.sales)
    const salesByCategory = useMemo(() => {
        let val = []
        sales.forEach(d => {
            const { category, sales } = d
            const { id, name } = category
            const index = val.findIndex(d => d.id == id)
            if (index == -1) val.push({ id, name, sales })
            else val[index].sales += sales
        })
        return val
    }, [sales])

    useEffect(()=> { dispatch(fetchSales()) }, [])
    useEffect(()=> { console.log(sales) }, [sales])
    // TODO Suite

    return(
        <Stack style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Stack>
                <Typography>Par dish</Typography>
                <PieChart
                    width={400}
                    height={200}
                    series={[{ data: sales.map(d => ({ id: d.dish?.id, value: d.sales, label: d.dish?.name })) }]}
                />
            </Stack>
            <Stack>
                <Typography>Par category</Typography>
                <PieChart
                    width={400}
                    height={200}
                    series={[{ data: salesByCategory.map(d => ({ id: d.id, value: d.sales, label: d.name })) }]}
                />
            </Stack>
        </Stack>
    )
}

export default Sales