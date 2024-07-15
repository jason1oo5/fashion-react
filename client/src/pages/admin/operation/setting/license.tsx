import { Divider, Grid, IconButton, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Page from "../../../../components/Page";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import LicenseTable from "./tables/licenseTable";
import AddLicenseDialog from "./dialogs/addLicenseDlg";
import {
  addLicense,
  deleteLicense,
  getLicense,
  updateLicense,
} from "../../../../service/admin/license";
import { toast } from "react-toastify";

const License = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [licesnes, setLicenses] = useState<any>();
  const [selectedLicense, setSelectedLicense] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_licenses = async () => {
      const res = await getLicense();
      setLicenses(res);
    };

    fetch_licenses().catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddLicenseDlg = () => {
    setSelectedLicense(null);
    setOpenDialog(true);
  };

  const addNewLicense = async (newLicense: any) => {
    try {
      await addLicense(newLicense);
      toast.success("New license added successfully");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleEditLicense = (editLicense: any) => {
    setSelectedLicense(editLicense);
    setOpenDialog(true);
  };

  const handleUpdateLicense = async (update_license: any) => {
    try {
      await updateLicense(update_license);
      toast.success("Updated successfully");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleDeleteLicense = async (del_id: number) => {
    try {
      await deleteLicense(del_id);
      toast.success("Deleted successfully");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <Page title="User Role">
      <Grid
        sx={{
          marginInline: "auto",
          maxWidth: "1850px",
        }}
      >
        <Grid sx={{ width: "100%", mt: 10, mb: 5, paddingInline: "15px" }}>
          <AccountWrapper>
            <Grid
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <EvoTypography sx={{ fontSize: "18px", fontWeight: 600 }}>
                Licenses
              </EvoTypography>
              <Grid>
                <IconButton
                  onClick={openAddLicenseDlg}
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
                    Add License
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <Grid>
                <LicenseTable
                  handleEditLicense={handleEditLicense}
                  handleDeleteLicense={handleDeleteLicense}
                  tData={licesnes ? licesnes[1] : []}
                />
              </Grid>
              <Grid mt={5}>
                <LicenseTable
                  handleEditLicense={handleEditLicense}
                  handleDeleteLicense={handleDeleteLicense}
                  tData={licesnes ? licesnes[2] : []}
                />
              </Grid>
              <Grid mt={5}>
                <LicenseTable
                  handleEditLicense={handleEditLicense}
                  handleDeleteLicense={handleDeleteLicense}
                  tData={licesnes ? licesnes[3] : []}
                />
              </Grid>
              <Grid mt={5}>
                <LicenseTable
                  handleEditLicense={handleEditLicense}
                  handleDeleteLicense={handleDeleteLicense}
                  tData={licesnes ? licesnes[4] : []}
                />
              </Grid>
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddLicenseDialog
        selectedLicense={selectedLicense}
        addNewLicense={addNewLicense}
        openState={openDialog}
        handleUpdateLicense={handleUpdateLicense}
        handleHeadAction={closeDialog}
      />
    </Page>
  );
};

export default License;
