import { Divider, Grid, IconButton, styled } from "@mui/material";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import UserRoleTable from "./tables/UserRoleTable";
import AddRoleDialog from "./dialogs/addRoleDlg";
import { useEffect, useState } from "react";
import {
  addRole,
  deleteRole,
  getAllPermissions,
  getRoleData,
} from "../../../../service/admin/roleService";
import { toast } from "react-toastify";

const UserRole = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [roleData, setRoleData] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRoleData = async () => {
      await getAllPermissions();
      const res_roleData = await getRoleData();
      setRoleData(res_roleData);
    };

    fetchRoleData().catch((error) => {
      console.log("role data", error);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddRoleDlg = () => {
    setOpenDialog(true);
  };

  const addNewRole = async (newRole: any) => {
    try {
      await addRole(newRole);
      toast.success("New Role added");
      setRefresh(!refresh);
      closeDialog();
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const deleteRoleFunc = async (delete_id: number) => {
    try {
      await deleteRole(delete_id);
      setRefresh(!refresh);
      toast.success("Role has been deleted");
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <Page title="User Role">
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
                <EvoTypography sx={{ fontSize: "18px" }}>
                  Manage User Roles
                </EvoTypography>
                <EvoTypography sx={{ fontSize: "12px" }}>
                  Roles is the permission level of users
                </EvoTypography>
              </Grid>
              <Grid>
                <IconButton
                  onClick={openAddRoleDlg}
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
                    Add Role
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <UserRoleTable
                deleteRoleFunc={deleteRoleFunc}
                tableData={roleData}
              />
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddRoleDialog
        addNewRole={addNewRole}
        openState={openDialog}
        handleHeadAction={closeDialog}
      />
    </Page>
  );
};

export default UserRole;
