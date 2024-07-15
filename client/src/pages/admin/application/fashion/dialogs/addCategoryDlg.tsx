import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import { EvoTypography, FormInput } from '../../../../../components/styled-components';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}      
    </DialogTitle>
  );
};

export default function AddCategoryDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [editState, setEditState] = React.useState(false);
  const [platform, setPlatform] = React.useState<any>();
  const [category, setCategory] = React.useState<any>();
  const categoryRef = React.useRef<any>();
  const platformRef = React.useRef<any>();  

  React.useEffect(() => {
    setPlatform(props.platform);
    setCategory(props.category)
    setOpen(props.openState)
  }, [props.openState])

  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const addCategory = () => {
    props.handleAddCategory(categoryRef.current.value);
  }

  return (
    <>      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}   
        PaperProps={{ sx: { position: "fixed", top: 50, m: 0 } }}
      >
        <BootstrapDialogTitle 
        id="customized-dialog-title" 
        onClose={handleClose}        
        >
          <EvoTypography>New Category</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ maxWidth: 'none', overflow: 'auto'}}>          
            <Grid 
              container 
              sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'flex-start',
              mt: 1,                   
              mb: 3             
            }}>
                {props.dialogType?
                <>
                <Grid mt={2} item xs={4}>
                    <EvoTypography sx={{ fontWeight: 600 }}>Platform ID</EvoTypography>                    
                </Grid>
                <Grid mt={2} pl={2} item xs={8}>
                    <FormInput disabled defaultValue={platform?.id}/>
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography sx={{ fontWeight: 600 }}>Platform</EvoTypography>                    
                </Grid>
                <Grid mt={2} pl={2} item xs={8}>
                    <FormInput ref={platformRef} defaultValue={platform?.name} />
                </Grid>
                </>
                :
                <>
                <Grid mt={2} item xs={4}>
                    <EvoTypography sx={{ fontWeight: 600 }}>Category title</EvoTypography>
                    <EvoTypography fontSize="6px">separate with comma to add multiple categories at once:</EvoTypography>
                </Grid>
                <Grid mt={2} pl={2} item xs={8}>
                    <FormInput ref={categoryRef} defaultValue={category?.title} />
                </Grid>
                </>                    
                }                
            </Grid>
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          <Button autoFocus onClick={addCategory} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>{editState?'Update':'Save'}</EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
