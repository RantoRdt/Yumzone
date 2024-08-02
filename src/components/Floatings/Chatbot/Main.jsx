import React, { useState, useEffect, useRef, useContext } from "react";
import { Stack, IconButton, Tooltip, Button, Avatar, Typography, OutlinedInput, InputAdornment, Alert } from "@mui/material";
import useLanguage from "../../../hooks/useLanguage";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../redux/actions"
import RoutesList from '../../../helper/routes'
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import useChat from "../../../hooks/useChat";
import Writing from "./Writing";
import { AuthStateContext } from "../../Auth/authState";
import useAuth from "../../../hooks/useAuth";

const Chatbot = () =>{
    const { text } = useLanguage()
    const { userId } = useContext(AuthStateContext)
    const [ visible, setVisible ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ loading, setLoading ] = useState(false) // for chat response
    
    const navigate = useNavigate()
    const { logout } = useAuth()
    const { newResponse, sendMessage, error } = useChat()

    const dispatch = useDispatch()
    useEffect(() => { if (userId) dispatch(fetchUserInfo(userId))}, [userId])
    const userInfo = useSelector(state => state.userInfo)

    const messageListRef = useRef(null)
    useEffect(() => {
        setMessages(userInfo.messages)
        if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }, [userInfo.messages])

    const addNewMessage = mess =>{
        const newList = [...messages]
        newList.push(mess)
        setMessages(newList)
    }

    const handleChat = async ()=>{
        setLoading(true)
        setMessage('')
        addNewMessage({bot: false, content: message})
        await sendMessage(message, userInfo.name)
        setLoading(false)
    }
    useEffect(()=>{ if (newResponse.length) addNewMessage({is_bot: true, content: newResponse})}, [newResponse])

    return(<Stack alignItems="flex-end" style={{background: 'transparent'}} spacing={1}>
        <Stack variant="chatbot-container" style={{height: visible ? '65vh' : '0px', width: visible ? '27vw' : '0px'}}>
            <Stack margin='10px 0' padding='0 10px' flexShrink={0} spacing={1}>
                <Stack flexDirection='row' display='flex' alignItems='center' justifyContent='space-between'>
                    <Stack flexDirection='row' display='flex' alignItems='center' gap='10px'>
                        <Avatar><SmartToyIcon/></Avatar>
                        <Typography>Bot</Typography>
                    </Stack>
                    {
                        userInfo.name
                        ? <Button variant="outlined" onClick={()=> logout(false)}>{text.logout}</Button>
                        : <Button variant="outlined" style={{width: 'fit-content'}} onClick={()=> navigate(RoutesList.auth)}>{text.login}</Button>
                    }
                    <Stack flexDirection='row' display='flex' alignItems='center' gap='10px'>
                        <Typography>{userInfo.name || text.you}</Typography>
                        <Avatar>{userInfo.name ? userInfo.name[0] : <PersonIcon/>}</Avatar>
                    </Stack>
                </Stack> 
                { !userInfo.name && <Alert severity="info">{text.tosavechat}</Alert> }
            </Stack>
            <Stack ref={messageListRef} spacing={1} style={{overflowY: 'scroll', flexGrow: 1}} padding='0 10px'>
                { messages?.map((m, i) => <Typography key={i} variant={m.is_bot ? 'received-message' : 'sent-message'}>{m.content}</Typography>) }      
                { loading && <Writing/> }
            </Stack>
            { error && <Alert severity="error">{text.somethingwentwrong}</Alert> }
            <Stack margin='10px 0' flexShrink={0} padding='0 10px'>
                <OutlinedInput
                    placeholder={text.enteryourmsg}
                    style={{height: '40px'}}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                disabled={!Boolean(message.length) || loading}
                                onClick={handleChat}
                            >
                                <SendIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Stack>
        </Stack>
        <Tooltip title={text.assistance} placement="left-end" style={{display: 'flex', flexDirection: 'column'}}>     
            <IconButton variant="floating" onClick={() => setVisible(v => !v)}>{ visible ? <CloseIcon/> : <ChatOutlinedIcon/>}</IconButton>
        </Tooltip>
    </Stack>)
}

export default Chatbot