import {useEffect, useState} from "react";
import { Alert } from "@mui/material";

const useFeedback = () =>{
    const eventName = 'sendFeedback'
    const [content, setContent] = useState({})

    useEffect(()=>{
        window.addEventListener(eventName, e => setContent(e.detail))
        return () => window.removeEventListener(eventName, e => setContent(e.detail))
    }, [])
    
    const show = (severity=undefined, message=undefined) => {
        const e = new CustomEvent(eventName, {detail: {severity, message }})
        window.dispatchEvent(e)
    }

    const Feedback = () =>{
        return content.message && <Alert severity={content.severity}>{content.message}</Alert>
    }
    
    return {
        show,
        clear: ()=> show(),
        Feedback
    }
}
export default useFeedback