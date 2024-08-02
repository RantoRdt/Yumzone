import React, { createContext, useState } from "react";
import WithThemeProvider from "./theme";

const dmkey = 'DM-M1-PROJECT-2024'
const ThemeStateContext = createContext(null)

const ThemeStateProvider = ({children}) => {
    const [isDark, setDark] = useState(localStorage.getItem(dmkey) == 'dark' )
    const switchTheme = () => {
        localStorage.setItem(dmkey, !isDark)
        setDark(!isDark)
    }

    return(
        <ThemeStateContext.Provider value={{isDark, switchTheme}}>
            <WithThemeProvider>
                {children}
            </WithThemeProvider>
        </ThemeStateContext.Provider>
    )
}

export { ThemeStateContext, ThemeStateProvider }