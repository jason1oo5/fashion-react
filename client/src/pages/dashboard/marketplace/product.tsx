import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Grid, IconButton } from "@mui/material";
import FashionModelCard from "../../../components/model-card/fashionCard";
import { useEffect, useState } from "react";
import { filterOptState, setFilterOpt } from "../../../reducers/filterSlice";
import { useSelector } from "react-redux";
import { useThemeStyle } from "../../../hooks/useThemeStyle";
import { EvoTypography } from "../../../components/styled-components";
import CloseIcon from "@mui/icons-material/Close";
import ProductViewComponent from "../../../components/product-view";
import { useTranslation } from "react-i18next";
import EvoPagination from "../../../components/Pagination";
import { useDispatch } from "react-redux";

interface ProductProps {
  total_count: number;
  products: any;
}

const Product = ({ total_count, products }: ProductProps) => {
  const [productData_1, setProductData_1] = useState<any>([]);
  const [productData_2, setProductData_2] = useState<any>([]);
  const [productData, setProductData] = useState<any>([]);
  const [totalProductCount, setTotalProductCount] =
    useState<number>(total_count);
  const [openModelState, setOpenModelState] = useState(true);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [splitCount, setSplitCount] = useState(10);
  const [multiplier, setMultiplier] = useState(1);

  const filterOpt = useSelector(filterOptState);
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  const dispatch = useDispatch();
  const theme = useThemeStyle();
  const { t } = useTranslation();

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
    setSplitCount(products.length);
    setTotalProductCount(total_count);
    setProductData(products);
  }, [total_count]);

  useEffect(() => {
    setProductData_1(productData.slice(0, splitCount));
    setProductData_2(productData.slice(splitCount, productData.length));
  }, [splitCount, productData, products.length]);

  const openProductView = (index: number) => {
    setOpenModelState(false);
    setSelectedItem(index);
    const width = Math.min(window.innerWidth, 1500);
    const item_row_count_1 = width > 600 ? Math.floor((width - 60) / 250) : 1;
    const gap_width = (item_row_count_1 - 1) * 20;
    const item_row_count_2 =
      width > 600 ? Math.floor((width - 60 - gap_width) / 250) : 1;
    const item_column_count = Math.floor(index / item_row_count_2) + 1;
    setSplitCount(item_column_count * item_row_count_2);
    setTimeout(() => {
      setOpenModelState(true);
    }, 500);
  };

  const closeModelView = () => {
    setOpenModelState(false);
    setSelectedItem(-1);
  };

  const changePage = (p: any) => {
    const update_filterOpt = { ...filterOpt };
    Object.assign(update_filterOpt, { page: p });
    dispatch(setFilterOpt(update_filterOpt));
  };

  return (
    <>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBlock: 3,
        }}
      >
        <EvoTypography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: theme.palette.fontColor?.light,
          }}
        >
          Our Unreal Fashion Products
        </EvoTypography>
        <EvoPagination
          page={filterOpt.page}
          changePage={changePage}
          totalCount={totalProductCount}
        />
      </Grid>
      <Grid
        sx={{
          maxWidth: { xs: "300px", sm: "none" },
          marginInline: { xs: "auto", sm: "none" },
        }}
      >
        {productData.length > 0 && (
          <>
            <Grid
              display="grid"
              sx={{
                gridTemplateColumns: {
                  bsx: "repeat(auto-fill, minmax(230px, 1fr))",
                  xs: "repeat(auto-fill, minmax(250px, 1fr))",
                },
                gridGap: { md: "20px", xs: "15px" },
                mt: 1,
              }}
            >
              {productData_1.length > 0 &&
                productData_1.map((product: any, index: number) => (
                  <Grid
                    key={index}
                    sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}
                  >
                    <Box
                      onClick={() => openProductView(index)}
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        textTransform: "capitalize",
                        padding: 0,
                        border:
                          selectedItem === index ? "5px solid #4fd145" : "",
                      }}
                    >
                      <FashionModelCard
                        title={product.title}
                        views_count={product.views_count}
                        model={
                          product.productImage
                            ? product.productImage[0]?.path
                            : ""
                        }
                        votes={product.productLike.length}
                        old_price={product.old_price}
                        price={String(product.price * multiplier)}
                        mark={4.5}
                        subTitle={product.sku}
                        product_id={product._id}
                      />
                    </Box>
                  </Grid>
                ))}
            </Grid>
            {openModelState && productData[selectedItem] && (
              <Grid
                id="model-view"
                sx={{
                  width: "100%",
                  height: "auto",
                  mt: 5,
                  mb: 5,
                  borderBlock: "1px solid",
                  borderColor: "#262626",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EvoTypography
                      sx={{
                        display: "flex",
                        color: theme.palette.fontColor?.light,
                      }}
                    >
                      {t("model_view")}&nbsp;-
                    </EvoTypography>
                    <EvoTypography color="#f34a4a" ml={1}>
                      {productData[selectedItem].title}
                    </EvoTypography>
                  </Box>
                  <IconButton
                    onClick={closeModelView}
                    sx={{
                      color: theme.palette.fontColor?.light,
                      backgroundColor: "transparent !important",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <EvoTypography color={theme.palette.fontColor?.light}>
                      {t("close")}
                    </EvoTypography>
                  </IconButton>
                </Grid>
                <Grid
                  sx={{
                    paddingBlockEnd: 5,
                    paddingInline: { lg: "250px", md: "200px", xs: "auto" },
                  }}
                >
                  <ProductViewComponent
                    product={productData[selectedItem]}
                    multiplier={multiplier}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={closeModelView}
                    sx={{
                      color: theme.palette.fontColor?.light,
                      backgroundColor: "transparent !important",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <EvoTypography color={theme.palette.fontColor?.light}>
                      {t("close")}
                    </EvoTypography>
                  </IconButton>
                </Grid>
              </Grid>
            )}
            {productData_2.length > 0 && (
              <Grid
                display="grid"
                sx={{
                  gridTemplateColumns: {
                    bsx: "repeat(auto-fill, minmax(230px, 1fr))",
                    xs: "repeat(auto-fill, minmax(250px, 1fr))",
                  },
                  gridGap: { md: "20px", xs: "15px" },
                  marginTop: 2,
                }}
              >
                {productData_2.map((product: any, index: number) => (
                  <Grid
                    key={product.title + index}
                    sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}
                  >
                    <Box
                      onClick={() => openProductView(splitCount + index)}
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        fontFamily: "Urbanist",
                        textTransform: "capitalize",
                        p: 0,
                      }}
                    >
                      <FashionModelCard
                        title={product.title}
                        views_count={product.views_count}
                        model={
                          product.productImage
                            ? product.productImage[0]?.path
                            : ""
                        }
                        votes={product.productLike.length}
                        old_price={product.old_price}
                        price={String(product.price * multiplier)}
                        mark={5}
                        subTitle={product.sku}
                        product_id={product._id}
                      />
                    </Box>
                  </Grid>
                  // <FashionModelCard key={product.title+index} title={product.title} status="" model={product.modelSrc} votes={ product.votes } old_price={product.old_price} price={product.new_price} mark={5} subTitle={product.subTitle} />
                ))}
              </Grid>
            )}
          </>
        )}
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBlock: 3,
          }}
        >
          <EvoPagination
            page={filterOpt.page}
            changePage={changePage}
            totalCount={totalProductCount}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
