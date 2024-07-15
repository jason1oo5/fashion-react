import { Grid, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import { handleLeftbar, leftbarState } from "../../../reducers/leftbarSlice";
import Leftbar from "./leftbar";

const Account = () => {
    const theme = useThemeStyle();
    const md_media = useMediaQuery(theme.breakpoints.up('lg'));    
    const leftbar_pos = useSelector(leftbarState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(md_media) {
            dispatch(handleLeftbar('0'));
        } else {
            dispatch(handleLeftbar('-380px'));
        }
    }, [md_media])

    return (
        <>
        <Grid sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: '#eef0f8',
        }}>
            <Grid  container sx={{ 
                flexGrow: 1,                 
                pt: 10,        
                pr: 6,
                maxWidth: '1340px',                
                }}>
                <Grid item sx={{ 
                    p: '0 15px 10px 40px', 
                    width: '380px', 
                    position: md_media?'relative':'absolute', 
                    left: leftbar_pos,
                    transitionDuration: '0.5s',
                    zIndex: 1,  }}>
                    <Leftbar />
                </Grid>
                <Grid item xs>
                    <Outlet />
                </Grid>
            </Grid>       
        </Grid>                
        </>
    )
}

export default Account;