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

export default function AddTutorialDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [editState, setEditState] = React.useState(false);
  const [tutorial, setTutorial] = React.useState<any>();
  const titleRef = React.useRef<any>();
  const descRef = React.useRef<any>();
  const linkRef = React.useRef<any>();

  React.useEffect(() => {
    if(props.selectedTutorial) {      
        setTutorial(props.selectedTutorial);
        setEditState(true);
    } else {
        setTutorial({
          title: '',
          description: '',
          link: ''
        })
        setEditState(false);
    }
    setOpen(props.openState)
  }, [props.openState])

  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const handleTutorial = () => {
    if(editState) {
      const edit_tutorial = {
        id: tutorial.id,
        title: titleRef.current.value,
        description: descRef.current.value,
        link: linkRef.current.value
      }
      props.handleUpdateTutorial(edit_tutorial);
    } else {
      const new_tutorial = {
        id: tutorial.id,
        title: titleRef.current.value,
        description: descRef.current.value,
        link: linkRef.current.value
      }
      props.handleAddTutorial(new_tutorial);
    }
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
                    <EvoTypography>Title</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput  
                     ref={titleRef}                   
                     defaultValue={tutorial?.title} />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Description</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput 
                    ref={descRef} 
                    defaultValue={tutorial?.description} />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Link</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput 
                    ref={linkRef} 
                    defaultValue={tutorial?.link} />
                </Grid>
            </Grid>
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          <Button autoFocus onClick={handleTutorial} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>{editState?'Update':'Save'}</EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
