import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import ImageLoad from "../ImageLoad";
import { EvoTypography } from "../styled-components";

interface ShowCaseModelProps {
    model: any,
    price: string,
    type: string,
    title: string
}

export default function ShowCaseModelCard({ model, price, type, title }: ShowCaseModelProps) {
    const theme = useThemeStyle();

    return (
        <Grid
        sx={{            
            backgroundSize: 'cover',
            height: 'auto',
            width: '100%',
            // minHeight: '300px',
            backgroundRepeat: 'no-repeat',            
            display: 'flex',          
            alignItems: 'flex-end',             
            position: 'relative',
            boxShadow: '0 4px 8px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 15%)',
            transition: 'box-shadow 0.2s',
            borderRadius: 1,
            overflow: 'hidden'      
        }}>
            <ImageLoad src="https://cdn1.epicgames.com/ue/product/Featured/ReplicatedHitboxSystem_featured-894x488-e3d8188f90e521e6a9adc344ca233952.png" width="100%" />
            <Box sx={{ position: 'absolute', width: '100%' }}>
                <Box 
                sx={{
                    position: 'relative',
                    display:'flex',
                    justifyContent: 'space-between',     
                    alignItems:'end',
                    width: '100%'                       
                }}>
                    <Box>
                        <EvoTypography 
                        sx={{
                            backgroundColor: theme.palette.warning.main,
                            paddingInline: 2,
                            color: 'black',
                            fontWeight: 500,
                            width: 'fit-content'
                        }}
                        >Showcase</EvoTypography>
                        <EvoTypography 
                        sx={{             
                            backgroundColor: '#212121',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '400',
                            paddingInline: '10px',
                            mt: 1
                        }}
                        >Female Mannequin</EvoTypography>
                    </Box>            
                    <Box>
                        <EvoTypography 
                        sx={{
                            backgroundColor: theme.palette.warning.main,
                            color: '#212121',
                            fontSize: '18px',
                            fontWeight: '600',
                            paddingInline: '10px',     
                            textDecoration: 'line-through',
                            textDecorationThickness: '2px',                        
                            textAlign: 'center'
                        }}>
                            $1000
                        </EvoTypography>
                        <EvoTypography 
                        sx={{
                            backgroundColor: theme.palette.warning.main,
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '400',
                            paddingInline: '10px',
                            mt: 1,
                            textAlign: 'center'
                        }}>
                            $800
                        </EvoTypography>
                    </Box>
                </Box>     
            </Box>                  
        </Grid>        
    )
}