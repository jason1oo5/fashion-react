import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import { EvoTypography } from '../styled-components';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

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


export default function EvoTable({tableData, type}: any) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableData.row?.map((item: any, index: number) => (
                <StyledTableCell key={item+index} >{ t(item.toLowerCase()) }</StyledTableCell> 
            ))
            }            
          </TableRow>
        </TableHead>
        <TableBody>
          {type==='1'&&tableData.content?.map((item: any, index: number) => (            
            <StyledTableRow key={item.name + index} sx={{verticalAlign: 'baseline'}}>              
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">
                <EvoTypography sx={{ width: 'fit-content', borderRadius: '3px', p: 0.5, color: '#1BC5BD', fontSize: '13px' }}>
                    {item.role}
                </EvoTypography>                
              </StyledTableCell>
              <StyledTableCell align="left">
                <EvoTypography sx={{ backgroundColor: '#C9F7F5', width: 'fit-content', borderRadius: '3px', p: 0.5, color: '#1BC5BD', fontSize: '13px' }}>
                    {item.status}
                </EvoTypography>                                
              </StyledTableCell>
              <StyledTableCell align="left">{item.users}</StyledTableCell>
              <StyledTableCell align="left">
                {item.license.map((item: any, index: number) => (
                    <EvoTypography key={ item + index } sx={{ display: 'flex', fontSize: '12px', color: '#3699FF' }}>
                        <FiberManualRecordRoundedIcon sx={{ width: '5px', height: 'auto', mr:1.5 }} />
                        { item }
                    </EvoTypography>
                ))
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {type==='-1'&&tableData.content?.map((item: any, index: number) => (            
            <StyledTableRow key={item.name + index} sx={{verticalAlign: 'baseline'}}>              
              <StyledTableCell align="left">{item.date}</StyledTableCell>
              <StyledTableCell align="left">{item.name}</StyledTableCell>
              <StyledTableCell align="left">{item.account}</StyledTableCell>
            </StyledTableRow>
          ))}
          {type==='favorite'&&tableData.content?.map((item: any, index: number) => (            
            <StyledTableRow key={item.order + index} sx={{verticalAlign: 'baseline'}}>
              <StyledTableCell align="left">{item.title}</StyledTableCell>
              <StyledTableCell align="left">
                { item.comments[0] + ', ' + item.comments[1] }
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton sx={{ml: 5, color: '#eb6565'}}><DeleteRoundedIcon /></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
