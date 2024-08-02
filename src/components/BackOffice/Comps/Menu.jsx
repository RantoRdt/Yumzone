import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchMenus } from "../../../redux/actions"
import { IconButton, Collapse, Icon, Tooltip, Grid, Card, ToggleButton, ToggleButtonGroup, Checkbox, Typography, Stack, Box  } from "@mui/material"
import useLanguage from "../../../hooks/useLanguage"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SavingsIcon from '@mui/icons-material/Savings';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import CheckIcon from '@mui/icons-material/Check';
import useCreator from "../../../hooks/useCreator"
import { useForm, Controller } from 'react-hook-form'
import ImageUploader from "../../tools/ImageUploader"
import ControlledInput from "../../tools/ControlledInput"
import TitleIcon from '@mui/icons-material/Title';
import categories from "../../../helper/categories"
import Submit from "../../tools/Submit"
import useFeedback from "../../../hooks/useFeedback"
import MenuFilter from "../../Menu/Filter"
import MenuList from "../../Menu/List"
import useAriary from "../../../hooks/useAriary"

const Menu = () => {
    const {text} = useLanguage()
    const dispatch = useDispatch()
    
    useEffect(() => {dispatch(fetchMenus())}, [])
    
    const [ filter, setFilter ] = useState({ search: '', category: ['Pizza', 'Burger', 'Tacos'], pork: true })
    
    const [newDishShow, setNewDishShow] = useState(false)
    
    const [ image, setImage ] = useState(null)
    const { Feedback } = useFeedback()
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm()
    const [ newDishPrice, setNewDishPrice ] = useState(10000)
    const { AriaryInput } = useAriary()
    const { createDish } = useCreator()
    const handleCreateDish = async data =>{
        const reload = await createDish({...data, price: newDishPrice}, image)
        if (reload) {
            dispatch(fetchMenus())
            setImage(null)
            reset()
        }
    }

    return (     
        <Stack variant="all-but-header" style={{overflowY: 'scroll'}} id="menu" padding="10px 30px" spacing={2}>
          <Stack >
            <Stack flexDirection='row' display='flex' justifyContent='center' gap='15px' flexWrap='wrap' alignItems='center'>
                <Typography variant="h4">{text.menu}</Typography>
                <MenuFilter value={filter} onChange={setFilter}/>
            </Stack>
          </Stack>
          <Grid container style={{rowGap: '30px'}}>
            <Grid variant="card-container" item xs={12} sm={6} md={3}>
              <Card variant="menu-card" style={{padding: '10px'}}>
                <Collapse in={!newDishShow} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Tooltip title={text.adddish}>
                        <IconButton sx={{ '&:hover': { background: 'none' } }} onClick={()=> setNewDishShow(true)}><AddIcon/></IconButton>
                    </Tooltip>
                </Collapse>
                <Collapse in={newDishShow}>
                    <Stack alignItems='center' spacing={2}>
                        <ImageUploader name="image" control={control} error={errors.image} required id="add-dish-file-input" onChange={setImage} file={image}/>
                        <Stack spacing={2}>
                            <ControlledInput control={control} maskErrorText icon={<TitleIcon/>} mini name='name' error={errors.name} placeholder={text.nm}/>
                            <Stack flexDirection='row' alignItems='center' display='flex' flexWrap='wrap'>
                                <Controller
                                    control={control}
                                    name="category"
                                    defaultValue={categories.pizza.id}
                                    render={({ field }) =>
                                    <ToggleButtonGroup {...field} exclusive onChange={(e, value) => field.onChange(value)}>
                                        <ToggleButton value={categories.pizza.id}><Box component='img' height='20px' src={'/svg/p.svg'} alt=""/></ToggleButton>
                                        <ToggleButton value={categories.burger.id}><Box component='img' height='20px' src={'/svg/b.svg'} alt=""/></ToggleButton>
                                        <ToggleButton value={categories.tacos.id}><Box component='img' height='20px' src={'/svg/t.svg'} alt=""/></ToggleButton>
                                    </ToggleButtonGroup>}
                                />
                                <Controller
                                    control={control}
                                    name="has_pork"
                                    defaultValue={false}
                                    render={({field}) => <Checkbox {...field} icon={<SavingsOutlinedIcon/>} checkedIcon={<SavingsIcon/>}/>}
                                />
                            </Stack>
                            <AriaryInput onChange={setNewDishPrice} value={newDishPrice}/>
                        </Stack>
                        <Feedback/>
                        <Stack flexDirection='row'>
                            <Tooltip title={text.back}>
                                <IconButton onClick={()=> setNewDishShow(false)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                            <Submit tooltip={text.confirm} onClick={handleSubmit(handleCreateDish)}><CheckIcon/></Submit>  
                        </Stack>
                    </Stack>
                                        
                </Collapse>           
              </Card>
            </Grid>
            <MenuList admin filter={filter}/>
      </Grid>
    </Stack>
  )
}

export default Menu