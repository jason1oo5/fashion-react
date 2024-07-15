import { createSlice } from "@reduxjs/toolkit";
import { ConfigType } from "../config/interface";

const initialState: ConfigType = {
  productCategoryList: [],
  platformList: [],
  fashionTagList: [],
  assetSkusList: [],
  appUserList: [],
  s3Auth: {
    s3ApiUrl: "",
    authorizationToken: "",
  },
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setProductCategoryList(state, action) {
      state.productCategoryList = action.payload;
    },
    setPlatformList(state, action) {
      state.platformList = action.payload;
    },
    setFashionTagList(state, action) {
      state.fashionTagList = action.payload;
    },
    setAssetSkusList(state, action) {
      state.assetSkusList = action.payload;
    },
    setAppUserList(state, action) {
      state.appUserList = action.payload;
    },
    setS3Auth(state, action) {
      state.s3Auth = action.payload;
    },
  },
});

export const {
  setProductCategoryList,
  setPlatformList,
  setFashionTagList,
  setAssetSkusList,
  setAppUserList,
  setS3Auth,
} = configSlice.actions;

export const configState = (state: { config: ConfigType }) => state.config;
export default configSlice.reducer;
