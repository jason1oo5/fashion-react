import { Box, Grid, IconButton } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import {
  addProductDislike,
  addProductLike,
  getProductDetailById,
  getQuestionsByUser,
  getReviews,
} from "../../../service/productService";
import ModelView from "../../../components/model-details/modelView";
import { EvoTypography } from "../../../components/styled-components";
import { SignToBuy } from "../../../components/model-details/modelOptions";
import ProductTab from "../../../components/ProductTab";
import {
  setQuestions,
  setReviews,
} from "../../../reducers/productOpinionSlice";
import { QuestionType, ReviewType } from "../../../config/interface";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { configState } from "../../../reducers/configSlice";
import { filterOptState, setFilterOpt } from "../../../reducers/filterSlice";

export default function ProductView() {
  const theme = useThemeStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(true);
  const [tagList, setTagList] = useState<any>();
  const [productDetail, setProductDetail] = useState<any>();
  const [imgRenderHtml, setImgRenderHtml] = useState<any>();
  const [reviewStates, setReviewStates] = useState<ReviewType | []>();
  const [questionStates, setQuestionStates] = useState<QuestionType | []>();
  const [refresh, setRefresh] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

  const filterOpt = useSelector(filterOptState);
  const { s3Auth } = useSelector(configState);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  window.scrollTo({
    top: 0,
  });

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
    let imgHtml: any = "";
    const fetch_product_detail = async () => {
      const product_detail: any = await getProductDetailById(product_id);
      const d_tagList = product_detail.tags
        ? product_detail.tags.split(",")
        : [];
      setTagList(d_tagList);
      product_detail.productImage.map((item: any) => {
        imgHtml += `<img src='${
          process.env.REACT_APP_S3BASEURL +
          item.path +
          "?Authorization=" +
          s3Auth.authorizationToken
        }' data-fit="contain" />`;
      });
      setProductDetail(product_detail);
      setImgRenderHtml(imgHtml);
      setLoadingState(false);
    };
    const fetch_questions = async () => {
      const question = await getQuestionsByUser(Number(product_id));
      const review = await getReviews(Number(product_id));
      setReviewStates(review);
      setQuestionStates(question);
      dispatch(setQuestions(question));
      dispatch(setReviews(review));
    };

    fetch_questions().catch((err) => {
      console.log(err);
    });

    fetch_product_detail().catch((err) => {
      console.log(err);
    });
  }, [product_id, refresh, dispatch]);

  const addFavoriteProduct = async () => {
    await addProductLike(product_id);
    setRefresh(!refresh);
  };

  const addDislikeProduct = async () => {
    await addProductDislike(product_id);
    setRefresh(!refresh);
  };

  const handleFilterByTag = (tagName: string) => {
    let opt = Object.assign({}, filterOpt);
    Object.assign(opt, { search: tagName });
    dispatch(setFilterOpt(opt));
    navigate("/dashboard/marketplace/product-store?tag[]=" + tagName);
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
            mt={10}
            sx={{
              gridTemplateColumns: {
                md: "repeat(auto-fill, minmax(500px, 1fr))",
              },
              gridGap: "30px",
            }}
          >
            <Grid sx={{ maxWidth: "100%", width: "100%", flex: "0 0  100%" }}>
              <ModelView
                imgList={productDetail.imgList}
                imgRender={imgRenderHtml}
              />
            </Grid>
            <Grid sx={{ maxWidth: "100%", width: "100%", flex: "0 0  100%" }}>
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
                </Grid>
                <EvoTypography sx={{ fontSize: "14px", color: "darkorange" }}>
                  {productDetail.title} - Environment -{" "}
                  {productDetail.created_at}{" "}
                </EvoTypography>
                <Box
                  sx={{
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
                <Box sx={{ mt: 4 }}>
                  <SignToBuy product={productDetail} multiplier={multiplier} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid mt={5}>
            {reviewStates && questionStates && (
              <ProductTab
                description={productDetail.description}
                reviews={reviewStates}
                questions={questionStates}
                productId={Number(product_id)}
              />
            )}
            <Box>
              <EvoTypography
                sx={{
                  fontSize: "20px",
                  color: theme.palette.fontColor?.light,
                  mb: 1,
                }}
              >
                {t("tags")}
              </EvoTypography>
              {tagList?.map((tagName: any, index: number) => (
                <IconButton
                  key={tagName + index}
                  onClick={() => handleFilterByTag(tagName)}
                  sx={{
                    backgroundColor: "black !important",
                    color: "darkorange",
                    fontSize: "15px",
                    mr: 1,
                    mb: 1,
                    borderRadius: "2px",
                  }}
                >
                  {tagName}
                </IconButton>
              ))}
            </Box>
            <Box mt={3}>
              {/* <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "#262626",
                  paddingBottom: 1.5,
                }}
              >
                <EvoTypography
                  sx={{
                    fontSize: "25px",
                    fontWeight: "600",
                    color: theme.palette.fontColor?.light,
                  }}
                >
                  {t("related_content")}
                </EvoTypography>
              </Box>
              <Grid
                mt={3}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                  gridGap: { sm: "30px", xs: "15px" },
                }}
              >                
              </Grid> */}
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
}
