import React, { useContext } from 'react'
import Menu from './Menu';
import Carousel from './Carousel';
import FrontOfficeNav from '../Navigator/Main';
import Footer from './Footer';
import { Waypoint } from 'react-waypoint';
import { PageStateContext } from '../pageState';

const Home = () =>{
    const { changePage, pagesList } = useContext(PageStateContext)
    return(<> 
        <FrontOfficeNav/>
        <Waypoint onEnter={()=> changePage(pagesList.home , true)} onLeave={()=> changePage(pagesList.menu , true)}/>
        <Carousel/>
        <Menu/>      
        <Footer/>
        <Waypoint onEnter={()=> changePage(pagesList.contact , true)} onLeave={()=> changePage(pagesList.menu , true)}/>
    </>
    )
}

export default Home