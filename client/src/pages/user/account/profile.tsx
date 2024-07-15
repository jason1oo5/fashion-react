import { Box, Grid, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AccountHeader from "../../../components/AccountHeader";
import FileInput from "../../../components/FileInput";
import MenuSelect from "../../../components/select/MenuSelect";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { EvoTypography } from "../../../components/styled-components";
import {
  AccountHeaderContent,
  Gender,
  Locale,
  ProfileList,
} from "../../../config/navConfig";
import EvoImgLoader from "../../../components/image-crop/ImgLoader";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../service/userService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { configState } from "../../../reducers/configSlice";

const Profile = () => {
  const { t } = useTranslation();
  const [imgPreview, setImgPreview] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [profile, setProfile] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [arrayUser, setArrayUser] = useState<any>();
  const { s3Auth } = useSelector(configState);  
  const accountState = useSelector((state: any) => state.account.accountState);
  const userCompaniesState = useSelector((state: any) => state.account.company);

  useEffect(() => {
    const fetch_profile = async () => {
      const d_profile = await getUserProfile();
      const d_arrayUser = [];
      for (const [key, value] of Object.entries(d_profile)) {
        if (key == "avatar") {
          setAvatar(value);
        } else {
          d_arrayUser.push([`${key}`, `${value}`]);
        }
      }
      d_arrayUser.splice(0, 1);
      setArrayUser(d_arrayUser);
      setProfile(d_profile);
    };

    fetch_profile().catch((err) => {
      console.log("fetch_profile", err);
    });
  }, []);

  const openImgLoader = (open: any) => {
    setOpenDialog(open);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleImgUpload = (blog: any, previewUrl: any, imgName: any) => {
    const imgFile = new File([blog], imgName, { type: blog.type });
    setAvatar(imgFile);
    setImgPreview(previewUrl);
  };

  const handleInputChange = (e: any, key: any) => {
    let d_profile: any = { ...profile };
    const inputVal = e.target.value;
    d_profile[key] = inputVal;
    setProfile(d_profile);
  };

  const handleProfile = (idx: any, value: any) => {
    let d_profile: any = { ...profile };
    d_profile[idx] = value;
    setProfile(d_profile);
  };

  const handleHeadAction = async (state: any) => {
    try {
      await updateUserProfile(profile, avatar);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error occured while updating profile");
    }
  };

  return (
    <>
      <Grid
        sx={{
          backgroundColor: "white",
          height: "auto",
          width: "100%",
          borderRadius: "4px",
          boxShadow: "0px 0px 30px 0px rgb(82 63 105 / 30%)",
          ml: 2,
          pb: 3,
          mb: 3,
        }}
      >
        <AccountHeader
          header={AccountHeaderContent[0]}
          handleHeadAction={handleHeadAction}
        />
        <Grid sx={{ p: "15px 30px 10px 30px" }}>
          {accountState.account_type == 1 ? (
            <>
              <Grid
                container
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  mt: 3,
                }}
              >
                <Grid item xs={4}>
                  <EvoTypography>{t("avatar")}</EvoTypography>
                  <EvoTypography>(Max filesize 64k)</EvoTypography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Box sx={{ height: "105px", marginTop: "-25px" }}>
                    {imgPreview ? (
                      <img
                        src={imgPreview}
                        alt="img-preview"
                        style={{ width: "150px", height: "105px" }}
                      />
                    ) : profile ? (
                      <img
                        src={`${
                          process.env.REACT_APP_S3BASEURL +
                          profile.avatar +
                          "?Authorization=" +
                          s3Auth.authorizationToken
                        }`}
                        alt="avatar img"
                        height="100px"
                      />
                    ) : (
                      <img
                        src="/assets/images/page_img/profile-img.svg"
                        alt="default img"
                        height="100px"
                      />
                    )}
                  </Box>
                  <IconButton
                    onClick={openImgLoader}
                    sx={{
                      boxShadow: "0 9px 16px 0 rgba(24,28,50,.3)!important",
                      color: "#b5b5c3",
                      backgroundColor: "#fff",
                      ml: -1.5,
                    }}
                  >
                    <CreateRoundedIcon
                      sx={{
                        width: "15px",
                        height: "auto",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
              {arrayUser?.map((item: any, index: any) => (
                <Grid
                  key={item[0] + index}
                  container
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Grid item xs={4}>
                    <EvoTypography
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {t(item[0].toLowerCase())}
                    </EvoTypography>
                  </Grid>
                  <Grid item xs={8}>
                    {item[0] === "locale" || item[0] === "gender" ? (
                      <MenuSelect
                        id={item[0]}
                        handleProfile={handleProfile}
                        default={
                          item[0] === "locale" ? item[1] : Gender[item[1]]
                        }
                        menuItems={item[0] === "locale" ? Locale : Gender}
                        type="profile"
                        width="full"
                      />
                    ) : (
                      <TextField
                        onChange={(e: any) => handleInputChange(e, item[0])}
                        value={profile[item[0]] ?? "No company"}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={item[0] == "company" ? true : false}
                        placeholder={item[0]}
                        sx={{
                          width: "100%",
                          "& input": {
                            paddingInlineStart: "25px",
                            height: "18px",
                          },
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
              <EvoImgLoader
                handleImgUpload={handleImgUpload}
                openState={openDialog}
                handleHeadAction={closeDialog}
              />
            </>
          ) : (
            <>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <EvoTypography>Display name</EvoTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={
                      userCompaniesState[accountState.companyIdx]?.company[0]
                        .name
                    }
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: "100%",
                      "& input": {
                        paddingInlineStart: "25px",
                        height: "18px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container mt={1} alignItems="center">
                <Grid item xs={4}>
                  <EvoTypography>Business ID</EvoTypography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    value={
                      userCompaniesState[accountState.companyIdx]?.company[0]
                        .business_id
                    }
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: "100%",
                      "& input": {
                        paddingInlineStart: "25px",
                        height: "18px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
