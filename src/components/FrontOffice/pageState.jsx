import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RoutesList from '../../helper/routes';
import { subdomainsList } from "../../helper/subdomains"

const PageStateContext = createContext(false);

const PageStateProvider = ({children}) => {
    const pagesList = { home: 'home', menu: 'menu', login: 'login', admintomain: 'admintohome', contact: 'contact', logintomain: 'logintomain', orders: 'orders', bomenu: 'bomenu', sales: 'sales', infos: 'infos'}
    const [fopageState, setFoPageState] = useState(pagesList.home)
    const [bopageState, setBoPageState] = useState(pagesList.orders)

    const navigate = useNavigate()
    const withoutFirstPart = t =>{
        const parts = t.split('.')
        parts.shift()
        return parts
    }
    const protocol = window.location.protocol
    const host = window.location.host

    const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    const goTo = newState => {
        switch(newState){
            case pagesList.home: scrollTo('carousel'); break
            case pagesList.menu: scrollTo('menu') ; break
            case pagesList.contact: scrollTo('contacts') ; break
            case pagesList.logintomain: navigate(RoutesList.landing); break
            case pagesList.login: window.location.href = `${protocol}//${subdomainsList.admin}.${host}`; break
            case pagesList.admintomain: window.location.href = `${protocol}//${withoutFirstPart(host)}`; break
            default: break
        }
    }

    const changePage = (newState, byScroll=false) => {
        setFoPageState(newState)
        if (!byScroll) goTo(newState)
    }

    const boChangePage = newState => setBoPageState(newState)

    return (
        <PageStateContext.Provider value={{ pagesList, pageState: fopageState, bopageState, changePage, boChangePage }}>
            {children}
        </PageStateContext.Provider>
    )
}
export {PageStateContext, PageStateProvider}