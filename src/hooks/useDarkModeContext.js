import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";

export const useDarkModeContext = ()=>{
    return useContext(DarkModeContext);
};