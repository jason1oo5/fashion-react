import { Box, Grid, IconButton } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { EvoTypography, FooterContent, FooterTitle } from "../../../components/styled-components";

export default function Footer() {    
    return (
        <Grid sx={{ 
            backgroundColor: '#2d3140', 
            minHeight: '300px', 
            paddingInline: {bsx: '5em', xs: '2em'}, 
            pt: 4 ,
            }}>            
            <Grid display="flex" justifyContent="space-between" alignItems="baseline" >
                <Box display="flex" sx={{ '& svg': { fontSize: '40px' }, '& button': { p:0, mr:2 } }}>
                    <IconButton sx={{ color: 'white' }}><TwitterIcon /></IconButton>
                    <IconButton sx={{ color: 'white' }}><FacebookIcon /></IconButton>
                    <IconButton sx={{ color: 'white' }}><InstagramIcon /></IconButton>
                    <IconButton sx={{ color: 'white' }}><YouTubeIcon /></IconButton>
                </Box>
                <IconButton
                    href='/'
                    sx={{
                        display: {xs: 'none', md: 'flex'},
                        mr: 1
                    }}>
                    <img src='/assets/images/navbar/eflogo.png' />
                </IconButton>
            </Grid>            
            <Grid sx={{ mt:2., borderBottom: '1px solid #3f4044', pb: 2, display: 'grid', gridTemplateColumns: {bsx: 'repeat(auto-fill, minmax(320px, 1fr))', xs: 'repeat(auto-fill, minmax(230px, 1fr))'}, gridGap: '50px' }}>
                <Grid sx={{ maxWidth: '100%', width: '100%', flex: '0 0 100%' }}>
                    <FooterTitle>Sevices</FooterTitle>
                    <Box mt={2}>
                        <FooterContent>Evovor Online Sevices</FooterContent>
                        <FooterContent>Unreal Game Sevices</FooterContent>
                        <FooterContent>NFT Marketplace</FooterContent>
                        <FooterContent>Other Sevices</FooterContent>
                    </Box>
                </Grid>
                <Grid sx={{ maxWidth: '100%', width: '100%', flex: '0 0 100%' }}>
                    <FooterTitle>Supports</FooterTitle>
                    <Box mt={2}>
                        <FooterContent>Documentation</FooterContent>
                        <FooterContent>FAQs</FooterContent>
                        <FooterContent>Roadmap</FooterContent>
                        <FooterContent>Ask a question</FooterContent>                        
                    </Box>
                </Grid>
                <Grid sx={{ maxWidth: '100%', width: '100%', flex: '0 0 100%' }}>
                    <FooterTitle>Company</FooterTitle>
                    <Box mt={2}>
                        <FooterContent>Company Site</FooterContent>
                        <FooterContent>Awards</FooterContent>
                        <FooterContent>Teams</FooterContent>
                        <FooterContent>Careers</FooterContent>
                    </Box>
                </Grid>
                <Grid sx={{ maxWidth: '100%', width: '100%', flex: '0 0 100%' }}>
                    <FooterTitle>Developers</FooterTitle>
                    <Box mt={2}>
                        <FooterContent>Unreal Developer Network</FooterContent>
                        <FooterContent>NFT Developer Network</FooterContent>
                        <FooterContent>Web Developer Network</FooterContent>
                    </Box>
                </Grid>
            </Grid>
            <Grid pt={0.8}>
                {/* <EvoTypography sx={{ fontSize: '16px', color: '#868687', fontStyle: 'italic' }}>sslight@evovor.com</EvoTypography> */}
                <EvoTypography sx={{ fontSize: '16px', color: '#fff', fontStyle: 'italic' }}>sslight@evovor.com</EvoTypography>
            </Grid>
        </Grid>
    )
}