import { Divider, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import {
  createDataSet,
  deleteDataSet,
  getDataSet,
} from "../../../../service/admin/dataSetService";
import DataSetDialog from "./dialogs/dataSetDlg";
import DataSetTable from "./tables/dataSetTable";

const tData = [
  {
    id: 1,
    name: "Trial",
    items: 23,
  },
];

const UserDataSet = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataSet, setDataSet] = useState<any>();
  const [selectedDataSet, setSelectedDataSet] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_data_set = async () => {
      const res = await getDataSet(0);
      setDataSet(res);
    };

    fetch_data_set().catch((error) => {
      console.log("setDataSet error", error);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openDataSetDlg = () => {
    setSelectedDataSet(null);
    setOpenDialog(true);
  };

  const handleSubmitDataSet = async (newDataSet: any) => {
    try {
      await createDataSet(0, newDataSet);
      setRefresh(!refresh);
      toast.success("Data Set added successfully");
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const delDataSet = async (delete_id: number) => {
    try {
      await deleteDataSet(delete_id);
      setRefresh(!refresh);
      toast.success("Data set deleted");
    } catch (error) {
      toast.success("Error occured");
    }
  };

  const openDataSetView = (selectedDataSet: any) => {
    setSelectedDataSet(selectedDataSet);
    setOpenDialog(true);
  };

  return (
    <Page title="Data Set">
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
                User Data Sets
              </EvoTypography>
              <Grid>
                <IconButton
                  onClick={openDataSetDlg}
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
                  <EvoTypography sx={{ fontSize: "14px", ml: 1 }}>
                    Add data set
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <Grid>
                <DataSetTable
                  openDataSetView={openDataSetView}
                  delDataSet={delDataSet}
                  tData={dataSet ? dataSet[1] : []}
                />
              </Grid>
              <Grid mt={5}>
                <DataSetTable
                  openDataSetView={openDataSetView}
                  delDataSet={delDataSet}
                  tData={dataSet ? dataSet[2] : []}
                />
              </Grid>
              <Grid mt={5}>
                <DataSetTable
                  openDataSetView={openDataSetView}
                  delDataSet={delDataSet}
                  tData={dataSet ? dataSet[3] : []}
                />
              </Grid>
              <Grid mt={5}>
                <DataSetTable
                  openDataSetView={openDataSetView}
                  delDataSet={delDataSet}
                  tData={dataSet ? dataSet[4] : []}
                />
              </Grid>
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <DataSetDialog
        selectedDataSet={selectedDataSet}
        openState={openDialog}
        handleHeadAction={closeDialog}
        handleSubmitDataSet={handleSubmitDataSet}
      />
    </Page>
  );
};
export default UserDataSet;
