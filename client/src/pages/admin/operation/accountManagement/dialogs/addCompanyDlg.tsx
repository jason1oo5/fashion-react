import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import { EvoTypography } from "../../../../../components/styled-components";
import { CompanyConfig } from "../../../../../config/navConfig";
import { useSelector } from "react-redux";
import configSlice, { configState } from "../../../../../reducers/configSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function AddCompanyDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<any>();
  const { appUserList } = useSelector(configState);
  let d_company: any = {};

  React.useEffect(() => {
    setOpen(props.openState);
  }, [props.openState]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.handleHeadAction();
  };

  const handleInputChange = (index: number, value: any) => {
    switch (index) {
      case 0:
        d_company.name = value;
        break;
      case 1:
        d_company.multiplier = value;
        break;
      case 2:
        d_company.admin = value;
        break;
    }
  };

  const handleSelectUser = (value: any) => {
    setUsers(value);
  };

  const addNewCompany = () => {
    const company = {
      company: {
        name: d_company.name,
        multiplier: d_company.multiplier,
      },
      admin: d_company.admin,
      users: users,
    };
    props.addNewCompany(company);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <EvoTypography>New Company</EvoTypography>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ maxWidth: "none", overflow: "auto" }}>
          {CompanyConfig.map((item: any, index) => (
            <Grid
              key={item + index}
              container
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: index == 3 ? "flex-start" : "center",
                mt: 1,
              }}
            >
              <Grid item md={4}>
                <EvoTypography>{item}</EvoTypography>
              </Grid>
              <Grid item md={8} sx={{ width: { xs: "100%" } }}>
                {index == 3 ? (
                  <Stack spacing={3} sx={{ width: "100%" }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={appUserList ?? ["No options"]}
                      // getOptionLabel={(option) => option}
                      defaultValue={[]}
                      filterSelectedOptions
                      onChange={(event, value) => handleSelectUser(value)}
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
                ) : (
                  <TextField
                    type={index == 1 ? "number" : "text"}
                    variant="outlined"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder={item}
                    sx={{
                      width: "100%",
                      "& input": {
                        paddingInlineStart: "25px",
                        height: "15px",
                        width: "600px",
                      },
                    }}
                  />
                )}
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ backgroundColor: "#F3F6F9" }}
          >
            <EvoTypography textTransform="capitalize" color="#3699FF">
              Cancel
            </EvoTypography>
          </Button>
          <Button
            autoFocus
            onClick={addNewCompany}
            sx={{ backgroundColor: "#1BC5BD !important" }}
          >
            <EvoTypography textTransform="capitalize" color="white">
              Apply
            </EvoTypography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
