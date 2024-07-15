import { Divider, Grid, IconButton, setRef } from "@mui/material";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import Page from "../../../../components/Page";
import { useEffect, useState } from "react";
import UserTable from "./tables/UserTable";
import NewUserDialog from "./dialogs/newUserDlg";
import {
  deleteUserByAdmin,
  getAllUserInfo,
} from "../../../../service/admin/userService";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_users = async () => {
      const res = await getAllUserInfo();
      setUsers(res);
    };

    fetch_users().catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddUserDlg = () => {
    setOpenDialog(true);
  };

  const deleteUser = async (id: number) => {
    await deleteUserByAdmin(id)
      .then((res) => {
        if (res) {
          toast.success("User Deleted By Admin");
          setRefresh(!refresh);
        } else {
          toast.error("Error occured");
        }
      })
      .catch((err) => {
        toast.error("Error occured");
      });
  };

  return (
    <Page title="User Management">
      <Grid
        sx={{
          maxWidth: "1850px",
          marginInline: "auto",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            mt: 10,
            mb: 5,
            paddingInline: "15px",
          }}
        >
          <AccountWrapper>
            <Grid
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid>
                <EvoTypography sx={{ fontSize: "18px" }}>Users</EvoTypography>
                <EvoTypography sx={{ fontSize: "12px" }}>
                  Manage user information and their orders
                </EvoTypography>
              </Grid>
              <Grid>
                <IconButton
                  onClick={openAddUserDlg}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3699FF !important",
                    color: "white",
                    paddingBlock: 1,
                    paddingInline: 1,
                    borderRadius: 1,
                  }}
                >
                  <QueueRoundedIcon />
                  <EvoTypography sx={{ fontSize: "14px", ml: 1 }}>
                    New User
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <UserTable users={users} deleteUser={deleteUser} />
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <NewUserDialog openState={openDialog} handleHeadAction={closeDialog} />
    </Page>
  );
};

export default UserManagement;
