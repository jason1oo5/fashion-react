import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { EvoTypography, LoginButton } from "../../components/styled-components";
import { Link, useLocation } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { Validation_data } from "../../config/interface";
import { useValidator } from "../../hooks/useValidator";
import { changePassword } from "../../service/authService";

export default function ResetPassword() {

    const passwordRef = useRef<any>(null);
    const location = useLocation();    
    const [pwdViewState, setPwdViewState] = useState(false);    
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        const paramStr = location.search.substr(1, location.search.length);
        const token_param = paramStr.split('&')[0].split('=')[1];
        const email_param = paramStr.split('&')[1].split('=')[1];
        // console.log('params', token_param, 'email', email_param);
        setToken(token_param);
        setEmail(email_param);
    }, [location.search])
    
    const changePwdViewState = () => {
        setPwdViewState(!pwdViewState);
    }
    
    const updatePassword = async() => {
        const validation_data: Validation_data = {
                input: passwordRef.current.value,
                type: 'password',
                inputReg: {
                    min: 8
                }
            }        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(!useValidator(validation_data)) {
            return false;
        }

        const dataToSend = {
            email: email,
            password: passwordRef.current.value,
            token: token
        }

        try {
            const response = await changePassword(dataToSend);
            toast.success("Password successfully updated");
        } catch (error) {
            toast.error("Update failed");   
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
                                <img src='/assets/images/navbar/eflogo.png' alt="eflogo" style={{ color: 'green' }} />
                            </Box>
                            <EvoTypography sx={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'rgb(103, 58, 183)'
                            }}>
                                Reset Password
                            </EvoTypography>
                            <EvoTypography sx={{
                                fontSize: '16px',
                                fontWeight: '400',
                                color: 'rgb(158, 158, 158)',
                                mt: 1
                            }}>
                                Enter new password
                            </EvoTypography>
                        </Box>
                        <Grid mt={1}>                                                                                    
                            <Box>
                                <Grid display="flex" alignItems="center" mt={2} mb={2}>
                                    <TextField
                                        inputRef={passwordRef}
                                        type={pwdViewState?'text':'password'}
                                        id="evo-password"
                                        variant="outlined"
                                        label='password'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{
                                            width: '100%',
                                            minWidth: '330px',
                                            '& input': {
                                                paddingInlineStart: '35px'
                                            }
                                        }} />                                    
                                    <LockIcon sx={{ position: 'absolute', fontSize: '20px', pl: 1, color: '#7c7f89' }} />                                                                                
                                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                        {pwdViewState?
                                        <Button
                                            onClick={changePwdViewState}
                                            sx={{ position: 'absolute', pl: 1, color: '#7c7f89' }}>
                                            <VisibilityOffIcon sx={{ fontSize: '20px' }} />                                        
                                        </Button>
                                        :               
                                        <Button 
                                            onClick={changePwdViewState}
                                            sx={{ position: 'absolute', pl: 1, color: '#7c7f89' }}>
                                            <VisibilityIcon sx={{ fontSize: '20px' }} />
                                        </Button>                                                                 
                                        }                                        
                                    </Box>                                    
                                </Grid>
                                <LoginButton type="submit" textcolor="#b1a8a8" bgcolor="#3a4052 !important" borderraidus="1px" width='100%' onClick={updatePassword}>Reset password</LoginButton>
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
                                    <EvoTypography fontSize="16px" color="rgb(33, 33, 33)" fontWeight={500} textAlign='center'>Sign in</EvoTypography>
                                </Link>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Grid>           
        </Grid>    
    )
}