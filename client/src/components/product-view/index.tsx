import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { EvoTypography } from "../styled-components";
import ModelView from "../model-details/modelView";
import {
  addProductDislike,
  addProductLike,
  getProductDetailById,
} from "../../service/productService";

import { SignToBuy } from "../model-details/modelOptions";
import { useThemeStyle } from "../../hooks/useThemeStyle";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { configState } from "../../reducers/configSlice";

export default function ProductViewComponent({ product, multiplier }: any) {
  const theme = useThemeStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { s3Auth } = useSelector(configState);
  const [loadingState, setLoadingState] = useState(true);
  const [productDetail, setProductDetail] = useState<any>();
  const [imgRenderHtml, setImgRenderHtml] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let imgHtml: any = "";
    product.productImage.map((item: any) => {
      imgHtml += `<img src='${
        process.env.REACT_APP_S3BASEURL +
        item.path +
        "?Authorization=" +
        s3Auth.authorizationToken
      }' data-fit="contain" />`;
    });

    const fetch_product_detail = async () => {
      const product_detail: any = await getProductDetailById(product.id);
      setProductDetail(product_detail);
      setImgRenderHtml(imgHtml);
      setLoadingState(false);
    };
    fetch_product_detail().catch((err) => {
      console.log(err);
    });
  }, [product._id, refresh]);

  const addFavoriteProduct = async () => {
    await addProductLike(product.id);
    setRefresh(!refresh);
  };

  const addDislikeProduct = async () => {
    await addProductDislike(product.id);
    setRefresh(!refresh);
  };

  return (
    <Grid>
      {loadingState ? (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress color="success" />
        </Grid>
      ) : (
        <>
          <Grid
            display="grid"
            mt={3}
            sx={{
              gridTemplateColumns: {
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              },
              gridGap: "30px",
            }}
          >
            <Grid container sx={{ width: "100%" }} spacing={3}>
              <Grid item xs={6}>
                <ModelView
                  imgList={productDetail.imgList}
                  imgRender={imgRenderHtml}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid
                  sx={{ maxWidth: "100%", width: "100%", flex: "0 0  100%" }}
                >
                  <Box sx={{ marginLeft: { bmd: "20px", xs: "0" } }}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <EvoTypography
                        sx={{
                          fontSize: "30px",
                          color: theme.palette.fontColor?.light,
                        }}
                      >
                        {productDetail.title}
                      </EvoTypography>
                      <IconButton
                        onClick={addFavoriteProduct}
                        sx={{
                          ml: 5,
                          color: "#f34a4a",
                        }}
                      >
                        <ThumbUpRoundedIcon
                          sx={{ width: "28px", height: "28px" }}
                        />
                        <EvoTypography
                          sx={{
                            position: "absolute",
                            mt: -2,
                            ml: 5,
                            color: theme.palette.fontColor?.light,
                          }}
                        >
                          {productDetail.productLike
                            ? productDetail.productLike.length
                            : 0}
                        </EvoTypography>
                      </IconButton>
                      <IconButton
                        onClick={addDislikeProduct}
                        sx={{
                          color: "#e97b62",
                          ml: 2,
                        }}
                      >
                        <ThumbDownRoundedIcon
                          sx={{ width: "28px", height: "28px" }}
                        />
                        <EvoTypography
                          sx={{
                            position: "absolute",
                            mt: -2,
                            ml: 5,
                            color: theme.palette.fontColor?.light,
                          }}
                        >
                          {productDetail.productDislike
                            ? productDetail.productDislike.length
                            : 0}
                        </EvoTypography>
                      </IconButton>
                      <Box sx={{ flexGrow: 1 }} />
                      <Tooltip title="View more details">
                        <Button
                          autoFocus
                          onClick={() =>
                            navigate(
                              "/dashboard/marketplace/product-view/" +
                                productDetail.id
                            )
                          }
                          sx={{
                            border: "1px solid #c4c4c4",
                            paddingInline: "10px",
                            marginBlock: 1,
                            textTransform: "capitalize",
                            ml: 5,
                            color: theme.palette.fontColor?.light,
                          }}
                        >
                          Detail
                        </Button>
                      </Tooltip>
                    </Grid>
                    <EvoTypography
                      sx={{ fontSize: "14px", color: "darkorange" }}
                    >
                      {productDetail.title} - Environment -{" "}
                      {productDetail.created_at}{" "}
                    </EvoTypography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <EvoTypography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: theme.palette.fontColor?.light,
                          lineHeight: "40px",
                        }}
                      >
                        SKU:
                      </EvoTypography>
                      <EvoTypography
                        sx={{
                          ml: 1,
                          fontSize: "18px",
                          fontWeight: 500,
                          color: theme.palette.fontColor?.light,
                          lineHeight: "40px",
                        }}
                      >
                        {productDetail.sku}
                      </EvoTypography>
                    </Box>
                    <EvoTypography
                      sx={{
                        fontSize: "16px",
                        color: theme.palette.fontColor?.light,
                      }}
                    >
                      High quality old fabric moduls with photoscanned elements.
                    </EvoTypography>
                    <Box
                      sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                    >
                      <SignToBuy
                        product={productDetail}
                        multiplier={multiplier}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
