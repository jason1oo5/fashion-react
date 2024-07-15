import { Grid, IconButton, TextField } from "@mui/material";
import AccountHeader from "../../../components/AccountHeader";
import { EvoTypography } from "../../../components/styled-components";
import EvoTable from "../../../components/table/EvoTable";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { UnverifiedUserTable } from "../../../config/mock";
import { AccountHeaderContent, ReferralConfig } from "../../../config/navConfig";
import { useTranslation } from "react-i18next";

const Referral = () => {
    const { t } = useTranslation();

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
                <AccountHeader header={AccountHeaderContent[3]} />
                <Grid sx={{p: '15px 30px 10px 30px'}}>
                    <Grid container sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBlock: 1.5
                    }}>
                        <Grid item xs={2} >
                            <EvoTypography>
                                {t('qr_code')}
                            </EvoTypography>
                        </Grid>
                        <Grid item xs={10} >
                            <img alt="qr-code" src="/assets/images/page_img/qr_code.png" />
                        </Grid>
                    </Grid>
                    {ReferralConfig.map((item: any, index) => (
                        <Grid 
                        key={item + index}
                        container 
                        sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: index===3?'flex-start':'center',
                        mt: 1,                  
                        }}>
                        <Grid item xs={2}>
                            <EvoTypography>{ t(item.toLowerCase()) }</EvoTypography>
                        </Grid>
                        <Grid item xs={10}>                
                            {index===0?
                            <Grid display='flex' alignItems='center'>
                                <TextField
                                value="https://myaccount.devovor.com/register?ref=1ac52c1a-d62f-11eb-a2e7-3e1f3a28b409"
                                variant="outlined"                                
                                aria-readonly
                                InputLabelProps={{
                                    shrink: true,                    
                                }}                            
                                sx={{
                                    width: '100%',
                                    backgroundColor: '#f3f6f9',
                                    borderRadius: '5px',                                    
                                    '& input': {
                                        paddingInlineStart: '25px',
                                        height: '15px',                                                   
                                        fontSize: '14px',
                                    }
                                }} />
                                <IconButton sx={{
                                    marginLeft: '-40px',
                                    color: '#3699FF',                                    

                                }}>
                                    <ShareRoundedIcon />
                                </IconButton>
                            </Grid>                            
                            :
                            <TextField        
                            value={index===1?'5 EvoCredit per successful user referred':'1 Verified / 1 Referred'}
                            variant="outlined"
                            aria-readonly
                            InputLabelProps={{
                                shrink: true,                    
                            }}                                                        
                            sx={{
                                width: '100%',
                                backgroundColor: '#f3f6f9',
                                borderRadius: '5px',
                                '& input': {
                                    paddingInlineStart: '25px',
                                    height: '15px',                                               
                                    fontSize: '14px'
                                }
                            }} />
                            }                
                        </Grid>
                        </Grid>
                    ))
                    }     
                    <Grid mt={5}>
                        <EvoTypography sx={{
                            fontSize: '16px'
                        }}>{t('list_unverified_referred_users')}</EvoTypography>
                        <Grid mt={3}>
                            <EvoTable tableData={UnverifiedUserTable} type='-1' />
                        </Grid>
                    </Grid>                         
                </Grid>
            </Grid>
        </>
    )
}

export default Referral;