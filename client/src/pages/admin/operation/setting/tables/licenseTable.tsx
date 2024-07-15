import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { EvoTypography } from '../../../../../components/styled-components';
import { IconButton } from '@mui/material';

function createData(
  id: number,
  license_name: String,  
) {
  return { id, license_name };
}

const rows = [
  createData(1, 'Trial'),
];

const tHead = ['License ID', 'License name', 'Actions']

export default function LicenseTable(props: any) {

  const { tData } = props;

  const editLicense = (index: number) => {
    props.handleEditLicense(tData[index]);
  }

  const deleteLicense = (index: number) => {
    props.handleDeleteLicense(tData[index].id);
  }

  return (
    <TableContainer component={Paper}>
        <EvoTypography sx={{
            backgroundColor: '#e4e6ef',
            fontWeight: 600,
            fontSize: '15px',
            p: 1
        }}>
            EvoFashion
        </EvoTypography>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">        
        <TableHead>
          <TableRow>
            {tHead.map((item: any) => (
                <TableCell key={item} sx={{
                    fontWeight: 600,
                    fontSize: '13px'
                }}>{item}</TableCell>
            ))
            }            
          </TableRow>
        </TableHead>
        <TableBody>
          {tData.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell scope="row" component='th'>
                {row.id}
              </TableCell>
              <TableCell scope="row" component='th'>
                {row.name}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => editLicense(index)}>
                    <BorderColorRoundedIcon sx={{width: '18px', height: '18px', color: '#e3a357'}} />
                    </IconButton>
                    <IconButton  onClick={() => deleteLicense(index)}>
                    <DeleteRoundedIcon sx={{width: '18px', height: '18px', color: '#d55f5f'}} />
                </IconButton>   
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
