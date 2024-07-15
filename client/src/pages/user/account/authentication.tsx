import { Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AccountHeader from "../../../components/AccountHeader";
import { EvoTypography } from "../../../components/styled-components";
import { AccountHeaderContent } from "../../../config/navConfig";
import { changePassword } from "../../../service/userService";

const Authentication = () => {
    const [changePwdState, setChangePwdState] = useState(false);
    const [newPwd, setNewPwd] = useState('');       
    const { t } = useTranslation();

    const handlePassword = async() => {
        if(changePwdState) {
            try {
                const c_user: any = localStorage.getItem('user');
                const user = JSON.parse(c_user);                
                const state = await changePassword(newPwd);
                toast.success("Password changed successfully")  ;
                setChangePwdState(false);
            } catch (error) {
                toast.error("error")   
            }                        
        } else {
            setChangePwdState(true);
        }
    }

    const handlePwdInput = (e: any, idx: number) => {
        const value = e.target.value;        
        setNewPwd(value);        
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
                <AccountHeader header={AccountHeaderContent[1]} />
                <Grid sx={{p: '15px 30px 10px 30px'}}>
                    <Grid container sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: changePwdState?'flex-start': 'center',
                        mt: 1
                    }}>
                        <Grid item md={3.5} >
                            <EvoTypography>
                                {t('change_password')} :
                            </EvoTypography>                            
                        </Grid>
                        <Grid item md={6} >
                            {changePwdState&&
                                <Grid>                                    
                                    <TextField
                                    onChange={(e) => handlePwdInput(e, 1)}
                                    type="password"
                                    variant="outlined"                                
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder='New password  (min = 8)'
                                    sx={{
                                        width: '100%',
                                        mb: 1,
                                        '& input': {
                                            paddingInlineStart: '25px',
                                            height: '18px'
                                        }
                                    }} />
                                </Grid>                                
                            }
                            <IconButton 
                            onClick={handlePassword}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center', 
                                backgroundColor: '#3699FF !important',
                                color: 'white',                                    
                                paddingBlock: 1,
                                paddingInline: 1.5,
                                borderRadius: 1
                            }}>
                                <EvoTypography>
                                    {changePwdState?t('change_password'):t('set_new_password')}
                                </EvoTypography>
                            </IconButton>                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
        )
}

export default Authentication;