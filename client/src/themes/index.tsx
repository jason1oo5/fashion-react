import { Theme } from "@mui/material";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export function getThemeByName(theme: string): Theme {
    return themeMap[theme];
  }

const themeMap: { [key: string]: Theme } = {
    lightTheme,
    darkTheme
}