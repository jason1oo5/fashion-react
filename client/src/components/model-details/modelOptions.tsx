import { Box, Grid, IconButton, styled } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AppleIcon from "@mui/icons-material/Apple";
import PaymentIcon from "@mui/icons-material/Payment";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import { useNavigate } from "react-router";
import { EvoTypography } from "../styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../service/cartService";
import { cartItemState, setCartItem } from "../../reducers/cartItemSlice";
import { useThemeStyle } from "../../hooks/useThemeStyle";

export function SignToBuy(props: any) {
  const { product, multiplier } = props;

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useThemeStyle();
  const cartItems = useSelector(cartItemState);
  const [cartState, setCartState] = useState<Boolean>(false);
  const contextUser = useContext(UserContext);

  useEffect(() => {
    const cartItem = cartItems.find(
      (item: any) => item.product_id == product.id
    );
    if (cartItem == undefined) {
      setCartState(false);
    } else {
      setCartState(true);
    }
  }, [cartItems]);

  const handleProduct = async () => {
    if (contextUser?.user.token) {
      if (cartState) {
        navigate("/user/shop");
      } else {
        try {
          const res = await addToCart(product.id);
          dispatch(setCartItem(res));
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const getBtnTitle = () => {
    if (contextUser?.user?.token) {
      if (cartState) {
        return "Order Product";
      } else {
        return t("add_to_cart");
      }
    } else {
      return "Sign in to Buy";
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.cardBgColor?.main,
        maxWidth: "600px",
        minHeight: "207px",
      }}
    >
      <Grid
        item
        xs={5}
        sm={6}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "1px solid #2e2d2d",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <EvoTypography sx={{ fontSize: "28px", color: "white", mb: 1 }}>
            $ {product.price * multiplier}
          </EvoTypography>
          <IconButton
            sx={{
              backgroundColor: "orange !important",
              padding: "10px",
              paddingInline: "20px",
              color: "white",
              borderRadius: "1px",
            }}
            onClick={handleProduct}
          >
            <EvoTypography sx={{ fontSize: "18px" }}>
              {getBtnTitle()}
            </EvoTypography>
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={7} sm={6} md={6} sx={{ color: "white", p: 2.5 }}>
        <EvoTypography color="white !important">
          {t("supported_platforms")}
        </EvoTypography>
        <Box
          display="flex"
          alignItems="center"
          sx={{ color: "white", fontSize: "10px", mt: 1 }}
        >
          <AdbIcon />
          <PhoneAndroidIcon />
          <AppleIcon />
        </Box>
        <EvoTypography color="white !important" sx={{ mt: 1 }}>
          {t("supported_payment")}
        </EvoTypography>
        <Box
          display="flex"
          alignItems="center"
          sx={{ color: "white", fontSize: "10px", mt: 0.3 }}
        >
          <PaymentIcon />
        </Box>
        <EvoTypography color="white !important" sx={{ mt: 1 }}>
          {t("download_types")}
        </EvoTypography>
        <Box
          display="flex"
          alignItems="center"
          sx={{ color: "white", fontSize: "10px", mt: 0.3 }}
        >
          <FolderZipIcon />
          <ThreeDRotationIcon sx={{ ml: 1 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
