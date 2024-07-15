import { Grid } from "@mui/material";
import { useState } from "react";
import AccountHeader from "../../../components/AccountHeader";
import EvoTable from "../../../components/table/EvoTable";
import { TableMockData } from "../../../config/mock";
import { AccountHeaderContent } from "../../../config/navConfig";
import AddCompanyDialog from "../../admin/operation/accountManagement/dialogs/addCompanyDlg";

const Company = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const addCompany = (open: any) => {  
        setOpenDialog(open);
    }

    const closeDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Grid sx={{
                backgroundColor: 'white',                
                height: 'auto',
                width: '100%',
                borderRadius: '4px',
                boxShadow: '0px 0px 30px 0px rgb(82 63 105 / 30%)',    
                ml: 2,
                pb: 3,
                mb: 3
            }}>
                <AccountHeader header={AccountHeaderContent[2]} handleHeadAction={addCompany} />
                <Grid sx={{p: '15px 30px 10px 30px'}}>
                    <EvoTable tableData={TableMockData} type='1' />
                </Grid>
                <AddCompanyDialog openState={openDialog} handleHeadAction={closeDialog} />
            </Grid>
        </>
    )
}

export default Company;