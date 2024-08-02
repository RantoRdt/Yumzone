import { useContext, useEffect, useState } from "react";
import RoutesList from "../helper/routes"
import { useLocation } from 'react-router-dom';
import useLanguage from "./useLanguage";
import { subdomainsList } from "../helper/subdomains";
import { PageStateContext } from "../components/FrontOffice/pageState";
import { fastfoodname } from "../helper/conf";

const useDynamicTitle = (subdomain)=>{
    const location = useLocation()
    const { text } = useLanguage()
    const suffix = ` - ${fastfoodname}`
    const { pageState, bopageState, pagesList } = useContext(PageStateContext)

    const get = () =>{ 
        const currentLocation = location.pathname
        switch (subdomain){
            case subdomainsList.home:
                switch (currentLocation){
                    case RoutesList.landing:
                        switch (pageState){
                            case pagesList.home: return text.home + suffix
                            case pagesList.menu: return text.menu + suffix
                            case pagesList.contact: return text.contacts + suffix
                            default: return fastfoodname
                        }                   
                    case RoutesList.auth: return text.loginsignupname + suffix
                    case RoutesList.menu: return text.menu + suffix
                    case RoutesList.chatbot: return text.chatbot + suffix
                    default: return fastfoodname
                }
            case subdomainsList.admin:
                switch (currentLocation){
                    case RoutesList.landing:
                        switch (bopageState){
                            case pagesList.orders : return text.orders + suffix
                            case pagesList.bomenu : return text.menu + suffix
                            case pagesList.sales : return text.sales + suffix
                            case pagesList.infos : return text.infos + suffix
                            default: return fastfoodname
                        }
                    case RoutesList.auth: return text.loginname + suffix
                    default: return fastfoodname
                }
            default: return fastfoodname
        }
    }
    
    const [title, setTitle] = useState('')
    useEffect( () => setTitle(get()), [location, pageState, bopageState])
    
    return title
}
export default useDynamicTitle