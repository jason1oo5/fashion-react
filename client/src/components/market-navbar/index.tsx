import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavItems } from "../../config/navConfig";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { EvoTypography } from "../styled-components";
import { useSelector } from "react-redux";
import { filterOptState, setFilterOpt } from "../../reducers/filterSlice";
import { configState } from "../../reducers/configSlice";
import { useDispatch } from "react-redux";

export default function MarketplaceNavbar() {
  const theme = useThemeStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filterOpt = useSelector(filterOptState);
  const { productCategoryList } = useSelector(configState);

  const [anchorElBrowseMenu, setAnchorElBrowseMenu] =
    React.useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = React.useState("All");

  const handleNavMenu = (path: string) => {
    const opt = { ...filterOpt };
    const typeIndex = productCategoryList.indexOf(path);
    Object.assign(opt, { type: typeIndex + 1 });
    dispatch(setFilterOpt(opt));
  };

  const handleOpenBrowseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBrowseMenu(event.currentTarget);
  };

  const handleCloseBrowseMenu = () => {
    setAnchorElBrowseMenu(null);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderBottom: "1px solid #444141",
        mt: 3,
      }}
    >
      <Box>
        <EvoTypography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: theme.palette.fontColor?.light,
          }}
        >
          {t("marketplace")}
        </EvoTypography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
        }}
      >
        {NavItems.map((item) => (
          <Box key={item.id}>
            <Button
              key={item.id}
              onClick={() => handleNavMenu(item.btn)}
              sx={{
                my: 2,
                marginBlock: 0.6,
                color: theme.palette.fontColor?.light,
                display: "flex",
                alignItems: "center",
              }}
            >
              {t(item.btn.toLowerCase())}
            </Button>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}
