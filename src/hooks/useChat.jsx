import { useContext, useState } from "react"
import { AuthStateContext } from "../components/Auth/authState"
import { sendMessage as sendMessageAPI, saveMessage as saveMessageAPI } from "../API/axios"
import { useDispatch } from "react-redux"
import { fetchUserInfo } from "../redux/actions"
import { jwtDecode } from "jwt-decode"

const useChat = () =>{
    const { foToken } = useContext(AuthStateContext)
    const [ newResponse, setNewResponse ] = useState('')
    const [ error, setError ] = useState(false)

    const dispatch = useDispatch()

    const saveMessage = async (message, isBot, id) =>{
        try { await saveMessageAPI({ id_user: id, message, is_bot: isBot.toString() }) }
        catch (error) { console.error(error) }
    }

    const getResponseFormBot = async (message, name) =>{
        try {
            const { data } = await sendMessageAPI(message, name)
            return data[0]?.text    
        } catch (error) { setError(true); console.error(error) }
    }

    const sendMessage = async (mess, name) =>{
        setError(false)
        setNewResponse('')
        const { id } = foToken ? jwtDecode(foToken) : {}
        if (foToken){
            try {
                await saveMessage(mess, false, id)
                dispatch(fetchUserInfo(id))
            } catch (error) { console.error(error) }          
        }
        const response = await getResponseFormBot(mess, name)
        if (foToken) {
            if (response?.length){
                await saveMessage(response, true, id)
                dispatch(fetchUserInfo(id))
            }
        }
        else setNewResponse(response || '')
    }

    return { sendMessage, newResponse, error }
}

export default useChat