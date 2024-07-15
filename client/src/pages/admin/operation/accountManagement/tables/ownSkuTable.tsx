import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Grid,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import EvoPagination from "../../../../../components/Pagination";

const Rows = ["date_of_purchase", "SKU", "Order_ID", "Price", "Payment"];

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

export default function OwnSKUTable({ skuData }: any) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Grid sx={{ float: "right" }}>
        <EvoPagination totalCount={10} page={1} />
      </Grid>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Rows?.map((item: any, index: number) => (
              <StyledTableCell key={item + index}>
                {t(item.toLowerCase())}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {skuData?.map((item: any, index: number) => (
            <StyledTableRow
              key={item.id + index}
              sx={{ verticalAlign: "baseline" }}
            >
              <StyledTableCell align="left">{item.date}</StyledTableCell>
              <StyledTableCell align="left">
                {item.product[0].sku}
              </StyledTableCell>
              <StyledTableCell align="left">{item.order_id}</StyledTableCell>
              <StyledTableCell align="left">
                {item.product[0].price}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.payment_status == 3 ? "Purchased" : "Promotion"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
