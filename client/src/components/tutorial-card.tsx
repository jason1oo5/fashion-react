import ReactPlayer from 'react-player/youtube';
import { Box } from "@mui/material";
import { EvoTypography } from "./styled-components";
import { useThemeStyle } from '../hooks/useThemeStyle';

export default function TutorialCard({tutorial}: any) {
    const theme = useThemeStyle();

    return (
        <Box 
            sx={{
                minHeight: '523px',
                height: 'auto',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 0.1rem 1rem 0.25rem rgb(0 0 0 / 5%)',               
            }}>
                <Box sx={{ height: "300px", overflow: 'hidden', backgroundImage: `url("${tutorial.link}")`, backgroundSize: 'cover' }}>                    
                    <ReactPlayer url={tutorial.link} style={{width: 'auto'}} />
                </Box>
                <Box sx={{ backgroundColor: theme.palette.success.light, minHeight: '200px', p: 2 }}>
                    <EvoTypography fontSize="25px" color="white" fontWeight="600">{ tutorial.title }</EvoTypography>
                    <EvoTypography fontSize="14px" color="white" sx={{ mt: 1 }}>
                        { tutorial.description }
                    </EvoTypography>
                </Box>
        </Box>
        )
}
