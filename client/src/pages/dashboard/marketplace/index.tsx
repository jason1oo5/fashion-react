import { Grid } from "@mui/material";
import Page from "../../../components/Page";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import { Outlet } from "react-router-dom";

export default function MarketPlace() {
  const theme = useThemeStyle();

  return (
    <Page title="Market Place">
      <Grid
        sx={{
          height: "auto",
          pb: 5,
          backgroundColor: theme.palette.backgroundColor?.dark,
          mt: { sm: 8, xs: 7 },
        }}
      >
        <Grid
          sx={{
            marginInline: { xl: "auto", sm: "30px", xs: "30px" },
            maxWidth: "1500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid sx={{ width: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
