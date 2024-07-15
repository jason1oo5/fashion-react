import { useEffect, useState } from "react";
import { Grid, IconButton, styled } from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import CollapseList from "../../../components/CollapseList";
import { AdminPanelConfig } from "../../../config/navConfig";

const SidebarWrapper = styled(Grid)(({ theme, width, padding }: any) => ({
  width: width,
  maxHeight: "100%",
  top: 0,
  paddingInline: padding,
  zIndex: 5,
  opacity: 0.985,
  fontFamily: "Russo One",
  fontWeight: 250,
  boxShadow: "0 1px 9px -3px rgb(0 0 0 / 75%)",
  backgroundColor: "#1e1e2d",
  borderLeft: "1px solid",
  transition: "left .3s ease,right .3s ease,bottom .3s ease,top .3s ease",
  transform: "translate(0px, 0px)",
  paddingBlock: "0 !important",
  overflowY: "scroll",
  // position: 'fixed',
  "&::-webkit-scrollbar": { display: "none" },
}));

const AdminSidebar = () => {
  const [hoverState, setHoverState] = useState(false);
  const [openAdminSidebar, setOpenAdminSidebar] = useState(false);

  useEffect(() => {}, []);

  const handleAdminSidebar = () => {
    setOpenAdminSidebar(!openAdminSidebar);
  };

  return (
    <SidebarWrapper
      width={openAdminSidebar ? "265px" : "70px"}
      padding={openAdminSidebar ? "15px" : "7px"}
      sx={{
        minWidth: openAdminSidebar ? "265px" : "70px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px",
        }}
      >
        {openAdminSidebar && (
          <img
            src="/assets/images/page_img/Logo_E_48.png"
            alt="admin-logo"
            width="30px"
            height="auto"
          />
        )}
        <IconButton
          onClick={handleAdminSidebar}
          onMouseOver={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
          sx={{
            transition: "0.15s ease",
            color: "#3f4254",
            transform: openAdminSidebar ? "" : "rotate(180deg)",
            p: 0,
            marginInline: openAdminSidebar ? "inherit" : "auto",
          }}
        >
          <KeyboardDoubleArrowLeftRoundedIcon
            sx={{
              width: "30px",
              height: "30px",
              color: hoverState || !openAdminSidebar ? "#3699ff" : "#555587",
            }}
          />
        </IconButton>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 5,
        }}
      >
        {AdminPanelConfig.map((item, index) => (
          <CollapseList
            panelItem={item}
            key={index}
            openState={openAdminSidebar}
          />
        ))}
      </Grid>
    </SidebarWrapper>
  );
};

export default AdminSidebar;
