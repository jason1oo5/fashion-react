import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../config/interface";

const initialState: AccountType = {
  user: {
    email: "",
    token: "",
    role: -1,
    name: "",
    avatar: "",
  },
  company: [],
  accountState: {
    companyIdx: 0,
    accountType: 1,
  },
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
    setCompany: (state, actions) => {
      state.company = actions.payload;
    },
    setAccountState: (state, actions) => {
      state.accountState = actions.payload;
    },
  },
});

export const { setUser, setCompany, setAccountState } = AccountSlice.actions;
export const accountState = (state: any) => state.account;

export default AccountSlice.reducer;
