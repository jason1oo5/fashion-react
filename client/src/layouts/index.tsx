import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./dashboard/navbar";
import Footer from "./dashboard/footer";
import Sidebar from "./dashboard/sidebar";
import { useDispatch } from "react-redux";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import { Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { handleSidebar, sidebarState } from "../reducers/sidebarSlice";
import { useThemeStyle } from "../hooks/useThemeStyle";
import { getConfigs, getTags } from "../service/productService";
import { getAppUsers } from "../service/userService";
import AdminSidebar from "./admin/sidebar";
import UserContext from "../contexts/userContext";
import { getCurrentLocales, getLocalesData } from "../service/localeService";
import { setLocales } from "../reducers/localeSlice";
import {
  setAppUserList,
  setFashionTagList,
  setPlatformList,
  setProductCategoryList,
} from "../reducers/configSlice";

export default function MainLayout() {
  const theme = useThemeStyle();
  const contextUser = useContext(UserContext);
  const location = useLocation();
  const sidebar_pos = useSelector(sidebarState);
  const dispatch = useDispatch();
  const accountState = useSelector((state: any) => state.account.accountState);
  const [settingPos, setSettingPos] = useState(0);

  useEffect(() => {
    const func = async () => {
      const { productCategory, platform } = await getConfigs();
      const { appUsers } = await getAppUsers();
      dispatch(setProductCategoryList(productCategory));
      dispatch(setPlatformList(platform));
      dispatch(setAppUserList(appUsers));
      const { fashionTags } = await getTags();
      dispatch(setFashionTagList(fashionTags));
      const locale = await getCurrentLocales();
      // const localesData = await getLocalesData();
      dispatch(setLocales(locale));
      // dispatch(setLocalesData(localesData));
    };

    func();
    setSettingPos(window.innerHeight / 2);
  }, [dispatch]);

  const handleFilter = () => {
    if (sidebar_pos == "-375px") {
      dispatch(handleSidebar("0px"));
    } else {
      dispatch(handleSidebar("-375px"));
    }
  };

  return (
    <>
      <Navbar />
      <Grid sx={{ display: "flex", minHeight: "100vh" }}>
        {contextUser?.user.role == 1 &&
          (location.pathname.includes("myAccount") ||
            location.pathname.includes("admin")) &&
          accountState.account_type == 1 && <AdminSidebar />}
        <Outlet />
      </Grid>
      {contextUser?.user.role == 1 &&
      (location.pathname.includes("myAccount") ||
        location.pathname.includes("admin")) ? (
        <></>
      ) : (
        <Footer />
      )}
      <Sidebar />
      <IconButton
        aria-label="site-setting"
        title="site-settingbtn"
        aria-labelledby="site-setting"
        onClick={handleFilter}
        sx={{
          position: "fixed",
          top: settingPos + "px",
          right: "30px",
          backgroundColor: "#1e1e2d !important",
          color: "#0178f6",
          boxShadow:
            "0 4px 8px 0 rgb(0 0 0 / 15%), 0 6px 20px 0 rgb(0 0 0 / 25%)",
          zIndex: 2,
        }}
      >
        <SettingsSuggestSharpIcon style={{ width: "30px", height: "30px" }} />
      </IconButton>
    </>
  );
}
