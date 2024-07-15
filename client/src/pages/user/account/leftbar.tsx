import { Box, Divider, Grid, IconButton } from "@mui/material";
import { EvoTypography } from "../../../components/styled-components";
// import { useThemeStyle } from "../../../hooks/useThemeStyle";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import TextSnippetRoundedIcon from "@mui/icons-material/TextSnippetRounded";
import ControlCameraRoundedIcon from "@mui/icons-material/ControlCameraRounded";
import { AccountMenu, RelatedEvoMenu } from "../../../config/navConfig";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLeftbar } from "../../../reducers/leftbarSlice";
import UserContext from "../../../contexts/userContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { configState } from "../../../reducers/configSlice";

const Leftbar = () => {
  // const theme = useThemeStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contextUser = useContext(UserContext);
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(0);
  const { s3Auth } = useSelector(configState);
  const accountState = useSelector((state: any) => state.account.accountState);

  const handleMenu = (to: string, index: number) => {
    setSelectedItem(index);
    navigate(to);
  };

  const requestCashout = () => {
    navigate("request-cashout");
  };

  const closeLeftbar = () => {
    dispatch(handleLeftbar("0"));
  };

  const getAccountMenuItem = (item: any, index: number) => {
    if (accountState.account_type == 2 && index > 0) {
      return <></>;
    }
    return (
      <IconButton
        onClick={() => handleMenu(item.action, index)}
        sx={{
          borderRadius: "5px",
          width: "100%",
          justifyContent: "left",
          paddingBlock: 1.5,
        }}
      >
        <ControlCameraRoundedIcon
          sx={{ color: selectedItem === index ? "#3699FF" : "black" }}
        />
        <EvoTypography
          sx={{
            ml: 1,
            color: selectedItem === index ? "#3699FF" : "black",
          }}
        >
          {t(item.title.toLowerCase())}
        </EvoTypography>
      </IconButton>
    );
  };

  return (
    <Grid
      sx={{
        backgroundColor: "white",
        height: "auto",
        borderRadius: "4px",
        boxShadow: "0px 0px 30px 0px rgb(82 63 105 / 30%)",
      }}
    >
      <Grid
        sx={{
          width: "100%",
          height: "auto",
          backgroundImage: 'url("/assets/images/navbar/user_menu_bg.jpg")',
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Grid
          sx={{
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
            {contextUser && (
              <img
                alt="Avatar"
                src={`${
                  process.env.REACT_APP_S3BASEURL +
                  contextUser.user.avatar +
                  "?Authorization=" +
                  s3Auth.authorizationToken
                }`}
                style={{
                  borderRadius: "5px",
                  width: "80px",
                  height: "auto",
                  border: "3px solid #19cf79",
                }}
              />
            )}
            <Box
              ml={1.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <EvoTypography
                sx={{
                  color: "white",
                  fontSize: "18px",
                  mb: 0.8,
                }}
              >
                {contextUser?.user.name}
              </EvoTypography>
              <Box display={"flex"} alignItems="center" mb={0.5}>
                <img
                  alt="credit"
                  src="/assets/images/navbar/EvoCredit.png"
                  style={{ width: "25px", height: "auto" }}
                />
                <EvoTypography
                  sx={{
                    color: "white",
                    ml: 1,
                    fontSize: "16px",
                  }}
                >
                  1000
                </EvoTypography>
              </Box>
              <Box display={"flex"} alignItems="center">
                <FavoriteRoundedIcon sx={{ color: "#f34a4a" }} />
                <EvoTypography
                  sx={{
                    color: "white",
                    ml: 1,
                    fontSize: "16px",
                  }}
                >
                  0
                </EvoTypography>
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <IconButton
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3699FF !important",
                color: "white",
                paddingBlock: 0.5,
                paddingInline: 1,
                borderRadius: 1,
              }}
            >
              <EvoTypography sx={{ fontSize: "14px" }}>
                {t("top_up")}
              </EvoTypography>
            </IconButton>
            <IconButton
              onClick={requestCashout}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFA800 !important",
                color: "white",
                paddingBlock: 0.5,
                paddingInline: 1,
                borderRadius: 1,
                mt: 1,
              }}
            >
              <EvoTypography sx={{ fontSize: "14px" }}>
                {t("cash_out")}
              </EvoTypography>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ p: "24px 24px 0 24px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <EvoTypography>{t("email")}:</EvoTypography>
          <EvoTypography color="#979799">
            {contextUser?.user.email}
          </EvoTypography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <EvoTypography>{t("location")}:</EvoTypography>
          <EvoTypography color="#979799">
            Ze Address is over there
          </EvoTypography>
        </Box>
        <Box
          sx={{
            p: 2,
          }}
        >
          {AccountMenu.map((item, index) => (
            <Grid key={item.title + index}>
              {getAccountMenuItem(item, index)}
            </Grid>
          ))}
        </Box>
        <Divider
          sx={{
            borderStyle: "dashed",
          }}
        />
        <Box
          sx={{
            p: 2,
          }}
        >
          {RelatedEvoMenu.map((item, index) => (
            <IconButton
              onClick={() =>
                handleMenu(item.action, AccountMenu.length + index)
              }
              key={item.title + index}
              sx={{
                borderRadius: "5px",
                width: "100%",
                justifyContent: "left",
                paddingBlock: 2,
              }}
            >
              <TextSnippetRoundedIcon />
              <EvoTypography
                sx={{
                  ml: 1,
                  color:
                    selectedItem === AccountMenu.length + index
                      ? "#3699FF"
                      : "black",
                }}
              >
                {item.title}
              </EvoTypography>
            </IconButton>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Leftbar;
