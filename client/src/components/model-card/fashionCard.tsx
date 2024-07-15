import { Divider, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import StarMark from "../startMark";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { EvoTypography } from "../styled-components";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useLocation, useNavigate } from "react-router-dom";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { useSelector } from "react-redux";
import { configState } from "../../reducers/configSlice";

interface FashionModelProps {
  title: string;
  subTitle: string;
  mark: number;
  model: string;
  views_count: string;
  price: string;
  old_price: string;
  votes: number;
  product_id: any;
}

export default function FashionModelCard({
  title,
  subTitle,
  mark,
  views_count,
  old_price,
  price,
  votes,
  model,
  product_id,
}: FashionModelProps) {
  const theme = useThemeStyle();
  const location = useLocation();
  const navigate = useNavigate();
  const { s3Auth } = useSelector(configState);
  const pathname = location.pathname;

  const starMark = mark * 24;

  const editProduct = () => {
    navigate("editProduct/" + String(product_id) + "?edit");
  };

  return (
    <Grid
      sx={{
        width: "100%",
        boxShadow: "0 4px 8px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 15%)",
        transition: "box-shadow 0.2s",
        borderRadius: 1.5,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          minHeight: "230px",
          backgroundSize: "cover",
          backgroundImage: `url(${
            process.env.REACT_APP_S3BASEURL +
            model +
            "?Authorization=" +
            s3Auth.authorizationToken
          })`,
        }}
      />
      {pathname.includes("myProducts") && (
        <IconButton
          onClick={editProduct}
          sx={{
            position: "absolute",
            marginTop: -5,
            right: "3%",
            color: "#fff",
            backgroundColor: "#4fa116 !important",
          }}
        >
          <BorderColorRoundedIcon sx={{ width: "20px", height: "auto" }} />
        </IconButton>
      )}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.dark,
          height: "auto",
          padding: "6px 16px 14px 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EvoTypography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: theme.palette.fontColor?.light,
            }}
          >
            {title
              ? title.substring(0, 11) + (title.length > 10 ? "..." : "")
              : "title"}
          </EvoTypography>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteRoundedIcon sx={{ color: "#f34a4a" }} />
            <EvoTypography color={theme.palette.fontColor?.light} ml={1}>
              {votes}
            </EvoTypography>
          </Grid>
        </Box>
        <EvoTypography
          sx={{
            fontSize: "15px",
            color: theme.palette.warning.main,
          }}
        >
          {subTitle ? subTitle : "sub title"}
        </EvoTypography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <StarMark width="100" fillwidth={String(starMark)} />
          <EvoTypography
            sx={{
              fontSize: "17px",
              color: theme.palette.warning.light,
              fontWeight: 600,
              mt: -0.8,
              ml: 1.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <HowToRegIcon sx={{ color: "#4fa116", mr: 1 }} />
            {views_count}
          </EvoTypography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <EvoTypography
            sx={{
              color: "white",
              fontSize: "16px",
              backgroundColor: theme.palette.success.light,
              paddingInline: "5px",
            }}
          >
            100%OFF
          </EvoTypography>
          <EvoTypography
            sx={{ color: theme.palette.fontColor?.light, fontWeight: 500 }}
          >
            <del style={{ fontWeight: 500, color: "gray" }}>{old_price}</del> $
            {price}
          </EvoTypography>
        </Box>
      </Box>
    </Grid>
  );
}
