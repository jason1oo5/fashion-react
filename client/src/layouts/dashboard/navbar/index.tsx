import { styled } from '@mui/material';
import { Container, AppBar } from '@mui/material';
import NavMenu from './navMenu';

const RootStyle = styled(AppBar)(({ theme }) => ({
    transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
    }),
    width: '100%',            
    position: 'fixed',
    zIndex: 5,
    padding: theme.spacing(0, 0),    
    backgroundColor: '#27273c'
}))

export default function Navbar() {
    
    return (
        <RootStyle>
            <Container maxWidth={false}>
                <NavMenu />                
            </Container>
        </RootStyle>
    )
}