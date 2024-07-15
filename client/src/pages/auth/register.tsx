import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { EvoTypography, LoginButton } from "../../components/styled-components";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
// import ReCAPTCHA from "react-google-recaptcha";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import { register } from "../../service/authService";
import { GoogleLogin } from 'react-google-login';
import { Validation_data } from "../../config/interface";
import { useValidator } from "../../hooks/useValidator";

const google_client_id = process.env.REACT_APP_GOOGLE_APP_ID;
// process.env.REACT_APP_CLIENTID;

export default function Register() {    
    const navigate = useNavigate();    
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);    
    const nameRef = useRef<any>(null);
    const agreeCheckRef = useRef<any>(null);    
    
    // const [capchaState, setCapchaState] = useState(false);    
    const [pwdViewState, setPwdViewState] = useState(false);
    
    const changePwdViewState = () => {
        setPwdViewState(!pwdViewState);
    }

    // const onCapchaChange = (value: any) => {
    //     // console.log("capcha value", value)
    //     if(value) {
    //         setCapchaState(true);
    //     } else {
    //         setCapchaState(false);
    //     }
    // }    

    const responseGoogle = (response: any) => {
        console.log('response from google', response);
        // emailRef.current.value = response.profileObj.email;
        // usernameRef.current.value = response.profileObj.name;        
    }

    const createNewAccount = async() => {                    

        const validation_data: Validation_data[] = [
            {
                input: nameRef.current.value,
                type: 'name',
                inputReg: {
                    min: 3,
                    max: 20
                }
            },
            {
                input: emailRef.current.value,
                type: 'email',
                inputReg: {
                    min: 5
                }
            },
            {
                input: passwordRef.current.value,
                type: 'password',
                inputReg: {
                    min: 8
                }
            },            
        ]

        let validation_state = true;
        validation_data.map((item) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if(!useValidator(item)) {
                validation_state = false;
                return false;
            }
        })

        if(!validation_state) { return ; }


        if(!agreeCheckRef.current.checked) {
            return toast.warn("You should check the agreement");
        }

        const dataToSend = {
            email: emailRef.current?.value,
            name: nameRef.current?.value,
            password: passwordRef.current?.value,                        
        }
        
        if(emailRef.current.value||nameRef.current.value||passwordRef.current.value) {
            try {
                await register(dataToSend);
                toast.success("Successfully created your account");
                navigate('/login');    
            } catch (error) {
                toast.error("Register failed");                
            }
        } else {
            toast.error("Please input all details");
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
                                <img alt="eflogo" src='/assets/images/navbar/eflogo.png' />
                            </Box>
                            <EvoTypography sx={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: 'rgb(103, 58, 183)'
                            }}>
                                Sign up
                            </EvoTypography>
                            <EvoTypography sx={{
                                fontSize: '16px',
                                fontWeight: '400',
                                color: 'rgb(158, 158, 158)',
                                mt: 1
                            }}>
                                Enter your credentials to continue
                            </EvoTypography>
                        </Box>
                        <Grid mt={1}>
                            <Grid>
                                <GoogleLogin
                                    className="goole-login-btn"
                                    clientId={String(google_client_id)}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"} />
                            </Grid>
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBlockStart: 4,
                                marginBlockEnd: 2
                            }}>
                                <Divider variant="fullWidth" sx={{
                                    margin: 0,
                                    flexShrink: 0,
                                    borderWidth: '0, 0, thin',
                                    borderStyle: 'solid',
                                    borderColor: 'rgb(238, 238, 238)',
                                    flexGrow: 1
                                }}>
                                    <Button disabled sx={{
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        borderRadius: '6px',
                                        padding: '4px 56px'
                                    }}>OR</Button>
                                </Divider>
                            </Grid>
                            <EvoTypography sx={{
                                fontSize: '16px',
                                fontWeight: '400',
                                color: 'rgb(33, 33, 33)',
                                textAlign: 'center'
                            }}>
                                Sign up with Email address
                            </EvoTypography>
                            <Box>
                                <Grid
                                    display="flex"
                                    alignItems="center"
                                    mt={2}>
                                    <TextField
                                        id="evo-name"
                                        variant="outlined"
                                        inputRef={nameRef}
                                        label='name'
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            width: '100%',
                                            minWidth: '330px',
                                            '& input': {
                                                paddingInlineStart: '35px'
                                            }
                                        }} />
                                    <AccountCircleIcon sx={{ position: 'absolute', fontSize: '20px', pl: 1, color: '#7c7f89' }} />
                                </Grid>
                                <Grid
                                    display="flex"
                                    alignItems="center"
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
                                <Grid display="flex" alignItems="center" mt={2}>
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
                                <Grid display='flex' alignItems='center' mt={1}>
                                    <FormControlLabel control={<Checkbox inputRef={agreeCheckRef} sx={{ color: '#7c7f89 !important' }} defaultChecked />} sx={{ color: '#7c7f89', fontSize: '0.875rem' }} label="Agree with Terms & Condition" />                                    
                                </Grid>
                                <LoginButton type="submit" textcolor="#b1a8a8" bgcolor="#3a4052 !important" borderraidus="1px" width='100%' onClick={createNewAccount}>Sign up</LoginButton>
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
