import React from "react";
import { Skeleton, Grid, Card, Stack, Hidden, Typography } from "@mui/material";

const DishCardSkeletonItem = () =>{
    return <Grid item xs={12} sm={6} md={3} variant="card-container">
        <Card variant="menu-card">
            <Stack alignItems='center' spacing={1}>
                <Skeleton variant="circular" style={{ width: '75px', height: '75px' }}/>
                <Typography style={{ width: '35%' }}><Skeleton/></Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography style={{ width: '35%' }}><Skeleton/></Typography>
                <Stack display='flex' flexDirection='row' alignItems='center' justifyContent="space-between">
                    <Typography style={{ width: '12%' }}><Skeleton/></Typography>
                    <Skeleton variant="circular" style={{ width: '30px', height: '30px' }}/>
                </Stack>
            </Stack>
        </Card>
    </Grid>
}

const DishCardSkeleton = () =>{
    return <>
        <Hidden mdDown><DishCardSkeletonItem/></Hidden>
        <Hidden mdDown><DishCardSkeletonItem/></Hidden>
        <Hidden smDown><DishCardSkeletonItem/></Hidden>
        <DishCardSkeletonItem/>
    </>
}

export default DishCardSkeleton