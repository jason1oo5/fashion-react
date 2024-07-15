import {
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CompanyUserEdit from "./companyUserEdit";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CompanyEdit = (props: any) => {
  const [evoPoint, setEvoPoint] = useState(0);
  const [companyUsers, setCompanyUsers] = useState<any>(
    props.company.companyUser
  );

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const businessRef = useRef<HTMLInputElement>(null);
  const multiplierRef = useRef<HTMLInputElement>(null);
  const evoPointsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let points_value = 0;
    props.company.evopoint.map((point: any) => {
      points_value += point.points;
    });
    setEvoPoint(points_value);
  }, []);

  const addUser = (user: any) => {
    const d_companyUsers = [...companyUsers];
    let multiState = false;
    for (let i = 0; i < d_companyUsers.length; i++) {
      if (user.email == d_companyUsers[i].email) {
        multiState = true;
        break;
      }
    }

    if (multiState) {
      toast.error("Don't repeat email!");
      return;
    }
    d_companyUsers.push({
      email: user.email,
      apply_roles: user.role,
    });

    setCompanyUsers(d_companyUsers);
  };

  const removeField = (index: number) => {
    const d_companyUsers = [...companyUsers];
    d_companyUsers.splice(index, 1);
    setCompanyUsers(d_companyUsers);
    props.removeField(index);
  };

  const submitCompanyEdit = () => {
    const removedUsers = [];
    if (nameRef && multiplierRef && businessRef) {
      for (let i = 0; i < props.company.companyUser.length; i++) {
        for (let k = 0; k < companyUsers.length; k++) {
          if (props.company.companyUser[i].email == companyUsers[k].email) {
            break;
          }
          if (k == companyUsers.length - 1) {
            removedUsers.push(props.company.companyUser[i].email);
          }
        }
      }
      const updated = {
        name: nameRef.current?.value,
        multiplier: multiplierRef.current?.value,
        business_id: businessRef.current?.value,
        companyUsers: companyUsers,
        removedUsers: removedUsers,
      };

      props.submitCompanySettings(updated);
    }
  };

  return (
    <>
      <Grid container alignItems={"center"} rowGap={3}>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Name</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          <FormInput
            ref={nameRef}
            defaultValue={props.company.name}
            style={{ width: "70%" }}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Business ID</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          <FormInput
            ref={businessRef}
            defaultValue={props.company.business_id}
            style={{ width: "70%" }}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Copy of business license</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          <EvoTypography
            sx={{
              fontSize: "13px",
              backgroundColor: "#e1f0ff",
              borderRadius: "5px",
              color: "#3699ff",
              paddingInline: 1,
              ml: 1,
              width: "fit-content",
            }}
          >
            Evo Tech
          </EvoTypography>
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Multiplier</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          <FormInput
            type="number"
            ref={multiplierRef}
            defaultValue={props.company.multiplier}
            style={{ width: "70%" }}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Evo Points</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          <FormInput
            type="number"
            ref={evoPointsRef}
            defaultValue={evoPoint}
            style={{ width: "70%" }}
          />
        </Grid>
      </Grid>
      <Grid container alignItems={"flex-start"} rowGap={3} mt={3} mb={10}>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Company Users</EvoTypography>
        </Grid>
        <Grid item xs={9} sx={{ pl: 3 }}>
          {props.companyUsers?.map((item: any, index: number) => (
            <Grid key={index}>
              <CompanyUserEdit
                user={item}
                removeField={removeField}
                addUser={addUser}
                index={index}
              />
            </Grid>
          ))}
          <Button
            onClick={props.addUserField}
            sx={{
              mt: 1,
              backgroundColor: "#e1f0ff",
            }}
          >
            <AddRoundedIcon sx={{ color: "#3699ff" }} />
            <EvoTypography sx={{ color: "#3699ff" }}>Add</EvoTypography>
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ m: 2 }} />
      <Grid mt={3} ml={3}>
        <Button
          onClick={submitCompanyEdit}
          sx={{
            backgroundColor: "#3699ff !important",
            color: "white",
          }}
        >
          <EvoTypography>Submit</EvoTypography>
        </Button>
        <Button
          onClick={() => navigate(-1)}
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

export default CompanyEdit;
