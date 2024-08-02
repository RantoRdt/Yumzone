import { useContext } from "react"
import { AuthStateContext } from "../components/Auth/authState"
import useLanguage from "./useLanguage"
import { useNavigate } from "react-router-dom"
import RoutesList from "../helper/routes"
import useFeedback from "./useFeedback"
import { login as loginAPI, signUp as signUpAPI, googleLogin as googleLoginAPI } from "../API/axios"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../redux/actions"

const useAuth = () =>{
    const { text } = useLanguage()
    const feedback = useFeedback()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { setAuthenticated } = useContext(AuthStateContext)

    const login = async ({mail, password}, isAdmin=false) =>{
        feedback.clear()
        try {
            const { status, data: { token } } = await loginAPI({mail, password, is_admin: isAdmin})
            //const { status, data: { token } } = { status: 200, data: { token: '001' } } 
            if (status === 200){
                feedback.show('success', text.loginsuccess )
                await setAuthenticated(isAdmin, token)
                if (isAdmin) navigate(RoutesList.landing)
                else{
                    const { id } = jwtDecode(token)
                    dispatch(fetchUserInfo(id))
                }
            }
        } catch (error) {
            switch (error.response.status){
                case 400: feedback.show('error', text.authfailed); break
                default: feedback.show('error', text.somethingwentwrong)
            }
        }     
    }
    const signUp = async ({mail, password, cpassword, username: name}) => {
        feedback.clear()
        if (password === cpassword){
            try {
                const { status, data: { token } } = await signUpAPI({mail, name, password})
                if (status === 201){
                    feedback.show('success', text.registersuccess)
                    await setAuthenticated(false, token)
                    const { id } = jwtDecode(token)
                    dispatch(fetchUserInfo(id))
                }
            } catch (error) {
                console.error(error)
                switch (error.response?.status){
                    case 401: feedback.show('error', text.error); break
                    default: feedback.show('error', text.somethingwentwrong)
                }
            }       
        }
        else feedback.show('error', text.passwordnotequal)
    }
    const googleLogin = async resp =>{
        const {data: { given_name:name, email:mail, access_token }} = resp
        try {
            const { data: {token} } = await googleLoginAPI({name, mail})
            const { id } = jwtDecode(token)
            dispatch(fetchUserInfo(id))
            await setAuthenticated(false, token)
        } catch (error) { console.error(error) }
    }
    const logout = async(isAdmin) => {
        await setAuthenticated(isAdmin)
        navigate( isAdmin ? RoutesList.auth : RoutesList.landing)
        if (isAdmin) navigate(RoutesList.auth)
        else dispatch(fetchUserInfo(null))
                
    }

    return {login, logout, googleLogin, signUp}
}
export default useAuth