import { Box, Divider, Grid, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { EvoTypography, LoginButton, LoginInput } from "../../components/styled-components";
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { sendMailResetLink } from "../../service/authService";
import { useValidator } from "../../hooks/useValidator";
import { Validation_data } from "../../config/interface";

export default function ForgotPassword() {

    const [linkSentState, setLinkSentState] = useState(false);
    const emailRef = useRef<any>(null);

    const sendResetLink = async() => {

        const validation_data: Validation_data[] = [
            {
                input: emailRef.current.value,
                type: 'email',
                inputReg: {
                    min: 5
                }
            }
        ]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(!useValidator(validation_data[0])) {
            return false;
        }               
        try {
            await sendMailResetLink(emailRef.current.value);   
            setLinkSentState(true);            
            setTimeout(() => {
                setLinkSentState(false);
            }, 3000);
            return toast.success("Reset request has been sent to your email");
        } catch (error) {
            return toast.error("User not found");
        }                        
        
    }

    return (
        <Grid container sx={{ height: '100vh', display: { md: 'flex', xs: 'block' } }}>            
            <Grid 
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',                
                    // backgroundImage: `url('/assets/images/page_img/fashion_login.svg')`,
                    backgroundColor: '#29c7c1',
                    height: '100vh'
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'contain',                
            }}>                
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        boxShadow: '300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgba(144, 202, 249, 0.46)',
                        paddingInline: '10px',
                        minWidth: '350px',
                        height: 'auto',
                        paddingBlock: 3,
                        borderRadius: '6px'
                    }}>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" alignItems="center" justifyContent='center' flexDirection='column'>
                            <Box sx={{
                                paddingInline: '17px',
                                paddingBlock: '4px 1px',
                                backgroundColor: '#9970e3',
                                borderRadius: '5px',
                                marginBlock: 2
                            }}>
                                <img src='/assets/images/navbar/eflogo.png' style={{ color: 'green' }} />
                            </Box>
                            <EvoTypography sx={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'rgb(103, 58, 183)'
                            }}>
                                Forgot Password
                            </EvoTypography>
                            <EvoTypography sx={{
                                fontSize: '16px',
                                fontWeight: '400',
                                color: 'rgb(158, 158, 158)',
                                mt: 1,
                                textAlign: 'center',
                                width: '335px'
                            }}>
                                Enter your email address below and we'll send you password reset OTP.
                            </EvoTypography>
                        </Box>
                        <Grid mt={1}>                                                                                    
                            <Box>
                                <Grid
                                    display="flex"
                                    alignItems="center"
                                    mb={1}
                                    mt={2}>
                                    <TextField
                                        id="evo-email"
                                        variant="outlined"
                                        inputRef={emailRef}
                                        label='email'
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            width: '100%',
                                            '& input': {
                                                paddingInlineStart: '35px'
                                            }
                                        }} />
                                    <EmailIcon sx={{ position: 'absolute', fontSize: '20px', pl: 1, color: '#7c7f89' }} />
                                </Grid>
                                {linkSentState&&
                                    <EvoTypography color="#47ad5d">✔️Check your email. Link has been sent</EvoTypography>                                             
                                }
                                <LoginButton type="submit" textcolor="#b1a8a8" bgcolor="#3a4052 !important" borderraidus="1px" width='100%' style={{ marginTop: '10px' }} onClick={sendResetLink}>Send Mail</LoginButton>
                            </Box>
                            <Divider sx={{
                                flexGrow: 1,
                                mt: 2,
                                borderWidth: '0, 0, thin',
                                borderStyle: 'solid',
                                borderColor: 'rgb(238, 238, 238)'
                            }} variant='fullWidth' />
                            <Box mt={2}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <EvoTypography fontSize="16px" color="rgb(33, 33, 33)" fontWeight={500} textAlign='center'>Already have an account?</EvoTypography>
                                </Link>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Grid>           
        </Grid>    
    )
}