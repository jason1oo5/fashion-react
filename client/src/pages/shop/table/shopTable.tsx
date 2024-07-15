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
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EvoTypography } from '../../../components/styled-components';

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

const rows = ['purchased_sku', 'PRICE', 'QUANTITY', 'REMOVE'];

export default function ShopTable({tableData, multiplier}: any) {    
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rows.map((item: any, index: number) => (
                <StyledTableCell key={item+index} >{ t(item.toLowerCase()) }</StyledTableCell> 
            ))
            }            
          </TableRow>
        </TableHead>
        <TableBody>
            {tableData?.map((item: any, index: number) => (
                <StyledTableRow key={item.id + index} sx={{verticalAlign: 'center'}}>
                    <StyledTableCell align="left">
                        <EvoTypography>{item.product[0].title}</EvoTypography>
                        <EvoTypography>{item.product[0].sku}</EvoTypography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    $&nbsp;{item.product[0].price * multiplier}
                    </StyledTableCell>
                    <StyledTableCell align="left">1</StyledTableCell>              
                    <StyledTableCell align="left">
                    <IconButton sx={{color: '#eb6565'}}><DeleteRoundedIcon /></IconButton>
                    </StyledTableCell>
                </StyledTableRow>
            ))
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
