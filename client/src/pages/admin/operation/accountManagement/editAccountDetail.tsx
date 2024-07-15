import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Page from "../../../../components/Page";
import { Grid } from "@mui/material";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import {
  AccountWrapper,
  EvoTypography,
  FormInput,
} from "../../../../components/styled-components";
import { useNavigate, useParams } from "react-router";
import ProfileEdit from "./components/profileEdit";
import ServiceEdit from "./components/ServiceEdit";
import CompanyEdit from "./components/companyEdit";
import {
  addAssetSkusTo,
  getCompanyEditInfo,
  updateCompanySettings,
} from "../../../../service/companyService";
import {
  getUserByAmin,
  updateUserByAdmin,
} from "../../../../service/admin/userService";
import { toast } from "react-toastify";
import {
  getAssetskus,
  getUserOwnedSkusByAdmin,
} from "../../../../service/productService";
import { getUserOrderInfoByAdmin } from "../../../../service/userService";
import { useDispatch } from "react-redux";
import { setAssetSkusList } from "../../../../reducers/configSlice";

const NavItemList = ["Profile", "Evo Fashion", "CTD", "Evo Expo", "Evo Kit"];

const initUser = {
  email: "",
};

const EditAccountDetail = () => {
  const { edit_id, edit_subject } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");
  const [companyUsers, setCompanyUsers] = React.useState<any>();
  const [userProfile, setUserProfile] = React.useState<any>();
  const [company, setCompany] = React.useState<any>();
  const [editCompany, setEditCompany] = React.useState(
    edit_subject == "company"
  );
  const [page, setPage] = React.useState(1);
  const [skuData, setSkuData] = React.useState<any>();
  const [orderList, setOrderList] = React.useState<any>();
  const [refresh, setRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetch_company = async () => {
      const company_res = await getCompanyEditInfo(edit_id);
      setCompany(company_res);
      setCompanyUsers(company_res.companyUser);
    };
    const fetch_profile = async () => {
      const profile_res = await getUserByAmin(edit_id);
      setUserProfile(profile_res[0]);
    };

    const fetch_assetSkus = async () => {
      const { assetSkus } = await getAssetskus();
      dispatch(setAssetSkusList(assetSkus));
    };
    if (editCompany) {
      fetch_company().catch((err) => {
        console.log(err);
      });
    } else {
      fetch_profile().catch((err) => {
        console.log(err);
      });
    }
    fetch_assetSkus().catch((err) => {
      console.log(err);
    });
  }, [dispatch]);

  React.useEffect(() => {
    const fetch_ownedSkus = async () => {
      const data = {
        type: editCompany ? 2 : 1,
        id: edit_id,
        page: page,
      };
      const res = await getUserOwnedSkusByAdmin(data);
      setSkuData(res);
    };
    fetch_ownedSkus().catch((err) => {
      console.log(err);
    });

    const fetch_order = async () => {
      const res = await getUserOrderInfoByAdmin(edit_id);
      setOrderList(res);
    };

    fetch_order().catch((err) => {
      console.log("fetch order", err);
    });
  }, [refresh]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const addUserField = () => {
    setCompanyUsers([...companyUsers, initUser]);
  };

  const removeField = (index: number) => {
    if (companyUsers.length == 1) {
      return;
    }
    const d_field = [...companyUsers];
    d_field.splice(index, 1);
    setCompanyUsers(d_field);
  };

  const submitProfile = async (updated: any) => {
    await updateUserByAdmin(edit_id, updated).then((res) => {
      if (res) {
        toast.success("User updated by admin");
        navigate(-1);
      } else {
        toast.error("Error occured");
      }
    });
  };

  const submitCompanySettings = async (updated: any) => {
    await updateCompanySettings(updated, edit_id).then((res) => {
      if (res) {
        toast.success("Successfully updated company infomation");
        navigate(-1);
      } else {
        toast.error("Error occured");
      }
    });
  };

  const addSkusToCompany = async (skus: any) => {
    try {
      const type = editCompany == true ? 2 : 1;
      const res = await addAssetSkusTo(skus, type, edit_id);
      if (res.success) {
        toast.success("Successfully added");
        setRefresh(!refresh);
      } else {
        toast.error("Already purchased Sku");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page title="EditAccountDetail">
      <Grid
        sx={{
          marginInline: "auto",
          maxWidth: "1850px",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            mt: 10,
            paddingInline: "15px",
          }}
        >
          <AccountWrapper
            style={{
              minHeight: "100%",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  paddingInline: 5,
                  pt: 3,
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTabs-indicator": { backgroundColor: "#3699ff" },
                  }}
                >
                  {NavItemList.map((item, index) => (
                    <Tab
                      key={index}
                      label={
                        <EvoTypography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "16px",
                            color:
                              Number(value) == index + 1
                                ? "#3699ff"
                                : "#b5b5c3",
                          }}
                        >
                          <LayersRoundedIcon sx={{ mr: 2 }} />
                          {editCompany && index == 0 ? "Company" : item}
                        </EvoTypography>
                      }
                      value={String(index + 1)}
                    />
                  ))}
                </TabList>
              </Box>
              <TabPanel value="1">
                {editCompany && company ? (
                  <CompanyEdit
                    submitCompanySettings={submitCompanySettings}
                    companyUsers={companyUsers}
                    company={company}
                    removeField={removeField}
                    addUserField={addUserField}
                  />
                ) : (
                  userProfile && (
                    <ProfileEdit
                      user={userProfile}
                      submitProfile={submitProfile}
                    />
                  )
                )}
              </TabPanel>
              <TabPanel value="2">
                <ServiceEdit
                  addSkusToCompany={addSkusToCompany}
                  skuData={skuData}
                  orderList={orderList}
                />
              </TabPanel>
              <TabPanel value="3">
                <ServiceEdit />
              </TabPanel>
              <TabPanel value="4">
                <ServiceEdit />
              </TabPanel>
              <TabPanel value="5">
                <ServiceEdit />
              </TabPanel>
            </TabContext>
          </AccountWrapper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default EditAccountDetail;
