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
import { Permissions } from '../../../../../service/admin/roleService';
import { toast } from 'react-toastify';

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

export default function AddRoleDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [roleName, setRoleName] = React.useState('');
  const [permissions, setPermissions] = React.useState<any>();

  React.useEffect(() => {
    setOpen(props.openState)
  }, [props.openState])
  
  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const handleMultiMenu = (value: any) => {
    setPermissions(value)
  }

  const addNewRole = () => {    
    if(roleName&&permissions) {
      props.addNewRole({
        name: roleName,
        permissions: permissions
      })
    } else {
      toast.error("Incorrect input");
    } 
  }

  const handleNameChange = (value: any) => {
    setRoleName(value)
  }

  return (
    <>      
      <BootstrapDialog        
        aria-labelledby="customized-dialog-title"
        open={open}   
        PaperProps={{ sx: { position: "fixed", top: 50, m: 0 } }}
      >
        <BootstrapDialogTitle 
        id="customized-dialog-title" 
        onClose={handleClose}
        >
          <EvoTypography>Add New Role</EvoTypography>
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
                <Grid item xs={4}>
                    <EvoTypography>Role Name</EvoTypography>
                </Grid>
                <Grid item xs={8}>
                    <FormInput onChange={(e) => handleNameChange(e.target.value)} />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Assign Permissions</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                <Stack spacing={3} sx={{ width: '100%' }}>                      
                <Autocomplete
                multiple
                id="tags-outlined"
                options={Permissions??['No options']}
                getOptionLabel={(option) => option}
                defaultValue={[Permissions[0]]}
                filterSelectedOptions    
                onChange={(event, value) => handleMultiMenu(value)}
                renderInput={(params) => (
                <TextField
                    {...params}          
                    sx={{
                        '& div': {
                            padding: '3px !important',
                            borderRadius: '3px'
                        }
                    }}
                />
                )}
                />
                </Stack>
                </Grid>
            </Grid>
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          <Button autoFocus onClick={addNewRole} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>Save</EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
