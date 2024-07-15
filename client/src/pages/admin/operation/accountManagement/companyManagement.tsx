import { Divider, Grid, IconButton } from "@mui/material";
import QueueRoundedIcon from "@mui/icons-material/QueueRounded";
import { useEffect, useState } from "react";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
} from "../../../../components/styled-components";
import { AdminTableData } from "../../../../config/mock";
import CompanyTable from "./tables/CompanyTable";
import {
  addNewCompanyByAdmin,
  deleteCompanyByAdmin,
  getCompanyInfo,
} from "../../../../service/companyService";
import { toast } from "react-toastify";
import AddCompanyDialog from "./dialogs/addCompanyDlg";

const CompanyManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [companies, setCompanies] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch_companies = async () => {
      const res = await getCompanyInfo();
      setCompanies(res);
    };

    fetch_companies().catch((err) => {
      console.log(err);
    });
  }, [refresh]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddCompanyDlg = () => {
    setOpenDialog(true);
  };

  const deleteCompany = async (id: number) => {
    await deleteCompanyByAdmin(id).then((res) => {
      if (res) {
        toast.success("Company deleted by admin");
        setRefresh(!refresh);
      } else {
        toast.error("Error occured");
      }
    });
  };

  const addNewCompany = async (company: any) => {
    await addNewCompanyByAdmin(company).then((res) => {
      if (res) {
        toast.success(company.name + "added successfully");
        setOpenDialog(false);
        setRefresh(!refresh);
      } else {
        toast.error("Error occured");
      }
    });
  };

  return (
    <Page title="Orders History">
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
              <EvoTypography sx={{ fontSize: "18px" }}>Companies</EvoTypography>
              <Grid>
                <IconButton
                  onClick={openAddCompanyDlg}
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
                    Add New Company
                  </EvoTypography>
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <CompanyTable
                tableData={companies}
                deleteCompany={deleteCompany}
              />
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddCompanyDialog
        openState={openDialog}
        handleHeadAction={closeDialog}
        addNewCompany={addNewCompany}
      />
    </Page>
  );
};

export default CompanyManagement;
