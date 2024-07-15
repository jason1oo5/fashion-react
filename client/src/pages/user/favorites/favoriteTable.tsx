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

const Rows = [
    'ASSET', 'COMMENTS', 'ACTIONS'
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


export default function FavoriteTable(props: any) {
  const { t } = useTranslation();
  const { tableData } = props;

  const deleteFavorite = (_id: any) => {
    props.deleteFavorite(_id);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Rows?.map((item: any, index: number) => (
                <StyledTableCell key={item+index} >{ t(item.toLowerCase()) }</StyledTableCell> 
            ))
            }            
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((item: any, index: number) => (            
            <StyledTableRow key={index} sx={{verticalAlign: 'baseline'}}>
              <StyledTableCell align="left">{item.fashionProduct[0].title}</StyledTableCell>
              <StyledTableCell align="left">
                { 'Like ' + item.productLike.length + ', ' + 'Dislike ' + 0 }
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton 
                onClick={ () => deleteFavorite(item._id) }
                sx={{color: '#eb6565'}}><DeleteRoundedIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
