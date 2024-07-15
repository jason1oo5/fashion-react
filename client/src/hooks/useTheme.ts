import { Theme } from "@mui/material";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getThemeByName } from "../themes"

export const useTheme = (themeName?:string): Theme => {
    if(themeName) {

    }
    const currentTheme = localStorage.getItem('theme')=='light'?getThemeByName('light'):getThemeByName('dark');
    return currentTheme;
}
