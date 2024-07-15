import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeSlice";
import sidebarReducer from "../reducers/sidebarSlice";
import filterOptReducer from "../reducers/filterSlice";
import leftbarReducer from "../reducers/leftbarSlice";
import cartItemReducer from "../reducers/cartItemSlice";
import productReducer from "../reducers/productSlice";
import productOpinionReducer from "../reducers/productOpinionSlice";
import localeReducer from "../reducers/localeSlice";
import accountReducer from "../reducers/accountSlice";
import configReducer from "../reducers/configSlice";
//....

export default configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    filterOpt: filterOptReducer,
    leftbar: leftbarReducer,
    cartItem: cartItemReducer,
    products: productReducer,
    productOpinion: productOpinionReducer,
    locale: localeReducer,
    account: accountReducer,
    config: configReducer,
  },
});
