import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, IconButton } from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import { configState } from "../../../../../reducers/configSlice";

const THEADS = ["ID", "Content Image", "TITLE", "DESCRIPTION", "ACTIONS"];

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

export default function ShowcaseTable(props: any) {
  const { tData } = props;
  const { s3Auth } = useSelector(configState);

  const editShowcase = (index: number) => {
    props.handleEditShowcase(tData[index]);
  };

  const deleteShowcase = (_id: string) => {
    props.handleDeleteShowcase(_id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {THEADS.map((item: any, index: number) => (
              <StyledTableCell
                key={index}
                width={index == 0 || index == 4 ? "3%" : "10%"}
              >
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tData?.map((item: any, index: number) => (
            <StyledTableRow key={index} sx={{ verticalAlign: "middle" }}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>
                <img
                  src={
                    process.env.REACT_APP_S3BASEURL +
                    item.path +
                    "?Authorization=" +
                    s3Auth.authorizationToken
                  }
                  width={"65px"}
                  height={"65px"}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    borderRadius: "3px",
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>{item.title}</StyledTableCell>
              <StyledTableCell>
                {item.description.substring(0, 50) + "..."}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton onClick={() => deleteShowcase(item._id)}>
                  <DeleteRoundedIcon
                    sx={{ width: "20px", height: "20px", color: "#d55f5f" }}
                  />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
