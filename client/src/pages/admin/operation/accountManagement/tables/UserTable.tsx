import * as React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { visuallyHidden } from "@mui/utils";
import {
  EvoTypography,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../../../components/styled-components";
import { Grid } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useNavigate } from "react-router";

interface Data {
  name: string;
  email: string;
  register_time: string;
  referrals: string;
  status: string;
  user_roles: string;
  service: any;
}

function createData(
  name: string,
  email: string,
  register_time: string,
  referrals: string,
  status: string,
  user_roles: string,
  service: any
): Data {
  return {
    name,
    email,
    register_time,
    referrals,
    status,
    user_roles,
    service,
  };
}

const rows = [
  createData(
    "Berkant Lpek",
    "berkant@berkant.dev",
    "2022-10-02 16:20:43",
    "0/0",
    "Active",
    "owner",
    ["EvoFAshion", "Exo"]
  ),
];

const service = [
  " EvoFashion : Trial",
  "CTD : Trial",
  "EvoKit : Trial",
  "EvoExpo : Trial",
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: string | any },
  b: { [key in Key]: string | any }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "NAME",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "EMAIL",
  },
  {
    id: "register_time",
    numeric: false,
    disablePadding: false,
    label: "REGISTER TIME",
  },
  {
    id: "referrals",
    numeric: false,
    disablePadding: false,
    label: "REFERRALS",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "user_roles",
    numeric: false,
    disablePadding: false,
    label: "USER ROLES",
  },
  {
    id: "service",
    numeric: false,
    disablePadding: false,
    label: "SERVICE",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>ACTIONS</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function UserTable(props: any) {
  const { users } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userList, setUserList] = React.useState<any>();
  const navigate = useNavigate();

  React.useEffect(() => {
    setUserList(users);
  }, [props]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = userList.map((n: any) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const searchUser = (event: any) => {
    if (event.key == "Enter") {
      const userData = [...users];
      const d_userList = userData.filter((user: any) =>
        user.name.includes(event.target.value)
      );
      setUserList(d_userList);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "2em",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={(e: any) => searchUser(e)}
              placeholder={"search"}
              inputProps={{ "aria-label": "search" }}
              sx={{
                borderRadius: "5px",
                border: "1px solid",
              }}
            />
          </Search>
          <CSVLink
            data={users ?? []}
            style={{
              textDecoration: "none",
            }}
          >
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3699FF !important",
                color: "white",
                paddingBlock: 1,
                paddingInline: 1,
                borderRadius: 1,
              }}
            >
              <GetAppIcon />
              <EvoTypography sx={{ fontSize: "14px", ml: 1 }}>
                Export User
              </EvoTypography>
            </IconButton>
          </CSVLink>
        </Grid>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={userList ? userList.length : 0}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(userList, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((user: any, index) => {
                  const isItemSelected = isSelected(user.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, user.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.email}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.created_at}</TableCell>
                      <TableCell>
                        {user.referral_program_id ?? "No referrals"}
                      </TableCell>
                      <TableCell align="center">
                        <EvoTypography
                          sx={{
                            backgroundColor: user.email_verified_at
                              ? "#C9F7F5"
                              : "#ffe2e5",
                            width: "fit-content",
                            borderRadius: "3px",
                            p: 0.5,
                            color: user.email_verified_at
                              ? "#1BC5BD"
                              : "#f64e60",
                            fontSize: "13px",
                          }}
                        >
                          {user.email_verified_at ? "Active" : "Unverified"}
                        </EvoTypography>
                      </TableCell>
                      <TableCell>{user.account_type}</TableCell>
                      <TableCell>
                        {service.map((item: any, index: number) => (
                          <EvoTypography
                            key={item + index}
                            sx={{
                              display: "flex",
                              fontSize: "10px",
                              color: "#3699FF",
                            }}
                          >
                            <FiberManualRecordRoundedIcon
                              sx={{ width: "5px", height: "auto", mr: 1.5 }}
                            />
                            {item}
                          </EvoTypography>
                        ))}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            navigate(
                              "/admin/application/editAccountDetail/user/" +
                                user.id
                            )
                          }
                        >
                          <BorderColorRoundedIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "#e3a357",
                            }}
                          />
                        </IconButton>
                        <IconButton onClick={() => props.deleteUser(user.id)}>
                          <DeleteRoundedIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                              color: "#d55f5f",
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList ? userList.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
