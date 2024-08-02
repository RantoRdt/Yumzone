import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeStateContext } from './themeState'
import CheckIcon from '@mui/icons-material/Check'

const colors = {
    primary: '#5c090d',
    secondary : '#ec9713',
    white: '#fff',
    lightgray: "#eee",
    darkgray: "#777",
    black: '#101418',
    red: '#ff0000',
    middlegray: '#312E2E',

}

const fontFamily = {
    main: "Clash Display",
    second: "Milky Rainbow"
}

const getPalette = (dark) => {
    return dark ?
    {
        mode: "dark",
        primary: { main: colors.primary },
        secondary: { main: colors.secondary },
        container: { primary: colors.black, secondary: colors.secondary, light: colors.black, lmid: colors.black, dmid: colors.lightgray, dark: colors.white, shadow: colors.white, lgr: colors.middlegray },
        text: { main: colors.white, light_: colors.white, primary_light: colors.white, secondary: colors.secondary }
        
    }:{
        mode: "light",
        primary: { main: colors.primary },
        secondary: { main: colors.secondary },
        container: { primary: colors.primary, secondary: colors.secondary, light: colors.white, lmid: colors.lightgray, dmid: colors.darkgray, dark: colors.black, shadow: colors.red, lgr: colors.lightgray },
        text: { main: colors.black, light_: colors.white, primary_light: colors.primary, secondary: colors.secondary }
        
    }
}
const getTheme = dark => {
    return createTheme({
        palette: getPalette(dark),
        typography: { fontFamily: fontFamily.main},
        breakpoints: {
            values: {
                min: 0,
                xs: 300,
                sm: 600,
                md: 900,
            }
        },
        components: {
            MuiAlert:{
                defaultProps: {
                    iconMapping: { success: <CheckIcon/> }
                },
                styleOverrides: {
                    root: { background: 'none' }
                }
            },
            MuiAvatar: {
                styleOverrides: { root: ({theme}) => {return { color: theme.palette.text.main}} }
            },
            MuiButton:{
                styleOverrides: {
                    root: ({theme}) => {return {textTransform: 'inherit', transition: '.3s', color: theme.palette.text.main, fontFamily: fontFamily.main }},
                    text: ({theme}) => {return{ color: "inherit"}},
                    outlined: ({theme}) => {return{ color: theme.palette.text.primary_light, border: "none", '&:hover': { border: 'none' } }},
                    contained: ({theme}) => {return {
                        backgroundColor: theme.palette.container.secondary,
                        color: theme.palette.text.light_,
                        borderRadius: '30px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: theme.palette.container.secondary,
                            transform: 'scale(1.075)'
                        },
                        '&:disabled': {
                            backgroundColor: theme.palette.container.lmid
                        }
                    }}
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: { transition: '.4s' }
                },
                variants: [
                    {
                        props : {variant: 'menu-card'},
                        style: ({theme}) => {
                            return {
                                position: 'relative',
                                padding: '30px 15px',
                                borderRadius: '15px',
                                gap: '5px',
                                boxSizing: 'border-box',
                                boxShadow: '5px 5px 15px -5px ' + theme.palette.container.dark,
                                aspectRatio: '1/1',
                                overflow: 'visible',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }
                        }
                    },
                ]
            },
            MuiCheckbox: {
                styleOverrides:{
                    root:({theme}) =>{ return {
                        '&.Mui-checked': { color: theme.palette.secondary.main }
                    }}
                }
            },
            MuiCircularProgress:{
                styleOverrides: {
                    root: ({theme}) => {return {
                        color: theme.palette.text.main,
                        transform: "scale(.5)",
                        maxHeight: "20px",
                        maxWidth: "20px"
                    }}
                }
            },
            MuiCssBaseline: {
                styleOverrides: `
                    *{ margin: 0; box-sizing: border-box}
                    body{ overflow-x: hidden; }
                    ::-webkit-scrollbar{ width: .5rem; background-color: ${colors.primary}  }
                    ::-webkit-scrollbar-button{ height: 0; }
                    ::-webkit-scrollbar-thumb{
                        border-radius: 7px;
                        background-color: ${colors.secondary};
                    }
                    @font-face {
                        font-family: ${fontFamily.second};
                        font-weight: 400;
                        src: local(${fontFamily.second}), url('/fonts/MilkyRainbow.otf') format('opentype');
                    }
                    @font-face {
                        font-family: ${fontFamily.main};
                        font-weight: 400;
                        src: local(${fontFamily.main}), url('/fonts/ClashDisplay.ttf') format('truetype');
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(-2px); opacity: .5; }
                        25% { opacity: .9; }
                        50% { transform: translateY(2px); opacity: .5; }
                    }
                `
            },
            MuiDialog: {
                variants: [
                    {
                        props : {variant: 'order'},
                        style: ({theme}) => {
                            return {
                                "& .MuiPaper-root":{
                                    padding: "15px",
                                    boxSizing: "border-box",
                                    width: "50%",
                                    [theme.breakpoints.down('md')]: { width: "60%" },
                                    [theme.breakpoints.down('sm')]: { width: "75%" },
                                    [theme.breakpoints.down('xs')]: { width: "90%" },
                                }

                            }
                        }
                    }
                ]
            },
            MuiGrid:{
                variants: [
                    {
                        props: { variant: 'card-container' },
                        style: ({theme}) => {return {
                            padding: '0 5px',
                            [theme.breakpoints.down('xs')]: { padding: '0px' },
                        }}
                    }
                ]
            },
            MuiIcon: {
                styleOverrides:{
                    root: ({theme}) =>{ return{
                        color: theme.palette.text.main,
                        '&.writing-item': { animation: 'bounce .9s infinite ease-in-out' }
                    } },
                },
            },
            MuiIconButton:{
                styleOverrides: {
                    root: {
                        aspectRatio: '1/1',
                    }
                },
                variants: [
                    {
                        props: { variant: 'contained' },
                        style: ({theme}) =>{
                            return {
                                backgroundColor: theme.palette.container.secondary,
                                color: theme.palette.text.light_,
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: theme.palette.container.secondary,
                                },
                                '&:disabled': {
                                    backgroundColor: theme.palette.container.lmid
                                }
                            }
                        }
                    },
                    {
                        props: {variant: 'light_'},
                        style: ({theme}) =>{
                            return {
                                color: theme.palette.text.light_,
                            }
                        }
                    }
                    ,{
                        props: { variant: 'floating' },
                        style: ({theme}) =>{
                            return {
                                width: '45px', 
                                height: '45px',   
                                borderRadius: '50%',
                                color: theme.palette.text.main,
                                backgroundColor: theme.palette.container.light,
                                boxShadow: '1px 1px 2px 0px ' + theme.palette.container.dark,
                                '&:hover': { backgroundColor: theme.palette.container.light }
                            }
                        }
                    }
                ]
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: { minHeight: '25px', height: '40px', '&:hover': { backgroundColor: 'transparent' },}
                }
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        '&.no-border .MuiOutlinedInput-notchedOutline, &.no-border.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: "none" }, 
                    }
                },
            },
            MuiSpeedDial: {
                styleOverrides: {
                    root: ({theme}) =>{ return {
                        '.MuiFab-sizeLarge': {
                            color: theme.palette.text.main,
                            backgroundColor: theme.palette.container.light,
                            width: '45px', 
                            height: '45px',   
                            borderRadius: '50%',
                            transition: '.4s',
                            boxShadow: '1px 1px 2px 0px ' + theme.palette.container.dark
                        },
                        '.MuiFab-sizeLarge:hover': {
                            backgroundColor: theme.palette.container.light,
                        }
                    }}
                }
            },
            MuiStack: {
                styleOverrides: {
                    root: ({theme}) => {
                        return { transition: '.4s' }
                    },
                },
                variants: [
                    {
                        props: { variant: 'all' },
                        style:({theme}) => { return{ height: '100vh', width: '100%', background: theme.palette.container.light }}
                    },
                    {
                        props: { variant: 'all-but-header' },
                        style: ({theme}) => {
                            return {
                                background: theme.palette.container.light,
                                height: 'calc(100vh - 75px)',
                                [theme.breakpoints.down('md')]: { height: 'calc(100vh - 65px)' },
                                [theme.breakpoints.down('sm')]: { height: 'calc(100vh - 55px)' },
                                [theme.breakpoints.down('xs')]: { height: 'calc(100vh - 45px)' },
                            }
                        }
                    },                
                    {
                        props: { variant: 'chatbot-container' },
                        style: ({theme}) =>{
                            return {
                                overflow: 'hidden',
                                boxShadow: `5px 5px 15px -5px ${theme.palette.container.dark}`,
                                width: '32vw',
                                borderRadius: '15px',
                                background: theme.palette.container.light,
                                [theme.breakpoints.down('md')]: { width: '40vw' },
                                [theme.breakpoints.down('sm')]: { width: '60vw' },
                                [theme.breakpoints.down('xs')]: { width: '85vw' },
                            }
                        }
                    },
                    {
                        props: { variant: 'header' },
                        style: ({theme}) => {
                            return {
                                position: 'sticky',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                backgroundColor: theme.palette.container.primary,
                                top: '0',
                                left: '0',
                                width: '100%',
                                zIndex: '3',
                                padding: '0 20px',
                                boxSizing: 'border-box',
                                height: '75px',
                                [theme.breakpoints.down('md')]: { height: '65px' },
                                [theme.breakpoints.down('sm')]: { height: '55px' },
                                [theme.breakpoints.down('xs')]: { height: '45px' }
                            }
                        } 
                    },
                    {
                        props: { variant: 'footer' },
                        style: ({theme}) => {
                            return {
                                backgroundColor: theme.palette.container.lmid
                            }
                        } 
                    },
                    {
                        props: { variant: 'container' },
                        style: ({theme}) => {
                            return {
                                backgroundColor: theme.palette.container.light
                            }
                        } 
                    },
                    {
                        props : {variant: 'primary'},
                        style: ({theme}) => {
                            return {
                                backgroundColor: theme.palette.container.primary,
                                
                            }
                        }
                    },
                    {
                        props: {variant: 'shadow'},
                        style: ({theme}) => {
                            return {
                                backgroundColor: 'transparent', 
                                filter: `drop-shadow(0px 0px 60px ${theme.palette.container.shadow})`  
                            }
                        }
                    },{
                        props: { variant: 'wrap-content' },
                        style: ({theme}) =>{
                            return {
                                display: 'flex',
                                flexDirection: 'row',
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: 'column',
                                },
                            }
                        }
                    },{
                        props: { variant: 'wrap-content-reverse' },
                        style: ({theme}) =>{
                            return {
                                [theme.breakpoints.down('sm')]: {
                                    flexDirection: 'column-reverse',
                                },
                            }
                        }
                    },{
                        props: { variant: 'width-resize' },
                        style: ({theme}) =>{
                            return {
                                [theme.breakpoints.up('sm')]: {
                                    width: "40%",
                                },
                            }
                        }
                    },
                    {
                        props : {variant: 'sidebar'},
                        style: ({theme}) => {
                            return {
                                backgroundColor: theme.palette.container.lgr,
                                
                            }
                        }
                    }
                ]
            },
            MuiTableHead: {
                styleOverrides: {
                    root: ({theme}) => {return {
                        background: theme.palette.container.lmid,
                    }},
                },
                
            },   
            MuiTab: {
                styleOverrides: {
                    root: ({theme}) => {return {
                        color: theme.palette.text.main,
                        '&.Mui-selected': {
                            color: theme.palette.text.secondary,          
                            
                        },
                        '& .MuiTouchRipple-root': { display: "none" }
                    }},
                }
            },
            MuiTabs: {
                styleOverrides: {
                    root: ({theme}) => {return {
                        '& .MuiTabs-indicator': { backgroundColor: theme.palette.text.secondary, },
                    }},
                }
            },     
            MuiToggleButton: {
                styleOverrides: {
                    root: ({theme}) => {return {
                        color: theme.palette.text.main,
                        textTransform: 'capitalize',
                        background: 'transparent',
                    }},
                },
                variants: [
                    {
                        props: { variant: 'nav' },
                        style:({theme}) => {return {
                            border: 'none',
                            color: theme.palette.text.light_,
                            '& *': { color: 'inherit', },
                            transition: '.2s',
                            '&:hover, &.Mui-selected, &.Mui-selected:hover *': { backgroundColor: 'transparent', fontWeight: 'bold' },
                            '&:hover *': {
                                transform: 'scale(1.025)',
                                color: theme.palette.text.secondary, fontWeight: 'bold'
                            },
                            '&.Mui-selected *': {
                                color: theme.palette.text.secondary,
                                fontWeight: 'bold', fontWeight: 'bold'
                            },
                            '&.Mui-selected:hover *':{ backgroundColor: 'transparent', transform: 'none', fontWeight: 'bold' }
                        }}
                    },
                    {
                        props: { variant: 'back-nav' },
                        style:({theme}) => {return {                        
                            transition: '.2s',
                            border: 'none',
                            color: theme.palette.text.main,
                            '& *': { color: 'inherit', },
                            '&:hover, &.Mui-selected, &.Mui-selected:hover *': { backgroundColor: 'transparent', fontWeight: 'bold' },
                            '&:hover *': {
                                transform: 'scale(1.025)',
                                color: theme.palette.text.secondary, fontWeight: 'bold'
                            },
                            '&.Mui-selected *': {
                                color: theme.palette.text.secondary,
                                fontWeight: 'bold'
                            },
                            '&.Mui-selected:hover *':{ backgroundColor: 'transparent', transform: 'none', fontWeight: 'bold' }
                        }}
                    }
                ]
            },           
            MuiTypography:{
                styleOverrides:{
                    root: ({theme}) =>{ return{ color: theme.palette.text.main, fontFamily: fontFamily.main } },
                    h3: ({theme}) =>{
                        return{
                            color: theme.palette.text.light_
                        }
                    },
                    h1: ({theme}) =>{ return{
                        fontFamily: fontFamily.second,
                        color: theme.palette.text.light_,
                        [theme.breakpoints.down('md')]: { fontSize: '70px' },
                        
                    } }
                },
                variants: [
                    {
                        props: { variant: 'received-message' },
                        style:({theme}) => {return {
                            backgroundColor: theme.palette.container.lmid,
                            padding: '7px 12px',
                            width: 'fit-content',
                            borderRadius: '7px',
                            maxWidth: '65%'  ,
                            '&.writing': { padding: '0px 12px' }
                        }}
                    },
                    {   
                        props: { variant: 'sent-message' },
                        style:({theme}) => {return {
                            backgroundColor: theme.palette.container.primary,
                            color: theme.palette.text.light_,
                            padding: '7px 12px',
                            width: 'fit-content',
                            borderRadius: '7px',
                            alignSelf: 'flex-end',
                            maxWidth: '65%'            
                        }}
                    },
                    {   
                        props: { variant: 'light' },
                        style:({theme}) => {return {color: theme.palette.text.light_}}
                    },
                ]
            }
        }
    })
}
const WithThemeProvider = ({children}) => {
    const { isDark } = useContext(ThemeStateContext)
    return (
        <ThemeProvider theme={getTheme(isDark)}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default WithThemeProvider