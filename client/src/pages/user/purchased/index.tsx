import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Page from "../../../components/Page";
import { EvoTypography } from "../../../components/styled-components";
import { getPurchasedProduct } from "../../../service/productService";
import Product from "../../dashboard/marketplace/product";

const PurchasedProduct = () => {
  const [loadingState, setLoadingState] = useState(true);
  const [productData, setProductData] = useState<any>([]);
  const [totalProductCount, setTotalProductCount] = useState<any>();

  const dispatch = useDispatch();
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  useEffect(() => {
    const fetch_purchased = async () => {
      const products = await getPurchasedProduct();
      setProductData(products);
      setTotalProductCount(products.length);
      setLoadingState(false);
    };

    fetch_purchased().catch((err) => {
      console.log(err);
    });
  }, [dispatch]);

  return (
    <Page title="My Purchased">
      <Grid
        sx={{
          backgroundColor: "#eef0f8",
        }}
      >
        <Grid
          sx={{
            marginInline: { xl: "auto", sm: "30px", xs: "30px" },
            maxWidth: "1500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid sx={{ width: "100%", mt: 10, mb: 5 }}>
            <EvoTypography
              sx={{
                fontSize: "18px",
              }}
            >
              My Purchased
            </EvoTypography>
            {loadingState ? (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#27273c",
                  }}
                />
              </Grid>
            ) : (
              <Product total_count={totalProductCount} products={productData} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default PurchasedProduct;
