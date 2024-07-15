import { Avatar, Box, Divider, Grid, IconButton } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { useThemeStyle } from "../hooks/useThemeStyle";
import { logout } from "../service/authService";
import { EvoTypography } from "./styled-components";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import FolderSpecialRoundedIcon from "@mui/icons-material/FolderSpecialRounded";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { UserMenuItems } from "../config/navConfig";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { configState } from "../reducers/configSlice";

const Switch = (props: any) => {
  const { index, children } = props;
  return children.find((child: any) => child.props.value === index);
};

const IconWrapper = (props: any) => {
  return props.children;
};

const UserMenu = ({ user }: any) => {
  const currentUser = user;
  const theme = useThemeStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { s3Auth } = useSelector(configState);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleOpenUserMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseUserMenu = () => {
    setOpenMenu(false);
  };

  const logoutEvovor = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          alt="Avatar"
          src={`${
            process.env.REACT_APP_S3BASEURL +
            currentUser.avatar +
            "?Authorization=" +
            s3Auth.authorizationToken
          }`}
        />
      </IconButton>
      <OutsideClickHandler onOutsideClick={handleCloseUserMenu}>
        <Grid
          sx={{
            width: "375px",
            height: "auto",
            position: "absolute",
            backgroundColor: theme.palette.backgroundColor?.dark,
            borderRadius: 1,
            overflow: "hidden",
            right: "-25px",
            top: "52px",
            mt: "10px",
            // display: openMenu?'block':'none',
            transform: openMenu ? "scale(1, 1)" : "scale(0, 0)",
            boxShadow: "0px 0px 30px 0px rgb(82 63 105 / 30%)",
            transitionDuration: "0.01s",
          }}
        >
          <img
            src="/assets/images/navbar/user_menu_bg.jpg"
            width="100%"
            height="100px"
          />
          <Grid
            sx={{
              position: "absolute",
              top: 0,
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                alt="avatar"
                src={`${
                  process.env.REACT_APP_S3BASEURL +
                  currentUser.avatar +
                  "?Authorization=" +
                  s3Auth.authorizationToken
                }`}
                style={{
                  borderRadius: "5px",
                  width: "50px",
                  height: "auto",
                  border: "3px solid #19cf79",
                }}
              />
              <Box
                ml={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <EvoTypography
                  sx={{
                    color: "white",
                    mb: 0.5,
                  }}
                >
                  {accountState.account_type == 1
                    ? currentUser.name
                    : userCompaniesState[accountState.companyIdx]?.company[0]
                        .name}
                </EvoTypography>
                <Box display={"flex"} alignItems="center">
                  <img
                    src="/assets/images/navbar/EvoCredit.png"
                    style={{ width: "25px", height: "auto" }}
                  />
                  <EvoTypography
                    sx={{
                      color: "white",
                      ml: 1,
                      fontSize: "18px",
                    }}
                  >
                    1000
                  </EvoTypography>
                </Box>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                alignItems: "end",
              }}
            >
              <EvoTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f64e60",
                  fontSize: "14px",
                  paddingBlock: 0.5,
                  paddingInline: 1,
                  borderRadius: 1,
                }}
              >
                {t("top_up")}
              </EvoTypography>
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "10px 20px 10px 25px",
            }}
          >
            {UserMenuItems.map((menuItem, index) => (
              <Grid key={menuItem.title + index}>
                {accountState.account_type == 2 && index == 1 ? (
                  <></>
                ) : (
                  <Link
                    to={menuItem.link}
                    onClick={() => setOpenMenu(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        paddingBlock: 0.5,
                        alignItems: "center",
                        "& svg": {
                          color: "#f5c413",
                          width: "28px",
                          height: "auto",
                        },
                      }}
                    >
                      <Switch index={index}>
                        <IconWrapper value={0}>
                          <BadgeRoundedIcon />
                        </IconWrapper>
                        <IconWrapper value={1}>
                          <PublishRoundedIcon />
                        </IconWrapper>
                        <IconWrapper value={2}>
                          <HistoryRoundedIcon />
                        </IconWrapper>
                        <IconWrapper value={3}>
                          <FolderSpecialRoundedIcon />
                        </IconWrapper>
                        <IconWrapper value={4}>
                          <ShoppingBasketRoundedIcon />
                        </IconWrapper>
                      </Switch>
                      <Box
                        ml={2}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <EvoTypography
                          sx={{
                            color: theme.palette.fontColor?.light,
                          }}
                        >
                          {t(menuItem.title)}
                        </EvoTypography>
                        <EvoTypography
                          sx={{
                            color: theme.palette.fontColor?.light,
                            opacity: 0.5,
                          }}
                        >
                          {t(menuItem.title)}
                        </EvoTypography>
                      </Box>
                    </Grid>
                  </Link>
                )}
              </Grid>
            ))}
            <Divider
              sx={{
                paddingInline: 3,
                backgroundColor: "red",
                width: "83%",
                opacity: "0.5",
              }}
            />
            <IconButton
              onClick={logoutEvovor}
              sx={{
                borderRadius: "5px",
                width: "fit-content",
                p: 0,
                mt: 2,
              }}
            >
              <EvoTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f64e60",
                  fontSize: "15px",
                  color: "white",
                  borderRadius: 1,
                  paddingBlock: 0.8,
                  paddingInline: 1.5,
                }}
              >
                {t("sign_out")}
              </EvoTypography>
            </IconButton>
          </Grid>
        </Grid>
      </OutsideClickHandler>
    </>
  );
};

export default UserMenu;
