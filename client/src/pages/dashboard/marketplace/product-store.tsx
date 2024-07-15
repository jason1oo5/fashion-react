import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { filterOptState } from "../../../reducers/filterSlice";
import { productState, setProducts } from "../../../reducers/productSlice";
import { getAllProduct } from "../../../service/productService";
import Product from "./product";
import ModelView from "../../../components/model-details/modelView";
import MarketplaceNavbar from "../../../components/market-navbar";
import LoopSlider from "../../../components/LoopSlider";
import { getShowcase } from "../../../service/admin/showcaseService";
import { setS3Auth } from "../../../reducers/configSlice";

const CarouselWrapper = styled("div")(() => ({
  marginTop: "30px",
}));

export default function ProductStore() {
  const filterOption = useSelector(filterOptState);
  const productData = useSelector(productState);
  const [showcase, setShowcase] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useDispatch();

  const [totalProductCount, setTotalProductCount] = useState<any>();

  useEffect(() => {
    setLoading(true);
    const fetch_showcase = async () => {
      const res = await getShowcase("active");
      setShowcase(res);
    };
    const fetchData = async () => {
      fetch_showcase().catch((err) => {
        console.log(err);
      });
      const { total, products, s3Auth } = await getAllProduct(filterOption);
      dispatch(setS3Auth(s3Auth));
      setTotalProductCount(total);
      dispatch(setProducts(products));
      setLoading(false);
    };

    fetchData().catch((error) => {
      console.log("error in fetching data from backend", error);
    });
  }, [filterOption, dispatch]);

  return (
    <>
      <CarouselWrapper>
        <ModelView />
      </CarouselWrapper>
      <MarketplaceNavbar />
      <Grid sx={{ width: "100%" }}>
        <Grid mt={3}>
          <LoopSlider sliderImg={showcase} />
          {/* <Grid sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}> */}
          {/* <ShowCaseModelCard title="" type="" model={""} price="" /> */}

          {/* </Grid> */}
          {/* <Grid sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}>
            <ShowCaseModelCard title="" type="" model={""} price="" />
          </Grid>
          <Grid sx={{ maxWidth: "100%", flex: "0 0 100%", width: "100%" }}>
            <ShowCaseModelCard title="" type="" model={""} price="" />
          </Grid> */}
        </Grid>
      </Grid>
      {loading ? (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress sx={{ color: "#27273c" }} />
        </Grid>
      ) : (
        <Product total_count={totalProductCount} products={productData} />
      )}
    </>
  );
}
