import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const Rows = [
    'order_id', 'date', 'order_title', 'state', 'paid_with', 'payment_id'
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


export default function OrderTable({tableData}: any) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380, overflowX: 'scroll' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Rows?.map((item: any, index: number) => (
                <StyledTableCell key={index} >{ t(item.toLowerCase()) }</StyledTableCell> 
            ))
            }            
          </TableRow>
        </TableHead>
        <TableBody>          
          {tableData?.map((item: any, index: number) => (            
            <StyledTableRow key={index} sx={{verticalAlign: 'baseline'}}>
              <StyledTableCell align="left">{item.id}</StyledTableCell>
              <StyledTableCell align="left">{item.created_at.substring(0, 16)}</StyledTableCell>
              <StyledTableCell align="left">{item.title.substring(0, 10)}</StyledTableCell>
              <StyledTableCell align="left">{item.state}</StyledTableCell>              
              <StyledTableCell align="left">{item.payment_method}</StyledTableCell>
              <StyledTableCell align="left">{item.provider_tx}</StyledTableCell>              
            </StyledTableRow>
          ))}
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}