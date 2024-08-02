import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthStateContext = createContext(false)

const bokey = 'BO-M1-PROJECT-2024'
const fokey = 'FO-M1-PROJECT-2024'

const AuthStateProvider = ({children}) => {
    const [ tokens, setTokens ] = useState({
        fo: localStorage.getItem(fokey),
        bo: localStorage.getItem(bokey)
    })
    const [ userId, setUserId ] = useState(null)

    useEffect(()=>{
        try {
            if (tokens.fo) {
                const { id } = jwtDecode(tokens.fo)
                setUserId(id)
            }
        }
        catch (error) { }
    }, [tokens])
    
    const setAuthenticated = (admin, token=undefined) =>{
        if (token){
            if (admin){
                setTokens({...tokens, bo: token})
                localStorage.setItem(bokey, token)
            }
            else{
                setTokens({...tokens, fo: token})
                localStorage.setItem(fokey, token)
            }
        }
        else{ // logout
            if (admin){
                setTokens({...tokens, bo: null})
                localStorage.removeItem(bokey)
            }
            else{
                setTokens({...tokens, fo: null})
                localStorage.removeItem(fokey)
            }
        }
    }
    return (
        <AuthStateContext.Provider value={{
            boToken: tokens.bo , foToken: tokens.fo, setAuthenticated, userId
        }}>
            {children}
        </AuthStateContext.Provider>
    )
}
export {AuthStateContext, AuthStateProvider}