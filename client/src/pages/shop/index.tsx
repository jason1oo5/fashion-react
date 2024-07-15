import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import { EvoTypography } from "../../components/styled-components";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { cartItemState } from "../../reducers/cartItemSlice";
import ShopTable from "./table/shopTable";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { toast } from "react-toastify";
import { deleteCartItem } from "../../service/cartService";
import { addOrderInfo } from "../../service/userService";

const paypalScriptOptions: PayPalScriptOptions = {
  "client-id":
    "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
  currency: "USD",
};

const ShopPageWrapper = styled(Grid)(({}) => ({
  width: "100%",
  height: "auto",
  borderRadius: 5,
  boxShadow: "0 0 30px 0 rgb(82 63 105 / 30%)",
  backgroundColor: "white",
  paddingBlockEnd: 30,
}));

const Shop = () => {
  const theme = useThemeStyle();
  const { t } = useTranslation();
  const cartItems = useSelector(cartItemState);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  const [totalPrice, setTotalPrice] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  //paypal
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

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
    let d_totalPrice = 0;
    cartItems.map((item: any) => {
      d_totalPrice += item.product[0].price;
    });
    setTotalPrice(d_totalPrice);
  }, [success]);

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Buy 3D Object Models",
            amount: {
              currency_code: "USD",
              value: totalPrice * multiplier,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      const { payer } = details;
      await orderProducts(data);
      setSuccess(true);
    });
  };
  //capture likely error
  const onError = (data: any, actions: any) => {
    setErrorMessage("An Error occured with your payment ");
    toast.error("An Error occured with your payment");
  };

  const handlePaymentOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment((event.target as HTMLInputElement).value);
  };

  const orderProducts = async (paymentData: any) => {
    const orderData = {
      salt: paymentData.orderID,
      payment_method: selectedPayment,
      provider_tx: new Date(),
      amount: totalPrice * multiplier,
      state: 1,
      title: "Evofashion Cart",
    };
    try {
      const res = await addOrderInfo(orderData);
    } catch (error) {}
    await Promise.all(
      cartItems.map(async (item: any) => {
        await deleteCartItem(item.id);
      })
    );
  };

  return (
    <Page title="My Shop">
      <Grid
        sx={{
          marginInline: { xl: "auto", sm: "30px", xs: "90px" },
          maxWidth: "1500px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid sx={{ width: "100%", mt: 10, mb: 5 }}>
          <ShopPageWrapper>
            <Grid sx={{ p: 3 }}>
              <EvoTypography sx={{ fontSize: "16px", fontWeight: 600 }}>
                {t("my_shop")}
              </EvoTypography>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <ShopTable tableData={cartItems} multiplier={multiplier} />
              <Divider sx={{ borderStyle: "dashed", mt: 3 }} />
              <Grid
                container
                spacing={2}
                sx={{ flexDirection: { xs: "column", sm: "row" }, mt: 2 }}
              >
                <Grid item xs={12} sm={6}>
                  <EvoTypography
                    sx={{
                      backgroundColor: "#f3f6f9",
                      color: theme.palette.fontColor?.light,
                      p: 1.2,
                      borderRadius: "25px",
                    }}
                  >
                    {t("payment_selection")}
                  </EvoTypography>
                  <Grid mt={3}>
                    <FormControl>
                      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                      <RadioGroup
                        row
                        defaultValue={"paypal"}
                        defaultChecked
                        name="row-radio-buttons-group"
                        onChange={handlePaymentOption}
                        sx={{
                          "& span": {
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      >
                        <FormControlLabel
                          value="paypal"
                          control={<Radio />}
                          label={
                            <img
                              src="/assets/images/page_img/paypal.png"
                              width="100px"
                              height="auto"
                            />
                          }
                        />
                        <FormControlLabel
                          value="alipay"
                          control={<Radio />}
                          label={
                            <img
                              src="/assets/images/page_img/Alipay-Logo_small.png"
                              width="100px"
                              height="auto"
                            />
                          }
                        />
                        <FormControlLabel
                          value="credit"
                          control={<Radio />}
                          label={
                            <img
                              src="/assets/images/page_img/EvoCredit.png"
                              width="35px"
                              height="auto"
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <EvoTypography
                    sx={{
                      backgroundColor: "#f3f6f9",
                      color: theme.palette.fontColor?.light,
                      p: 1.2,
                      borderRadius: "25px",
                    }}
                  >
                    {t("order_summary")}
                  </EvoTypography>
                  <Grid
                    mt={3}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <EvoTypography>{t("total")}:</EvoTypography>
                    <EvoTypography>
                      $&nbsp; {totalPrice * multiplier}{" "}
                    </EvoTypography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ borderStyle: "dashed", mt: 5 }} />
              <Grid mt={3}>
                <PayPalScriptProvider options={paypalScriptOptions}>
                  <Grid
                    sx={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "right",
                    }}
                  >
                    <Grid
                      sx={{
                        zIndex: 1,
                        position: "absolute",
                        width: "30px",
                        marginRight: "120px",
                      }}
                    >
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        // onError={onError}
                        style={{
                          layout: "horizontal",
                          label: "buynow",
                          tagline: false,
                          shape: "pill",
                        }}
                      />
                    </Grid>
                    <IconButton
                      style={{
                        position: "absolute",
                        pointerEvents:
                          selectedPayment == "paypal" ? "none" : "fill",
                        top: 0,
                        zIndex: 2,
                        fontSize: "15px",
                        color: "white",
                        borderRadius: "5px",
                        backgroundColor: "#3699FF",
                        minWidth: "150px",
                      }}
                    >
                      {t("proceed_checkout")}
                    </IconButton>
                  </Grid>
                </PayPalScriptProvider>
              </Grid>
            </Grid>
          </ShopPageWrapper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Shop;
