import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(()=>{
    let saved = localStorage.getItem("darkMode");
    return (saved) ?JSON.parse(saved) :false
  });

  const toggleDarkMode = ()=>{
    setDarkMode((prev)=>!prev);
  }

  useEffect(()=>{
    localStorage.setItem("darkMode",JSON.stringify(darkMode));
  },[darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};