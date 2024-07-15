import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  EvoTypography,
  FormInput,
} from "../../../../../components/styled-components";
import { configState } from "../../../../../reducers/configSlice";
import FashionEditTables from "../tables/FashionEditTables";

const LicenseTypes = ["Trial", "Professional", "Studio"];

const ServiceEdit = (props: any) => {
  const { skuData, orderList } = props;
  const [assetSkus, setAssetSkus] = useState<any>();
  const { assetSkusList } = useSelector(configState);
  const navigate = useNavigate();

  const handleSelectLicense = (value: any) => {};

  const handleSelectSkus = (value: any) => {
    setAssetSkus(value);
  };

  const addSkusToCompany = () => {
    props.addSkusToCompany(assetSkus);
  };

  return (
    <>
      <Grid container alignItems={"center"} rowGap={3}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>License</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <Stack spacing={3} sx={{ width: "64%" }}>
            <Autocomplete
              id="tags-outlined"
              options={LicenseTypes ?? ["No options"]}
              // getOptionLabel={(option) => option}
              defaultValue={""}
              filterSelectedOptions
              onChange={(event, value) => handleSelectLicense(value)}
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
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Karma</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <FormInput type="number" style={{ width: "60%" }} />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "right" }}>
          <EvoTypography>Grant Promotion SKU</EvoTypography>
        </Grid>
        <Grid item xs={8} sx={{ pl: 3 }}>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Stack spacing={3} sx={{ width: "77%" }}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={assetSkusList ?? ["No options"]}
                // getOptionLabel={(option) => option}
                defaultValue={[]}
                filterSelectedOptions
                onChange={(event, value) => handleSelectSkus(value)}
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
            <Button
              onClick={addSkusToCompany}
              sx={{
                backgroundColor: "#1bc5bd !important",
                paddingBlock: 1.4,
                ml: 1,
              }}
            >
              <EvoTypography
                sx={{
                  color: "white",
                }}
              >
                Add
              </EvoTypography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid mt={2}>
        <FashionEditTables skuData={skuData} orderList={orderList} />
      </Grid>
      <Divider sx={{ m: 2 }} />
      <Grid mt={3} ml={3}>
        <Button
          onClick={() => navigate(-1)}
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

export default ServiceEdit;
