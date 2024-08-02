import React, { useState } from "react";
import { Collapse, Stack, OutlinedInput, InputAdornment, Icon, ToggleButton, ToggleButtonGroup
    , FormControlLabel, Checkbox, Tooltip, IconButton, Box
 } from "@mui/material";
 import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SavingsIcon from '@mui/icons-material/Savings';
import useLanguage from "../../hooks/useLanguage";

const MenuFilter = ({value= {}, onChange = () => {}}) => {
    const [ showFilter, setShowFilter ] = useState(false)
    const { text } = useLanguage()

    return <>
    <Collapse in={showFilter} orientation="horizontal">
        <Stack variant="wrap-content" style={{ gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
            <OutlinedInput
                id="dish-search"
                placeholder={text.searchmenu}
                style={{height: '40px'}}
                value={value.search}
                onChange={e => onChange({...value, search: e.target.value})}
                startAdornment={<InputAdornment position="start"><Icon><SearchIcon/></Icon></InputAdornment>}
            />
            <ToggleButtonGroup
                value={value.category}
                onChange={(e, newVal) => onChange({...value, category: newVal})}
            >
                <ToggleButton value="Pizza"><Box component='img' height='20px' src={'/svg/p.svg'} alt=""/></ToggleButton>
                <ToggleButton value="Burger"><Box component='img' height='20px' src={'/svg/b.svg'} alt=""/></ToggleButton>
                <ToggleButton value="Tacos"><Box component='img' height='20px' src={'/svg/t.svg'} alt=""/></ToggleButton>
            </ToggleButtonGroup>
            <FormControlLabel
                label={value.pork ? text.all : text.withoutpork}
                labelPlacement="end"
                style={{ textAlign: 'center' }}
                onChange={()=> onChange(v => {return {...value, pork: !v.pork}})}
                control={<Checkbox defaultChecked icon={<SavingsOutlinedIcon/>} checkedIcon={<SavingsIcon/>}/>}
            />
        </Stack>
    </Collapse>
    <Tooltip title={ showFilter ? text.close : text.filters}>
        <IconButton variant="contained" onClick={()=> setShowFilter(s => !s)}>
            { showFilter ? <CloseIcon/> : <TuneIcon/>}
        </IconButton>
    </Tooltip>
    </>
}

export default MenuFilter