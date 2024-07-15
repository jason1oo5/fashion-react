import { Grid } from "@mui/material"
import { Outlet } from "react-router-dom"

const AdminPage = () => {

    return (        
        <Grid sx={{width: '100%'}}>
            <Outlet />        
        </Grid>
    )
}

export default AdminPage