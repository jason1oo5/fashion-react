import { Divider, Grid, IconButton } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CloseIcon from "@mui/icons-material/Close";
import { EvoTypography } from "../styled-components";
import { deleteCartItem } from "../../service/cartService";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../reducers/cartItemSlice";
import { configState } from "../../reducers/configSlice";

const CartItem = (props: any) => {
  const { itemData, multiplier } = props;
  const dispatch = useDispatch();
  const { s3Auth } = useSelector(configState);

  const handleDeleteCartItem = async () => {
    try {
      const res = await deleteCartItem(itemData.id);
      dispatch(setCartItem(res));
    } catch (error) {}
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 2.5,
          paddingBlock: 0.5,
        }}
      >
        <Grid item xs={7}>
          <IconButton sx={{ p: 0 }}>
            <EvoTypography sx={{ color: "#3f4254" }}>
              {itemData.product[0].title}
            </EvoTypography>
          </IconButton>
          <EvoTypography sx={{ color: "#b5b5c3" }}>
            {itemData.product[0].sku}
          </EvoTypography>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <PersonRoundedIcon sx={{ color: "#1bc5bd" }} />
              <EvoTypography sx={{ color: "#1bc5bd", ml: 0.5 }}>
                ${itemData.product[0].price * multiplier}
              </EvoTypography>
            </Grid>
            <IconButton
              onClick={handleDeleteCartItem}
              sx={{ color: "#81a19f" }}
            >
              <CloseIcon sx={{ width: "18px", height: "auto" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <img
            src={
              process.env.REACT_APP_S3BASEURL +
              itemData.productImage[0].path +
              "?Authorization=" +
              s3Auth.authorizationToken
            }
            width={"65px"}
            height={"65px"}
            alt={itemData.product[0].title}
            loading="lazy"
            style={{
              borderRadius: "3px",
              float: "right",
            }}
          />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default CartItem;
