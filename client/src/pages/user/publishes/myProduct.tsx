import { CircularProgress, Grid, IconButton } from "@mui/material";
import { EvoTypography } from "../../../components/styled-components";
import { getAllProduct } from "../../../service/productService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Product from "../../dashboard/marketplace/product";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setS3Auth } from "../../../reducers/configSlice";

const MyProduct = () => {
  const [productData, setProductData] = useState<any>([]);
  const [totalProductCount, setTotalProductCount] = useState<any>();
  const [loadingState, setLoadingState] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const myFilterOpt = {
      userProduct: true,
      page: "",
      perPage: "",
      type: "",
      filterBy: "",
      sortBy: "price",
      minPrice: "",
      maxPrice: "",
      search: "",
    };

    const fetchData = async () => {
      const { total, products, s3Auth } = await getAllProduct(myFilterOpt);
      dispatch(setS3Auth(s3Auth));
      setTotalProductCount(total);
      setProductData(products);
      setLoadingState(false);
    };

    fetchData().catch((error) => {
      console.log("error in fetching data from backend", error);
    });
  }, [dispatch]);

  return (
    <>
      <EvoTypography
        sx={{
          fontSize: "18px",
        }}
      >
        My Products
      </EvoTypography>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={() => navigate("editProduct/new?create")}
          sx={{
            color: "white",
            backgroundColor: "#4fa116 !important",
            borderRadius: "5px",
            height: "33px",
          }}
        >
          <AddRoundedIcon sx={{ width: "20px" }} />
          <EvoTypography>Add</EvoTypography>
        </IconButton>
      </Grid>
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
        <Product total_count={totalProductCount} products={productData} />
      )}
    </>
  );
};

export default MyProduct;
