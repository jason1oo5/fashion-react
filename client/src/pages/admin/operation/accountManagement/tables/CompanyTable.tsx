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
import { useNavigate } from 'react-router';

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

const service = [' EvoFashion : Trial', 'CTD : Trial', 'EvoKit : Trial', 'EvoExpo : Trial'];

const THEAD = [
    'ID', 'Name', 'STATUS', 'MULTIPLIER', '# USERS', 'SERVICE', 'ACTIONS'
]

export default function CompanyTable(props: any) {    
  const {tableData} = props;
  const navigate = useNavigate();

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
            {THEAD.map((item: any, index: number) => (
                <StyledTableCell key={item+index} >{ item }</StyledTableCell> 
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((item: any, index: number) => (            
            <StyledTableRow key={item.name + index} sx={{verticalAlign: 'middle'}}>
                <StyledTableCell align="left">
                    <Checkbox                        
                    sx={{                        
                        '& svg': { color: '#3699FF' }
                    }}                   
                    />
                </StyledTableCell>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">
                <EvoTypography sx={{ backgroundColor: '#C9F7F5', width: 'fit-content', borderRadius: '3px', p: 0.5, color: '#1BC5BD', fontSize: '13px' }}>
                    {item.status?'Active': 'Unactive'}
                </EvoTypography>                                
              </StyledTableCell>
              <StyledTableCell align="left">
                <EvoTypography sx={{ width: 'fit-content', borderRadius: '3px', p: 0.5, color: '#1BC5BD', fontSize: '13px' }}>
                    {item.multiplier}
                </EvoTypography>
              </StyledTableCell>              
              <StyledTableCell align="left">{item.users?item.users.length: 1}</StyledTableCell>
              <StyledTableCell align="left">
                {service.map((serviceItem: any, index: number) => (
                    <EvoTypography key={ serviceItem + index } sx={{ display: 'flex', fontSize: '12px', color: '#3699FF' }}>
                        <FiberManualRecordRoundedIcon sx={{ width: '5px', height: 'auto', mr:1.5 }} />
                        { serviceItem }
                    </EvoTypography>
                ))
                }
              </StyledTableCell>
              <StyledTableCell align="left">
                  <IconButton>
                    <BorderColorRoundedIcon 
                    onClick={() => navigate('/admin/application/editAccountDetail/company/'+item.id)}
                    sx={{
                      width: '20px', 
                      height: '20px', 
                      color: '#e3a357'
                      }} />
                  </IconButton>
                  <IconButton onClick={() => props.deleteCompany(item.id)}>
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
