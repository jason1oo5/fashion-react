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
import { getSkuSales } from "../../../../../service/productService";

const Rows = [
  "SKU",
  "Title",
  "Date",
  "sales_price",
  "earned",
  "payment_status",
];

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

export default function SKUTable({ promotionState }: any) {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const [skuSales, setSkuSales] = React.useState<any>();

  React.useEffect(() => {
    const fetch_SkuSales = async () => {
      const res = await getSkuSales(promotionState, page);
      setSkuSales(res);
    };

    fetch_SkuSales().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
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
          {skuSales?.map((item: any, index: number) => (
            <StyledTableRow
              key={item.product_id + index}
              sx={{ verticalAlign: "baseline" }}
            >
              <StyledTableCell align="left">
                {item.fashionproduct[0]?.sku}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.fashionproduct[0]?.title}
              </StyledTableCell>
              <StyledTableCell align="left">{item.date}</StyledTableCell>
              <StyledTableCell align="left">
                {item.sales_price ?? "0"}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.quantity *
                  item.publisher_sale_share *
                  item.fashionproduct[0]?.price ?? 1}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.payment_status == 3 ? "success" : "failed"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
