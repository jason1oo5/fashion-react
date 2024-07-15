import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AccountHeader from "../../../../components/AccountHeader";
import { EvoTypography } from "../../../../components/styled-components";
import { CashoutConfig } from "../../../../config/navConfig";
import { useTranslation } from "react-i18next";
import CashoutTable from "./cashoutTable";

const header = [
  {
    index: 6,
    title: "Request_Cashout",
    detail: "",
    btn: "submit_request",
  },
  {
    index: 7,
    title: "request_history",
    detail: "",
    btn: "",
  },
];

const RequestCashout = () => {
  const { t } = useTranslation();
  const [historyData, setHistoryData] = useState<any>();

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
        <AccountHeader header={header[0]} />
        <Grid sx={{ p: "15px 30px 10px 30px" }}>
          {CashoutConfig.map((item: any, index) => (
            <Grid
              key={item + index}
              container
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Grid item xs={3}>
                <EvoTypography>{t(item.toLowerCase())}</EvoTypography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  type={index == 1 ? "number" : "text"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    width: "100%",
                    backgroundColor: "#f3f6f9",
                    borderRadius: "5px",
                    "& input": {
                      paddingInlineStart: "25px",
                      height: "15px",
                      fontSize: "14px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
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
        <AccountHeader header={header[1]} />
        <Grid sx={{ p: "15px 30px 10px 30px" }}>
          <CashoutTable cashoutHistory={historyData} />
        </Grid>
      </Grid>
    </>
  );
};

export default RequestCashout;
