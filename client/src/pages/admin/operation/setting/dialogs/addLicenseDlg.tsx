import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import { EvoTypography, FormInput } from '../../../../../components/styled-components';
import MenuSelect from '../../../../../components/select/MenuSelect';

const Service = [
    'EvoFashion', 'EvoExpo', 'Evokit', 'CTD'
]

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

export default function AddLicenseDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [service, setService] = React.useState(0);
  const [editState, setEditState] = React.useState(false);
  const [id, setID] = React.useState(0);

  React.useEffect(() => {
    if(props.selectedLicense) {
      setName(props.selectedLicense.name);
      setService(props.selectedLicense.service);
      setID(props.selectedLicense.type);    
      setEditState(true);
    } else {
      setName('');
      setService(0);
      setID(0);
      setEditState(false);
    }
    setOpen(props.openState)
  }, [props.openState, props.selectedLicense])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const handleMenuFunc = (id: any, item: any) => {    
    setService(item);
  }

  const handleInputChange = (value: any, type: number) => {
    if(type==1) {
      setID(value);      
    } else {
      setName(value);
    }
  }

  const handleNewLicense = () => {    
    if(editState) {      
      const edit_license = {
        id: props.selectedLicense.id,
        name: name,
        service: service,
        type: id
      }
      props.handleUpdateLicense(edit_license);
    } else {
      const new_license = {      
        name: name,
        service: service,
        type: id
      }
      props.addNewLicense(new_license);
    }    
    handleClose();
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
          <EvoTypography>New license</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ maxWidth: 'none', overflow: 'auto'}}>          
            <Grid 
              container 
              sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              mt: 1,                  
            }}>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Service</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <MenuSelect
                    id='license_service'
                    handleMenuFunc={handleMenuFunc}
                    default={Service[service]}
                    menuItems={Service} 
                    type='profile'
                    width='full' />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>License ID</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput type='number' defaultValue={id} onChange={(e) => handleInputChange(e.target.value, 1)} />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>License name</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput defaultValue={name} onChange={(e) => handleInputChange(e.target.value, 2)} />
                </Grid>
            </Grid>
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          <Button autoFocus onClick={handleNewLicense} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>{editState?'Update':'Save'}</EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
