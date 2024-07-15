import React, { useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { EvoTypography, StyledBadge } from "../styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import CartItem from "./cart-item";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../service/cartService";
import { useSelector } from "react-redux";
import { cartItemState, setCartItem } from "../../reducers/cartItemSlice";
import UserContext from "../../contexts/userContext";

const ShopCart = () => {
  const theme = useThemeStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const contextUser = React.useContext(UserContext);
  const dispatch = useDispatch();
  const [openDlg, setOpenDlg] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const cartItems = useSelector(cartItemState);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  useEffect(() => {
    if (accountState.account_type == 1) {
      setMultiplier(1);
    } else {
      setMultiplier(
        userCompaniesState[accountState.companyIdx]?.company[0].multiplier
      );
    }
  }, [accountState]);

  useEffect(() => {
    const fetch_cartItems = async () => {
      const res = await getCartItems();
      let d_totalPrice = 0;
      res.map((item: any) => {
        d_totalPrice += item.product[0].price;
      });
      setTotalPrice(d_totalPrice);
      dispatch(setCartItem(res));
    };

    fetch_cartItems().catch((err) => {
      console.log(err);
    });
  }, [dispatch]);

  const closeShopDlg = () => {
    setOpenDlg(false);
  };

  const linkToShop = () => {
    navigate("/user/shop");
  };

  return (
    <>
      <IconButton
        aria-label="cart"
        onClick={() => setOpenDlg(contextUser?.user.token ? true : false)}
        sx={{ ml: 1, mr: 1.5 }}
      >
        <StyledBadge
          badgeContent={contextUser?.user.token && cartItems?.length}
          color="primary"
        >
          <ShoppingCartIcon
            aria-label="countLabel"
            sx={{
              width: "30px",
              height: "30px",
              color: "#0178f6",
            }}
          />
        </StyledBadge>
      </IconButton>
      <OutsideClickHandler onOutsideClick={closeShopDlg}>
        <Grid
          sx={{
            width: "350px",
            height: "500px",
            overflowY: "scroll",
            position: "absolute",
            backgroundColor: theme.palette.backgroundColor?.dark,
            borderRadius: 1,
            right: "0px",
            top: "52px",
            mt: "10px",
            display: openDlg ? "block" : "none",
            // transform: openDlg?'scale(1, 1)': 'scale(0, 0)',
            boxShadow: "0px 0px 30px 0px rgb(82 63 105 / 30%)",
            "&::-webkit-scrollbar": { display: "none" },
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
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              sx={{
                color: "white",
                borderRadius: "2px",
              }}
            >
              <ShoppingCartIcon sx={{ width: "30px", height: "auto" }} />
              <EvoTypography sx={{ ml: 1, fontSize: "18px" }}>
                {t("cart")}
              </EvoTypography>
            </IconButton>
            <EvoTypography
              sx={{
                fontSize: "14px",
                color: "white",
                p: 1,
                backgroundColor: "#0bb7af !important",
                borderRadius: "5px",
              }}
            >
              {cartItems?.length}&nbsp;{t("item")}
            </EvoTypography>
          </Grid>
          <Grid>
            {cartItems?.map((item: any, index: number) => (
              <CartItem itemData={item} key={index} multiplier={multiplier} />
            ))}
          </Grid>
          <Grid sx={{ p: 2, position: "absolute", bottom: 0, width: "100%" }}>
            <Grid sx={{ position: "relative" }}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EvoTypography color={theme.palette.fontColor?.light}>
                  {t("total")}
                </EvoTypography>
                <EvoTypography color={theme.palette.fontColor?.light}>
                  ${totalPrice * multiplier}
                </EvoTypography>
              </Grid>
              <IconButton
                onClick={linkToShop}
                sx={{
                  float: "right",
                  color: "white",
                  backgroundColor: "#0bb7af !important",
                  borderRadius: "5px",
                  mt: 1,
                }}
              >
                <AddShoppingCartRoundedIcon
                  sx={{ width: "20px", height: "auto" }}
                />
                <EvoTypography color="white">{t("order")}</EvoTypography>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </OutsideClickHandler>
    </>
  );
};

export default ShopCart;
