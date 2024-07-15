import { Divider, Grid, IconButton } from "@mui/material";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import TutorialTable from "./tables/tutorialTable";
import { useEffect, useState } from "react";
import AddTutorialDialog from "./dialogs/addTutorialDlg";
import {
  addTutorial,
  deleteTutorial,
  getTutorials,
  updateTutorial,
} from "../../../../service/admin/tutorialService";
import { toast } from "react-toastify";

const TutorialManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tutorials, setTutorials] = useState<any>();
  const [selectedTutorial, setSelectedTutorial] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_tutorils = async () => {
      const res = await getTutorials();
      setTutorials(res);
    };

    fetch_tutorils().catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddTutorialDlg = () => {
    setSelectedTutorial(null);
    setOpenDialog(true);
  };

  const handleDeleteTutorial = async (del_id: number) => {
    try {
      await deleteTutorial(del_id);
      toast.success("Deleted tutorial successfully");
      closeDialog();
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleEditTutorial = (edit_tutorial: any) => {
    setSelectedTutorial(edit_tutorial);
    setOpenDialog(true);
  };

  const handleUpdateTutorial = async (update_tutorial: any) => {
    try {
      await updateTutorial(update_tutorial);
      toast.success("Updated tutorial successfully");
      closeDialog();
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleAddTutorial = async (new_tutorial: any) => {
    try {
      await addTutorial(new_tutorial);
      toast.success("Updated tutorial successfully");
      setRefresh(!refresh);
      closeDialog();
    } catch (error) {
      toast.error("Error occured");
    }
  };

  return (
    <Page title="Tutorial Management">
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
                  Tutorials
                </EvoTypography>
                <EvoTypography sx={{ fontSize: "12px" }}>
                  Manage EvoFashion Tutorials
                </EvoTypography>
              </Grid>
              <Grid>
                <IconButton
                  onClick={openAddTutorialDlg}
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
                    Add Tutorial
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <TutorialTable
                handleEditTutorial={handleEditTutorial}
                handleDeleteTutorial={handleDeleteTutorial}
                tData={tutorials}
              />
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddTutorialDialog
        selectedTutorial={selectedTutorial}
        handleUpdateTutorial={handleUpdateTutorial}
        handleAddTutorial={handleAddTutorial}
        openState={openDialog}
        handleHeadAction={closeDialog}
      />
    </Page>
  );
};

export default TutorialManagement;
