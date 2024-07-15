import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import AccountHeader from "../../../../components/AccountHeader";
import { EvoTypography } from "../../../../components/styled-components";
import { AccountHeaderContent } from "../../../../config/navConfig";
import SKUTable from "./tables/skuTable";
import OrderTable from "../../orders-history/tables/orderTable";
import { getOrderInfo } from "../../../../service/userService";
import { findLicense } from "../../../../service/admin/license";
import { useSelector } from "react-redux";

const EvoFashionDetail = () => {
  const [value, setValue] = React.useState("1");
  const [orderList, setOrderList] = React.useState<any>();
  const [license, setLicense] = React.useState<any>();
  const [promotionState, setPromotionState] = React.useState(1);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  React.useEffect(() => {
    const type = accountState.account_type;
    const entity_id =
      type == 1
        ? 0
        : userCompaniesState[accountState.companyIdx]?.company[0].id;
    const fetch_Data = async () => {
      const order_res = await getOrderInfo(type, entity_id);
      const license_res = await findLicense();
      setLicense(license_res);
      setOrderList(order_res);
    };

    fetch_Data().catch((err) => {
      console.log("fetch order", err);
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        sx={{
          backgroundColor: "white",
          height: "auto",
          width: "100%",
          borderRadius: "4px",
          boxShadow: "0px 0px 30px 0px rgb(82 63 105 / 30%)",
          ml: 2,
          pb: 3,
          mb: 3,
        }}
      >
        <AccountHeader header={AccountHeaderContent[4]} />
        <Grid sx={{ p: "15px 30px 10px 30px" }}>
          <Grid
            container
            sx={{
              flexGrow: 1,
              display: "flex",
              mt: 1,
            }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label={<EvoTypography>Service Overview</EvoTypography>}
                      value="1"
                    />
                    <Tab
                      label={<EvoTypography>SKU Sales</EvoTypography>}
                      value="2"
                    />
                    <Tab
                      label={<EvoTypography>Orders History</EvoTypography>}
                      value="3"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EvoTypography
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      License:
                    </EvoTypography>
                    {license?.map((item: any, index: number) => (
                      <EvoTypography
                        key={index + item.name}
                        sx={{
                          fontSize: "13px",
                          backgroundColor: "#e1f0ff",
                          borderRadius: "5px",
                          color: "#3699ff",
                          paddingInline: 1,
                          ml: 1,
                        }}
                      >
                        {item.name}
                      </EvoTypography>
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <EvoTypography
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      Marketplace Earnings:
                    </EvoTypography>
                    <EvoTypography
                      sx={{
                        fontSize: "13px",
                        backgroundColor: "#fff4de",
                        borderRadius: "5px",
                        color: "#ffa800",
                        paddingInline: 1,
                        ml: 1,
                      }}
                    >
                      0
                    </EvoTypography>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            setPromotionState(e.target.checked ? 1 : 0)
                          }
                        />
                      }
                      label="Include Promotion Sales"
                    />
                  </Box>
                  <SKUTable promotionState={promotionState} />
                </TabPanel>
                <TabPanel value="3">
                  <OrderTable tableData={orderList} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EvoFashionDetail;
