import React ,{ useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchMenus } from "../../redux/actions"
import SavingsIcon from '@mui/icons-material/Savings';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import DishCardSkeleton from "../Skeletons/DishCard"
import DeleteIcon from '@mui/icons-material/Delete';
import { url } from "../../API/axios";
import NValuesInput from "../tools/NValuesInput";
import { Grid, Card, Stack, Box, Tooltip, Collapse, IconButton, Typography, Icon } from "@mui/material";
import useLanguage from "../../hooks/useLanguage";
import useAriary from "../../hooks/useAriary";
import useDeleter from "../../hooks/useDeleter";
import Submit from "../tools/Submit";

const MenuList = ({ admin=false, filter= {}, onNewOrder = () => {} }) =>{
    const { text } = useLanguage()
    const dispatch = useDispatch()
    const menus = useSelector(state => state.menus)
    const loading = useSelector(state => state.menusLoading)
    const { AriaryDisplayer } = useAriary()
    useEffect(() => {dispatch(fetchMenus())}, [])

    const [ addingDetails, setAddingDetails ] = useState(-1)
    const [ itemQuantity, setItemQuantity ] = useState(0)

    const { deleteDish } = useDeleter()

    const remove = async id => {
        const success = await deleteDish(id)
        if (success) dispatch(fetchMenus())
    }

    return loading ? <DishCardSkeleton/>
        : menus
        ?.filter(d => 
            d.name?.toLowerCase().includes(filter.search.toLowerCase())
            && filter.category.includes(d.category?.name)
            && (filter.pork || !d.has_pork)
        )
        .sort((d1, d2) => d1.category?.name.localeCompare(d2.category?.name))
        .map((d, j) => <Grid variant="card-container" key={`dish${d.id}`} item xs={12} sm={6} md={admin ? 3 : 4}>
            <Card variant="menu-card">
                <Stack alignItems='center' spacing={1}>
                    <Stack width='30%' style={{aspectRatio: '1/1', alignItems: 'center', border: '1px solid #black', overflow:'hidden', borderRadius: '50%'}}>                    
                        <Box component='img' width='100%' src={`${url}/images/${d.image}`} alt=""/>
                    </Stack>
                    <Typography>{d.name}</Typography>
                </Stack>
                <Stack spacing={1}>
                    <Typography>{d.category?.name}</Typography>
                    <Stack display='flex' flexDirection='row' alignItems='center' justifyContent="space-between">
                        <AriaryDisplayer variant='bold'>{d.unit_price}</AriaryDisplayer>
                        <Stack flexDirection='row'>
                            {
                                admin ?
                                <Submit tooltip={text.dlt} onClick={() => remove(d.id)}>
                                    <DeleteIcon/>
                                </Submit>
                                : <>
                                    <Collapse in={addingDetails == j} orientation="horizontal">    
                                        <Tooltip title={text.confirm}>
                                            <span>
                                                <IconButton disabled={itemQuantity == 0} variant="contained" onClick={() => { onNewOrder(d, itemQuantity); setItemQuantity(0) }}>
                                                    <CheckIcon/>
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </Collapse>
                                    <Tooltip title={addingDetails == j ? text.back : text.ordr}>
                                        <IconButton sx={{ transition: '.2s', transform: `rotate(${(addingDetails == j) ? '45deg' : '0deg'})`}} variant={ addingDetails == j ? "text" : "contained"} onClick={()=>{ setAddingDetails((addingDetails == j) ? -1 : j); setItemQuantity(0)}}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            }
                        </Stack>
                    </Stack>
                    <Collapse in={addingDetails == j}>
                        <Stack spacing={1}>
                            <NValuesInput value={itemQuantity} onChange={setItemQuantity}/>
                            <AriaryDisplayer start={`${text.st} : `}>{itemQuantity * d.unit_price}</AriaryDisplayer>
                        </Stack>
                    </Collapse>
                </Stack>
                { d.has_pork && <Tooltip title={text.withpork}><Icon style={{ position: 'absolute', top: '10px', right: '10px' }}><SavingsIcon color="secondary"/></Icon></Tooltip> }
            </Card>  
        </Grid>
        )
}

export default MenuList