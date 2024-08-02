import React, { useState } from "react";
import { Tab, Tabs, Typography, Stack, Icon, InputAdornment, OutlinedInput, ToggleButtonGroup, ToggleButton, Select, MenuItem } from "@mui/material";
import useLanguage from "../../hooks/useLanguage";
import { LockOutlined, CreditCardOutlined, MailOutlined, InsertInvitationOutlined, PhoneOutlined } from "@mui/icons-material";
import mobilemoneys from "../../helper/mobilemoneys";

const Payment = () =>{
    const { text } = useLanguage()
    const [ index, setIndex ] = useState(0)
    const [ mobileOperator, setMobileOperator ] = useState(mobilemoneys.telma)

    const TabPanel = ({ value, children }) => { return <Stack spacing={2} sx={{ display: value == index ? "flex" : "none" }}>{children}</Stack> }

    return <Stack spacing={2}>
        <Typography variant="h6">{text.payment}</Typography>
        <Tabs value={index} onChange={(e, newValue) => setIndex(newValue)}>
            <Tab value={0} label={text.mobilemoney}/>
            <Tab value={1} label={text.paypal}/>
            <Tab value={2} label={text.debitcard}/>
        </Tabs>
        <TabPanel value={0}>
            <ToggleButtonGroup
                exclusive
                value={mobileOperator}
                onChange={(e, newValue) => setMobileOperator(newValue) }
            >
                <ToggleButton value={mobilemoneys.telma}><Typography>{mobilemoneys.telma.name}</Typography></ToggleButton>
                <ToggleButton value={mobilemoneys.orange}><Typography>{mobilemoneys.orange.name}</Typography></ToggleButton>
                <ToggleButton value={mobilemoneys.airtel}><Typography>{mobilemoneys.airtel.name}</Typography></ToggleButton>
            </ToggleButtonGroup>
            <OutlinedInput type="text" name="phone" placeholder={text.phonenumber} autoComplete="off"
                inputProps={{ maxLength: 7, onKeyDown: event => {
                    if (!/^\d$/.test(event.key) && event.key.length === 1 && !event.ctrlKey && !event.metaKey) event.preventDefault()      
                  } }}
                startAdornment={<>
                    <InputAdornment position="start"><Icon><PhoneOutlined/></Icon></InputAdornment>
                    <Typography>+261</Typography>
                    <Select className="no-border" defaultValue={mobileOperator.prefix[0]} >
                        { mobileOperator.prefix?.map(p => <MenuItem value={p}>{p}</MenuItem>) }
                    </Select>
                </>}/>
            <OutlinedInput type="password" name="code" placeholder={text.code} autoComplete="off" inputProps={{ maxLength: 6 }}
                startAdornment={<InputAdornment position="start"><Icon><LockOutlined/></Icon></InputAdornment>}/>
        </TabPanel>
        <TabPanel value={1}>
            <OutlinedInput type="text" name="mail" placeholder={text.ppemail} autoComplete="off"
                startAdornment={<InputAdornment position="start"><Icon><MailOutlined/></Icon></InputAdornment>}/>
        </TabPanel>
        <TabPanel value={2}>
            <OutlinedInput type="text" name="cardnumber" placeholder={text.cardnumber} autoComplete="off"
                startAdornment={<InputAdornment position="start"><Icon><CreditCardOutlined/></Icon></InputAdornment>}/>
            <OutlinedInput type="text" name="expiry" placeholder={text.expirydate} autoComplete="off"
                startAdornment={<InputAdornment position="start"><Icon><InsertInvitationOutlined/></Icon></InputAdornment>}/>
            <OutlinedInput type="text" name="cvv" placeholder={text.cvv} autoComplete="off"
                startAdornment={<InputAdornment position="start"><Icon><LockOutlined/></Icon></InputAdornment>}/>
        </TabPanel>
    </Stack>
}

export default Payment