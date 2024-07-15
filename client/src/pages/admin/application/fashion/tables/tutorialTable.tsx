import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { EvoTypography } from '../../../../../components/styled-components';
import { Checkbox, IconButton } from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const THEADS = [
    'ID', 'TITLE', 'DESCRIPTION', 'LINK', 'ACTIONS'
]

const StyledTableCell = styled(TableCell)(() => ({
  padding: '8px',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EBEDF3',
    color: '#3F4254',
    fontFamily: 'Urbanist',
    fontWeight: 600,    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Urbanist'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function TutorialTable(props: any) {
    const { tData } = props;

    const editTutorial = (index: number) => {
      props.handleEditTutorial(tData[index])
    }

    const deleteTutorial = (index: number) => {
      props.handleDeleteTutorial(tData[index].id);
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
                <Checkbox    
                sx={{                    
                    '& svg': { color: '#3699FF' }
                }}            
                inputProps={{                
                'aria-label': 'select all desserts',
                }}
                />
            </StyledTableCell> 
            {THEADS.map((item: any, index: number) => (
                <StyledTableCell key={index} >{ item }</StyledTableCell> 
            ))
            }                        
          </TableRow>
        </TableHead>
        <TableBody>
          {tData?.map((item: any, index: number) => (            
            <StyledTableRow key={index} sx={{verticalAlign: 'middle'}}>
                <StyledTableCell>
                    <Checkbox                        
                    sx={{                        
                        '& svg': { color: '#3699FF' }
                    }}                   
                    />
                </StyledTableCell>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{item.title.substring(0, 30)+'...'}</StyledTableCell>
                <StyledTableCell>{item.description.substring(0, 50)+'...'}</StyledTableCell>              
                <StyledTableCell>{item.link.substring(0, 30)+'...'}</StyledTableCell>              
                <StyledTableCell>
                    <IconButton onClick={() => editTutorial(index)}>
                        <BorderColorRoundedIcon sx={{width: '20px', height: '20px', color: '#e3a357'}} />
                    </IconButton>
                    <IconButton onClick={() => deleteTutorial(index)}>
                        <DeleteRoundedIcon sx={{width: '20px', height: '20px', color: '#d55f5f'}} />
                    </IconButton>                  
                </StyledTableCell>              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
