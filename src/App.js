import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeStateProvider } from './theme/themeState';
import useDynamicTitle from './hooks/useDynamicTitle';
import { subdomainsList } from './helper/subdomains'
import RoutesList from './helper/routes'
import AdminLogin from './components/BackOffice/AdminLogin';
import Admin from './components/BackOffice/Main';
import Home from './components/FrontOffice/Home/Main';
import { PageStateProvider } from './components/FrontOffice/pageState';
import HomeLogin from './components/FrontOffice/HomeLogin';
import { AuthStateContext, AuthStateProvider } from './components/Auth/authState'
import FloatingComponents from './components/Floatings/Main';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const ProtectedRoute = ({isAuthRoute=false, to: destination}) => {
  const { boToken } = useContext(AuthStateContext)

  if (isAuthRoute) return boToken ? <Navigate to={RoutesList.landing}/> : destination
  return boToken ? destination : <Navigate to={RoutesList.auth}/>
}

const Routing = () =>{
    document.title = useDynamicTitle(subdomainsList.home)
    return(
        <Routes>
            <Route path={RoutesList.landing} element={<Home/>}/> 
            <Route path={RoutesList.auth} element={<HomeLogin/>} />
        </Routes>
    )
}

const AdminRouting = () =>{
    document.title = useDynamicTitle(subdomainsList.admin)
    return(
      <Routes>
          <Route path={RoutesList.auth} element={<ProtectedRoute isAuthRoute to={<AdminLogin/>}/>}/>
          <Route path={RoutesList.landing} element={<ProtectedRoute to={<Admin/>}/>}/> 
      </Routes>
    )
}

export const APPS = [
  {
      subdomain: ['', 'www'],
      app: Routing,
      main: true
  },{
      subdomain: ['admin'],
      app: AdminRouting,
      main: false
  }
]

const getSubdomain = location =>{
  const locationParts = location.split('.')
  const isLocalhost = locationParts.slice(-1)[0] === 'localhost'
  const sliceTill = (isLocalhost) ? -1 : -2
  return locationParts.slice(0, sliceTill).join('')
}

const getApp = () =>{
  const subdomain = getSubdomain(window.location.hostname)
  const main = APPS.find(app => app.main)
  if (!main) throw new Error('Must have main app')
  if (subdomain === '') return main.app
  const app = APPS.find(app => app.subdomain.includes(subdomain))
  if (!app) return main.app
  return app.app
}

const App = () => {
  const CurrentApp = getApp()
  return( 
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AuthStateProvider>
          <BrowserRouter>
            <ThemeStateProvider>      
              <PageStateProvider>
                <CurrentApp/>
                <FloatingComponents/>
              </PageStateProvider>
            </ThemeStateProvider>
          </BrowserRouter>
        </AuthStateProvider>
      </LocalizationProvider>
  )
}

export default App