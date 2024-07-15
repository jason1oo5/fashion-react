import { Box, Grid, Pagination } from "@mui/material";
import { PerPageList } from "../config/navConfig";
import MenuSelect from "./select/MenuSelect";
import { EvoTypography, FormInput } from "./styled-components";
import { useThemeStyle } from "../hooks/useThemeStyle";
import { useSelector } from "react-redux";
import { filterOptState } from "../reducers/filterSlice";
import { useRef } from "react";

const EvoPagination = (props: any) => {
  const { totalCount, page } = props;
  const selectPageRef = useRef<any>(null);

  const theme = useThemeStyle();
  const filterOpt = useSelector(filterOptState);

  const handlePageChange = (e: any, page: any) => {
    props.changePage(page);
  };

  const selectPage = (e: any) => {
    if (e.key == "Enter") {
      if (selectPageRef.current.value < 1) {
        handlePageChange(e, 1);
      } else {
        handlePageChange(e, selectPageRef.current.value);
      }
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <EvoTypography
        sx={{
          display: { md: "block", xs: "none" },
          color: theme.palette.fontColor?.light,
        }}
      >
        Showing 1 - 20 of 74 results
      </EvoTypography>
      <Pagination
        count={Math.ceil(Number(totalCount) / 20)}
        page={Number(page) ?? 1}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiPaginationItem-root": {
            color: theme.palette.fontColor?.light,
          },
        }}
      />
      <MenuSelect
        menuItems={PerPageList}
        default={filterOpt.perPage}
        type="perPage"
        height="33px"
        width="fit-content"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          ml: 3,
          color: theme.palette.fontColor?.light,
        }}
      >
        <EvoTypography>Go to:</EvoTypography>
        <FormInput
          onKeyDown={(e) => selectPage(e)}
          ref={selectPageRef}
          defaultValue={page}
          sx={{
            marginLeft: 1,
            width: "30px",
            height: "13px",
            backgroundColor: "transparent",
          }}
        />
      </Box>
    </Grid>
  );
};

export default EvoPagination;
