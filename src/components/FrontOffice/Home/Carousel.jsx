import React, { useContext, useRef } from "react";
import { Stack, Typography, Button, Box, SvgIcon } from "@mui/material";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import useLanguage from "../../../hooks/useLanguage";
import { PageStateContext } from "../pageState";
import { ThemeStateContext } from "../../../theme/themeState";

const Carousel = () =>{
    const { text } = useLanguage()
    const { changePage, pagesList } = useContext(PageStateContext)
    const { isDark } = useContext(ThemeStateContext)
    const carouselContent = [
        {
            category: 'Pizza',
            image: '/images/home/pizzas.png',
            description: text.descripizza,

        },
        {
            category: 'Tacos',
            image: '/images/home/taco.png',
            description: text.descritacos,

        },
        {
            category: 'Burger',
            image: '/images/home/burger.png',
            description: text.describurger,

        }
    ]
    const autoplaySpeed = 3000
    const slider = useRef(null)

    return (
        <Stack id="carousel"  overflow='hidden'>
            <Stack variant="primary">    
                <Slider ref={slider} dots={false} infinite={false} speed={500} slidesToShow={1} 
                    slidesToScroll={1} autoplay={true} autoplaySpeed={autoplaySpeed} 
                    afterChange={current => { 
                        if (current == carouselContent.length -1) 
                        setTimeout(() => { if (slider.current) slider.current.slickGoTo(0) }, autoplaySpeed/2) 
                }}>
                        {
                            carouselContent.map((c, i) => <Stack key={`slide${i}`} variant='all-but-header'>
                                <Stack height='100%'  variant="primary">
                                    <Stack display='flex' height='100%' alignItems='center' width='100%' alignSelf='center'
                                    flexDirection={(i%2 == 0 ) ? 'row' : 'row-reverse'} 
                                    justifyContent='space-evenly' variant="wrap-content-reverse">
                                        <Stack/>
                                        <Stack padding="2%" spacing={6} variant="width-resize" display="flex" justifyContent="center" alignItems="center" >
                                            <Typography variant="h1" textAlign='center'>{c.category}</Typography>
                                            <Typography variant="light" textAlign='center' style={{ lineHeight: '2' }}>{c.description}</Typography>
                                            <Button variant="contained" onClick={()=>{changePage(pagesList.menu)}} style={{width: 'fit-content', padding: '10px 30px', alignSelf: 'center'}}>{text.voirmenu}</Button>
                                        </Stack>
                                        <Stack variant="shadow" backgroundColor="transparent" display='flex' alignItems='center' justifyContent='center'>
                                            <img src={c.image} alt="" width="90%" />
                                            {/*<Box component="img" src={c.image} width="60%"/>*/}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            )
                        }
                </Slider>
            </Stack>
            <Stack variant="primary" style={{height: isDark ? '0px' : '100px'}}><Box component='img'  src={'/svg/wave1.svg'} alt="" sx={{height: '100%'}}/></Stack>
        </Stack>
    )
}

export default Carousel