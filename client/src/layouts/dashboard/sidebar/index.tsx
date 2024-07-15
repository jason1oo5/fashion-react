import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleSidebar, sidebarState } from "../../../reducers/sidebarSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import { Grid, IconButton } from "@mui/material";
import {
  EvoButton,
  EvoTypography,
  MaterialUISwitch,
  SidebarWrapper,
} from "../../../components/styled-components";
import CloseIcon from "@mui/icons-material/Close";
import MenuSelect from "../../../components/select/MenuSelect";
import { SortTypes } from "../../../config/navConfig";
import { PriceItems } from "../../../config/mock";
import { setTheme } from "../../../reducers/themeSlice";
import { getAllCategories } from "../../../service/productService";
import { filterOptState, setFilterOpt } from "../../../reducers/filterSlice";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const sidebar_pos = useSelector(sidebarState);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [categoryList, setCategoryList] = useState<any>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const categories: any = await getAllCategories();
      const category_array: any = [];
      categories.map((item: any) => {
        category_array.push(item.title);
      });
      setCategoryList(category_array);
    };

    fetchCategory().catch((error) => {
      console.log("category", error);
    });
  }, []);

  const handleSidebarClose = () => {
    dispatch(handleSidebar("-375px"));
  };

  const handleTheme = (event: any) => {
    if (event.target.checked) {
      dispatch(setTheme("darkTheme"));
    } else {
      dispatch(setTheme("lightTheme"));
    }
  };

  const clearAllFilters = () => {
    const opt = {
      userProduct: false,
      page: 1,
      perPage: 20,
      type: "",
      filterBy: "",
      sortBy: "price",
      minPrice: "",
      maxPrice: "",
      search: "",
    };

    dispatch(setFilterOpt(opt));
  };

  return (
    <OutsideClickHandler onOutsideClick={handleSidebarClose}>
      <SidebarWrapper right={sidebar_pos}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EvoTypography
            sx={{
              color: "white",
              fontSize: "20px",
            }}
          >
            {t("filter")}
          </EvoTypography>
          <IconButton onClick={handleSidebarClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid
          sx={{
            mt: 3,
          }}
        >
          <EvoTypography
            sx={{
              color: "white",
              mb: 1,
            }}
          >
            {t("select_type")}:
          </EvoTypography>
          <MenuSelect
            menuItems={categoryList}
            type={"category"}
            default="All"
          />
          <EvoTypography
            sx={{
              color: "white",
              mb: 1,
              mt: 2,
            }}
          >
            {t("select_price")}:
          </EvoTypography>
          <MenuSelect menuItems={PriceItems} type={"price"} default="All" />
        </Grid>

        <Grid sx={{ mt: 2 }}>
          <EvoTypography
            sx={{
              color: "white",
              fontSize: "14px",
              mb: 1,
            }}
          >
            {t("sort_by")}
          </EvoTypography>
          <MenuSelect menuItems={SortTypes} type={"sort"} default="price" />
        </Grid>
        <Grid sx={{ mt: 2 }}>
          <EvoButton
            onClick={clearAllFilters}
            sx={{
              mt: 2,
            }}
          >
            <EvoTypography>{t("clear_filters")}</EvoTypography>
          </EvoButton>
        </Grid>
        <Grid mt={2}>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                onChange={(e: any) => handleTheme(e)}
              />
            }
            label={t("change_theme")}
            sx={{
              color: "white",
              fontFamily: "Urbanist",
            }}
          />
        </Grid>
      </SidebarWrapper>
    </OutsideClickHandler>
  );
};

export default Sidebar;
