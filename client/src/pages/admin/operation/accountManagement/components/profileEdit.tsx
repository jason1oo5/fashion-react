import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  EvoTypography,
  FormInput,
} from "../../../../../components/styled-components";
import { Gender, Locale, UserStatus } from "../../../../../config/navConfig";
import MenuSelect from "../../../../../components/select/MenuSelect";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useSelector } from "react-redux";
import { configState } from "../../../../../reducers/configSlice";

const CompanyRoles = ["Owner", "Editor", "Fashion publisher"];

const ProfileEdit = (props: any) => {
  const [role, setRole] = useState(props.user.account_type);
  const [evoPoints, setEvoPoints] = useState<any>(0);
  const [pwdChanged, setPwdChanged] = useState(false);
  const [editStatus, setEditStatus] = useState(0);
  const { s3Auth } = useSelector(configState);

  const handleSelectRoles = (value: any) => {
    setRole(CompanyRoles.indexOf(value[0]));
  };

  const handleProfile = (id: any, index: any) => {
    if (id == "editStatus") {
      setEditStatus(index);
    }
  };

  const submitProfile = () => {
    const updated = {
      acting_as: role,
      status: editStatus,
      pwdChanged: pwdChanged,
    };

    props.submitProfile(updated);
  };

  return (
    <>
      <Grid container mt={5} mb={6} alignItems={"center"} rowGap={3}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>{"Aavatar"}</EvoTypography>
          <EvoTypography>(Max filesize 64k)</EvoTypography>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", alignItems: "flex-end", pl: 3 }}
        >
          <Box sx={{ height: "105px", marginTop: "-25px" }}>
            {props.user?.avatar ? (
              <img
                src={`${
                  process.env.REACT_APP_S3BASEURL +
                  props.user.avatar +
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
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Email</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            disabled
            defaultValue={props.user.email}
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Company</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput disabled sx={{ maxWidth: "500px" }} />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Roles</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <Stack spacing={3} sx={{ maxWidth: "535px" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={CompanyRoles ?? ["No options"]}
              // getOptionLabel={(option) => option}
              defaultValue={[CompanyRoles[props.user.account_type]]}
              filterSelectedOptions
              onChange={(event, value) => handleSelectRoles(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& div": {
                      padding: "3px !important",
                      borderRadius: "3px",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </Grid>

        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Locale</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <MenuSelect
            id="editUser"
            handleProfile={handleProfile}
            default={props.user.locale}
            menuItems={Locale}
            type="profile"
            maxWidth="535px"
            width="full"
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Status</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <MenuSelect
            id="editUser"
            handleProfile={handleProfile}
            default={props.user ? UserStatus[props.user.status] : UserStatus[1]}
            menuItems={UserStatus}
            type="profile"
            maxWidth="535px"
            width="full"
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Reset Password</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3, display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setPwdChanged(true)}
            sx={{
              backgroundColor: "#3699ff !important",
              color: "white",
              mr: 1,
            }}
          >
            <EvoTypography>Reset Password - (12345678)</EvoTypography>
          </Button>
          <Collapse in={pwdChanged}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setPwdChanged(false);
                  }}
                >
                  <EvoTypography>
                    Password will be reset after submission.
                  </EvoTypography>
                </IconButton>
              }
            ></Alert>
          </Collapse>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Display name</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            defaultValue={props.user.name}
            disabled
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Phone</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            defaultValue={props.user.phone}
            disabled
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Gender</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            defaultValue={Gender[props.user.gender]}
            disabled
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Address</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            defaultValue={props.user.address}
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Evo Points</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput
            onChange={(e) => setEvoPoints(e.target.value)}
            defaultValue={props.user.evopoint[0].points}
            type="number"
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ m: 2 }} />
      <Grid mt={3} ml={3}>
        <Button
          onClick={submitProfile}
          sx={{
            backgroundColor: "#3699ff !important",
            color: "white",
          }}
        >
          <EvoTypography>Submit</EvoTypography>
        </Button>
        <Button
          sx={{
            ml: 1,
            backgroundColor: "#e4e6ef",
            color: "#3f4254",
          }}
        >
          <EvoTypography>Cancel</EvoTypography>
        </Button>
      </Grid>
    </>
  );
};

export default ProfileEdit;
