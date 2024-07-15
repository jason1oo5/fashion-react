import { Divider, Grid, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Page from "../../../components/Page";
import { EvoTypography } from "../../../components/styled-components";
import { getOrderInfo } from "../../../service/userService";
import OrderTable from "./tables/orderTable";

const OrdersWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  borderRadius: 5,
  boxShadow: "0 0 30px 0 rgb(82 63 105 / 30%)",
  backgroundColor: "white",
}));

const OrderHistory = () => {
  const [orderList, setOrderList] = useState<any>();
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  useEffect(() => {
    const type = accountState.account_type;
    const entity_id =
      type == 1
        ? 0
        : userCompaniesState[accountState.companyIdx]?.company[0].id;
    const fetch_order = async () => {      
      const res = await getOrderInfo(type, entity_id);
      setOrderList(res);
    };

    fetch_order().catch((err) => {
      console.log("fetch order", err);
    });
  }, [accountState]);

  return (
    <Page title="Orders History">
      <Grid
        sx={{
          backgroundColor: "#eef0f8",
          minHeight: "100vh",
        }}
      >
        <Grid
          sx={{
            marginInline: { xl: "auto", sm: "30px", xs: "90px" },
            maxWidth: "1340px",
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid sx={{ width: "100%", mt: 10, mb: 5 }}>
            <OrdersWrapper>
              <Grid sx={{ p: 3 }}>
                <EvoTypography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  My Orders (ggg)
                </EvoTypography>
              </Grid>
              <Divider />
              <Grid sx={{ p: 3 }}>
                <OrderTable tableData={orderList} />
              </Grid>
            </OrdersWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default OrderHistory;
