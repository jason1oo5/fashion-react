import { Theme } from "@mui/material";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../reducers/themeSlice";
import { getThemeByName } from "../themes"

export const useThemeStyle = (themeName?:string): Theme => {
    const selectedThemeName = useSelector(selectTheme);
    if(themeName) {

    }
    const currentTheme = getThemeByName(selectedThemeName);
    return currentTheme;
}
