import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function MultiSelector(props: any) {    
  
  const handleFilterMenuChange = (value: any) => {
    if(props.type=='filter') props.handlePublisher(value);
    if(props.type=='label') props.handleLabel(value);
  }  

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>      
    {props.type==='solo'?
    <Autocomplete
    multiple
    id="tags-filled"
    options={props.fashionAssetSkus?props.fashionAssetSkus.map((option: any) => option): ['No options']}
    value={props.default?props.default:[]}
    onChange={(event, value) => props.handleSoloChange(value)}
    freeSolo    
    renderTags={(value: readonly string[], getTagProps) =>
    value.map((option: string, index: number) => (
        <Chip variant="filled" label={option} {...getTagProps({ index })} />
    ))    
    }
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
    :    
    <Autocomplete
    multiple
    id="tags-outlined"
    options={props.options??['No options']}
    getOptionLabel={(option) => option}
    value={props.default?props.default:[]}
    filterSelectedOptions    
    onChange={(event, value) => handleFilterMenuChange(value)}
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
    }              
    </Stack>
  );
}
