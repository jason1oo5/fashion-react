import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ButtonGroup, Grid } from '@mui/material';
import { EvoTypography, FormInput } from '../../../../../components/styled-components';
import MenuSelect from '../../../../../components/select/MenuSelect';

const Service = [
    'EvoFashion', 'EvoExpo', 'Evokit', 'CTD'
]

const Types = [
  'String', 'Integer', 'Float', 'Boolean'
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

const initDataSet = {
  name: '',
  service: 1,
  hidden_from_api: 1,
  dataStructure: [{
    field: '',
    type: 1
  }]
}

export default function DataSetDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [dataSet, setDataSet] = React.useState<any>(initDataSet);
  const [dataStructure, setDataStructure] = React.useState<any>([]);
  const nameRef = React.useRef<any>();
  
  React.useEffect(() => {    
    if(props.selectedDataSet) {      
      setDataSet(props.selectedDataSet);
      setDataStructure(dataSet.dataStructure);
      setDisabled(true);
    } else {      
      setDataSet(initDataSet);
      setDataStructure([]);
      setDisabled(false);
    }
    setOpen(props.openState);    
  }, [props.openState, open])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {    
    setOpen(false);
    props.handleHeadAction();
  };

  const handleMenuFunc = (id: any, value: any) => {
    
      switch (id) {
        case 'license_service':
          setDataSet({...dataSet, 
            service: value
          });
          break;
        case 'api':
          setDataSet({...dataSet, 
            hidden_from_api: value
          });
          break;             
    }
  }

  const handleStructureFunc = (menuIndex: number, typeValue: number) => {
    const c_dataStructure = [...dataStructure];
    c_dataStructure.splice(menuIndex, 1, {name: c_dataStructure[menuIndex].name, type: typeValue});
    setDataStructure(c_dataStructure);
  }

  const handleFieldChange = (name: string, index: number) => {
    const c_dataStructure = [...dataStructure];
    c_dataStructure.splice(index, 1, {name: name, type: c_dataStructure[index].type});
    setDataStructure(c_dataStructure);
  }

  const addStructure = () => {
    const c_dataStructure = [...dataStructure];
    const init_structure = {
      field: '',
      type: 1
    }    
    c_dataStructure.push(init_structure);
    setDataStructure(c_dataStructure);
  }

  const removeStructure = () => {
    const c_dataStructure = [...dataStructure];
    if(c_dataStructure.length > 1) {
      c_dataStructure.pop();
    }    
    setDataStructure(c_dataStructure);
  }

  const handleSubmitDataSet = () => {
    setDataSet({...dataSet, 
      name: nameRef.current.value,
      dataStructure: dataStructure
    });
    const newDataSet = {
      service: dataSet.service,
      name: nameRef.current.value,
      dataStructure: dataStructure,
      hidden_from_api: dataSet.hidden_from_api
    }    

    props.handleSubmitDataSet(newDataSet)
    handleClose();
  }

  return (
    <>      
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}   
        PaperProps={{ sx: { position: "fixed", top: 50, m: 0 } }}
      >
        <BootstrapDialogTitle 
        id="customized-dialog-title" 
        onClose={handleClose}        
        >
          <EvoTypography>New Data Set</EvoTypography>
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
                    default={dataSet?Service[dataSet.service]:Service[0]}
                    menuItems={Service}                     
                    type='profile'
                    width='full' />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Name</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <FormInput ref={nameRef} defaultValue={dataSet.name} disabled={disabled} />
                </Grid>
                <Grid mt={2} item xs={4}>
                    <EvoTypography>Hidden from API</EvoTypography>
                </Grid>
                <Grid mt={2} item xs={8}>
                    <MenuSelect
                    id='api'
                    handleMenuFunc={handleMenuFunc}
                    default={dataSet.hidden_from_api==1?'YES':'NO'}
                    menuItems={['YES', 'NO']} 
                    type='profile'
                    width='full' />
                </Grid>
                {dataStructure.map((structureItem: any, index: number) => (  
                    <Grid key={structureItem + index} container alignItems={'center'}>
                      <Grid mt={2} item xs={4}>
                          <EvoTypography>Field {index + 1}</EvoTypography>
                      </Grid>
                      <Grid mt={2} item xs={8} sx={{display: 'flex'}}>
                          <FormInput 
                          disabled={disabled}
                          defaultValue={structureItem.name}
                          onChange={(e) => handleFieldChange(e.target.value, index)} 
                          style={{marginRight: 25}}/>
                          <MenuSelect
                          id='field'
                          index={index}
                          height='100%'
                          handleStructureFunc={handleStructureFunc}
                          default={Types[0]}
                          menuItems={Types} 
                          type='profile'
                          width='full' />
                      </Grid>
                  </Grid>
                ))
                }                
                <Grid container mt={2} sx={{justifyContent: 'right'}}>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        >
                        <Button autoFocus 
                        disabled={disabled}
                        onClick={removeStructure}
                        sx={{ backgroundColor: '#F3F6F9' }}>
                            <EvoTypography textTransform='capitalize' color='#000'>Remove</EvoTypography>
                        </Button>
                        <Button autoFocus 
                        disabled={disabled}
                        onClick={addStructure}
                        sx={{ backgroundColor: '#3699ff !important' }}>
                            <EvoTypography textTransform='capitalize' color='white'>Add Field</EvoTypography>
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={handleClose} sx={{ backgroundColor: '#F3F6F9' }}>
            <EvoTypography textTransform='capitalize' color='#3699FF'>Close</EvoTypography>
          </Button>
          {!disabled&&
          <Button autoFocus onClick={handleSubmitDataSet} sx={{ backgroundColor: '#1BC5BD !important' }}>
            <EvoTypography textTransform='capitalize' color='white'>Save</EvoTypography>
          </Button>
          }
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
