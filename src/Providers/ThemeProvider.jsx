import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({children}) => {
    const [theme,setTheme] = useState(localStorage.getItem('theme') || "light");

     //theme change

    useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])
  
  const handleChangeTheme = ()=>{
    const currentTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  }

    const themeValue = {
        theme,
        handleChangeTheme,
    }
    return (
       <ThemeContext value={themeValue}>
        {children}
       </ThemeContext>
    );
};

export default ThemeProvider;
