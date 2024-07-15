import { Divider, Grid, IconButton } from "@mui/material";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShowcaseTable from "./tables/showcaseTable";
import AddShowcaseDialog from "./dialogs/showcaseDlg";
import {
  addShowcase,
  deleteShowcase,
  getShowcase,
} from "../../../../service/admin/showcaseService";

const ShowcaseManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showcase, setShowcase] = useState<any>();
  const [selectedShowcase, setSelectedShowcase] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_showcase = async () => {
      const res = await getShowcase("all");
      setShowcase(res);
    };

    fetch_showcase().catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddShowcaseDlg = () => {
    setSelectedShowcase(null);
    setOpenDialog(true);
  };

  const handleDeleteShowcase = async (del_id: string) => {
    try {      
      await deleteShowcase(del_id);
      closeDialog();
      toast.success("Deleted showcase successfully");
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleEditShowcase = (edit_showcase: any) => {
    setSelectedShowcase(edit_showcase);
    setOpenDialog(true);
  };

  const handleUpdateShowcase = async (update_showcase: any) => {
    try {
      // await updateShowcase(update_showcase);
      toast.success("Updated showcase successfully");
      closeDialog();
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleAddShowcase = async (new_showcase: any) => {
    try {
      await addShowcase(new_showcase);
      toast.success("Updated showcase successfully");
      setRefresh(!refresh);
      closeDialog();
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <Page title="Showcase Management">
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
              <Grid>
                <EvoTypography sx={{ fontSize: "18px" }}>
                  Showcase
                </EvoTypography>
                <EvoTypography sx={{ fontSize: "12px" }}>
                  Manage EvoFashion Showcase
                </EvoTypography>
              </Grid>
              <Grid>
                <IconButton
                  onClick={openAddShowcaseDlg}
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
                    Add Showcase
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <ShowcaseTable
                handleEditShowcase={handleEditShowcase}
                handleDeleteShowcase={handleDeleteShowcase}
                tData={showcase}
              />
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddShowcaseDialog
        selectedShowcase={selectedShowcase}
        handleUpdateShowcase={handleUpdateShowcase}
        handleAddShowcase={handleAddShowcase}
        openState={openDialog}
        handleHeadAction={closeDialog}
      />
    </Page>
  );
};

export default ShowcaseManagement;
