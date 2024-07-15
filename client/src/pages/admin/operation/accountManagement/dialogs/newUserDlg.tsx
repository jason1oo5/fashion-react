import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { EvoTypography, FormInput } from '../../../../../components/styled-components';
import MenuSelect from '../../../../../components/select/MenuSelect';
import { Locale, ProfileList } from '../../../../../config/navConfig';

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

export default function NewUserDialog(props: any) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.openState)
  }, [props.openState])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const handleMultiMenu = (value: any) => {

  }

  const handleProfile = (idx: any, value: any) => {

  }

  const handleInputChange = (e:any, key: any) => {

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
          <EvoTypography>Add New User</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: '375px'}}>    
            {ProfileList.map((item: any, index:any) => (
                <Grid key={item.title + index} container sx={{                    
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                }}>
                    <Grid item xs={4} sx={{textAlign: 'right', pr: 3}} >
                        <EvoTypography sx={{
                            textTransform: 'capitalize'
                        }}>
                            { item.title }
                        </EvoTypography>                                
                    </Grid>
                    <Grid item xs={8} >
                        {item.title==='Locale'||item.title=='Roles'?
                        <MenuSelect 
                            id={item.title}
                            handleProfile={handleProfile}
                            default={item.title=='Locale'?Locale[0]:item.content[0]}
                            menuItems={item.title=='Locale'?Locale:item.content} 
                            type='profile'
                            width='full' />
                        :                                
                        <FormInput type={item.title=='Password'?'password':'text'}  />
                        }
                    </Grid>
                </Grid>                    
            ))

            }                
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>Save</EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
