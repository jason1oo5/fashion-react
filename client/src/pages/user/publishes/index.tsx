import { Grid } from "@mui/material";
import { Outlet } from "react-router";
import Page from "../../../components/Page";

const Publishes = () => {

    return (
        <Page title="My products">
            <Grid sx={{
                backgroundColor: '#eef0f8',
                minHeight: '100vh'
            }}>
                <Grid sx={{
                    marginInline: { xl:'auto', sm: '30px', xs: '30px'},  
                    maxWidth: '1500px', 
                    display: 'flex', 
                    justifyContent: 'center',                                
                    }}>                         
                    <Grid sx={{ width: '100%', mt: 10, mb: 5 }}>
                        <Outlet />
                    </Grid>                                
                </Grid>    
            </Grid>            
        </Page>
    )
}

export default Publishes;