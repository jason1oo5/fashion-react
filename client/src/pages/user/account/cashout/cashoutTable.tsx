import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";

const Rows = ["date", "amount", "status", "message"];

const StyledTableCell = styled(TableCell)(() => ({
  padding: "8px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EBEDF3",
    color: "#3F4254",
    fontFamily: "Urbanist",
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Urbanist",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CashoutTable({
  cashoutHistory,
}: {
  cashoutHistory: any;
}) {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Rows.map((item: any, index: number) => (
              <StyledTableCell key={item + index}>
                {t(item.toLowerCase())}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cashoutHistory?.map((item: any, index: number) => {
            <StyledTableRow key={index}>
              <StyledTableCell>{item.created_at}</StyledTableCell>
              <StyledTableCell>{item.amount}</StyledTableCell>
              <StyledTableCell>{item.status}</StyledTableCell>
              <StyledTableCell>{item.message}</StyledTableCell>
            </StyledTableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
