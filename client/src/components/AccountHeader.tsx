import { Divider, Grid, IconButton } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { EvoTypography } from "./styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleLeftbar, leftbarState } from "../reducers/leftbarSlice";
import { useTranslation } from "react-i18next";

const AccountHeader = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const leftbar_pos = useSelector(leftbarState);
  const header = props.header;

  const handleHeadBtn = () => {
    props.handleHeadAction(true);
  };

  const handleLeftbarPos = () => {
    if (leftbar_pos == "0") {
      dispatch(handleLeftbar("-380px"));
    } else {
      dispatch(handleLeftbar("0"));
    }
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBlockEnd: 1.5,
          p: "15px 30px 10px 30px",
        }}
      >
        <Grid
          sx={{
            width: "100%",
          }}
        >
          <EvoTypography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {t(header.title.toLowerCase())}
          </EvoTypography>
          <EvoTypography
            sx={{
              fontSize: "14px",
              color: "#979799",
            }}
          >
            {t(header.detail.toLowerCase())}
          </EvoTypography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "flex-end",
            pr: 1.5,
          }}
        >
          {(header.index == 1 || header.index == 3 || header.index == 6) && (
            <IconButton
              onClick={handleHeadBtn}
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
                {t(header.btn.toLowerCase())}
              </EvoTypography>
            </IconButton>
          )}
          <IconButton
            onClick={handleLeftbarPos}
            sx={{
              display: { md: "none", xs: "flex" },
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#3699FF !important",
              color: "white",
              paddingBlock: 0.5,
              paddingInline: 1,
              borderRadius: 1,
              ml: 1,
            }}
          >
            <ListIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default AccountHeader;
