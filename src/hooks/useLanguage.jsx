import { useState, useEffect } from "react"
import getText from "../helper/texts"

const langkey = 'LANG-M1-PROJECT-2024'
const useLanguage = () =>{
    const eventName = 'changeLanguage'
    const [language, setLanguage] = useState(localStorage.getItem(langkey) || 'fr')
    const text = getText(language)

    useEffect(()=>{
        window.addEventListener(eventName, e => { setLanguage(e.detail); localStorage.setItem(langkey, e.detail) })
        return () => window.removeEventListener(eventName, e => { setLanguage(e.detail); localStorage.setItem(langkey, e.detail) })
    }, [])
    const changeLanguage = l => {
        const e = new CustomEvent(eventName, {detail: l})
        window.dispatchEvent(e)
    }
    return { text, language, changeLanguage }
}

export default useLanguage