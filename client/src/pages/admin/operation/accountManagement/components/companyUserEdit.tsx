import {
  Autocomplete,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import { useSelector } from "react-redux";
import { configState } from "../../../../../reducers/configSlice";

const CompanyRoles = ["super admin", "Owner", "Editor", "Fashion publisher"];

const CompanyUserEdit = (props: any) => {
  const [user, setUser] = useState<any>();
  const { appUserList } = useSelector(configState);

  const handleSelect = (key: any, value: any) => {
    if (key == "role") {
      value = [CompanyRoles.indexOf(value[0])];
    }
    const d_user = {
      ...user,
      [key]: value[0],
    };
    setUser(d_user);
    if (d_user.email && d_user.role >= 0) {
      alert(0);
      props.addUser(d_user);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} sx={{ width: "30%" }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={appUserList ?? ["No options"]}
          // getOptionLabel={(option) => option}
          defaultValue={props.user.email ? [props.user.email] : []}
          filterSelectedOptions
          onChange={(event, value) => handleSelect("email", value)}
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
      <Stack spacing={3} sx={{ width: "30%", pl: 2 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={CompanyRoles ?? ["No options"]}
          getOptionLabel={(option) => option}
          defaultValue={
            props.user.apply_roles >= 0
              ? [CompanyRoles[props.user.apply_roles]]
              : []
          }
          filterSelectedOptions
          onChange={(event, value) => handleSelect("role", value)}
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
      <IconButton
        onClick={() => props.removeField(props.index)}
        sx={{ ml: 5, color: "#eb6565" }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Grid>
  );
};

export default CompanyUserEdit;
