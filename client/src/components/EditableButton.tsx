import { Box } from "@mui/material";
import { EvoTypography } from "./styled-components";
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const EditableButton = (props: any) => {
    const { category, type, index } = props;    

    return (
        <Box 
        onClick={() => props.handleEdit(type, index)}
        sx={{
            display: 'flex',
            alignItems: 'end',
            backgroundColor: '#F3F6F9',
            borderRadius: '4px',
            width: 'fit-content',   
            p: 0.8,
            m: 0.5            
        }}>
            <EvoTypography sx={{p: 0.5}}>{type?category.name:category.title}</EvoTypography>
            <BorderColorRoundedIcon sx={{width: '16px', height: '16px', cursor: 'pointer', color: '#b5b5c3'}} />
        </Box>
    )
}

export default EditableButton;