import { Divider, Grid, IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Page from "../../../../components/Page";
import {
  AccountWrapper,
  EvoTypography,
  FormInput,
} from "../../../../components/styled-components";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  getPlatforms,
  getTags,
} from "../../../../service/productService";
import EditableButton from "../../../../components/EditableButton";
import AddCategoryDialog from "./dialogs/addCategoryDlg";
import { useSelector } from "react-redux";
import {
  configState,
  setFashionTagList,
} from "../../../../reducers/configSlice";
import { useDispatch } from "react-redux";

const FashionSetting = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [platformSales, setPlatformSales] = useState<any>();
  const [refundDuration, setRefundDuration] = useState<any>();
  const [tags, setTags] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [quickCategories, setQuickCategories] = useState<any>();
  const [platforms, setPlatforms] = useState<any>();
  const [dialogType, setDialogType] = useState(false); // false mean category type
  const [selectedPlatform, setSelectedPlatform] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState<any>();

  const { productCategoryList, fashionTagList } = useSelector(configState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSettings = async () => {
      const { fashionTags } = await getTags();
      dispatch(setFashionTagList(fashionTags));
      setTags(fashionTags);
      const categoriesRes = await getAllCategories();
      setCategories(categoriesRes);
      setQuickCategories(productCategoryList);
      const platformRes = await getPlatforms();
      setPlatforms(platformRes);
    };
    fetchSettings().catch((err) => {
      console.log(err);
    });
  }, [dispatch]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const openAddCategoryDlg = (typeState: boolean) => {
    setSelectedPlatform(null);
    setSelectedCategory(null);
    setDialogType(typeState);
    setOpenDialog(true);
  };

  const openEditCategoryDlg = (typeState: boolean) => {
    setDialogType(typeState);
    setOpenDialog(true);
  };

  const handleAddCategory = (newCategory: any) => {
    const c_categories = [...categories];
    c_categories.push(newCategory);
    setCategories(c_categories);
  };

  const handleEdit = (type: any, index: number) => {
    if (type) {
      setSelectedPlatform(platforms[index]);
      openEditCategoryDlg(true);
    } else {
      setSelectedCategory(categories[index]);
      openEditCategoryDlg(false);
    }
  };

  const handleEditFunc = (type: any, edited: any) => {
    if (type) {
      const c_platforms = [...platforms];
    } else {
    }
  };

  const saveFashionSettings = () => {
    try {
    } catch (error) {}
  };

  return (
    <Page title="Category Management">
      <Grid
        sx={{
          marginInline: "auto",
          maxWidth: "1850px",
        }}
      >
        <Grid sx={{ width: "100%", mt: 10, mb: 5, paddingInline: "15px" }}>
          <AccountWrapper>
            <Grid sx={{ p: 3 }}>
              <EvoTypography sx={{ fontSize: "18px" }}>
                Manage Fashion Settings
              </EvoTypography>
            </Grid>
            <Divider />
            <Grid sx={{ p: 3 }}>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px dashed #dbd5d5",
                  pb: 5,
                  pt: 2,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Platform Sales Share</EvoTypography>
                </Grid>
                <Grid item xs={5}>
                  <FormInput type="number" step={0.01} />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px dashed #dbd5d5",
                  paddingBlock: 5,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Sales Refund Duration</EvoTypography>
                </Grid>
                <Grid item xs={5}>
                  <FormInput type="number" />
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px dashed #dbd5d5",
                  paddingBlock: 5,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Tags</EvoTypography>
                </Grid>
                <Grid item xs={5}>
                  <Stack spacing={3} sx={{ width: "100%" }}>
                    {tags && (
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        options={tags}
                        defaultValue={tags}
                        onChange={(event, value) => setTags(value)}
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                          value.map((option: string, index: number) => (
                            <Chip
                              variant="filled"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
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
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px dashed #dbd5d5",
                  paddingBlock: 5,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Categories</EvoTypography>
                </Grid>
                <Grid item xs={5} sx={{ display: "flex", flexWrap: "wrap" }}>
                  {categories?.map((category: any, index: number) => (
                    <EditableButton
                      key={index}
                      handleEdit={handleEdit}
                      index={index}
                      type={false}
                      category={category}
                    />
                  ))}
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => openAddCategoryDlg(false)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#1bc5bd !important",
                      color: "white",
                      paddingBlock: 1,
                      paddingInline: 1.5,
                      borderRadius: 1,
                    }}
                  >
                    <EvoTypography sx={{ fontSize: "14px" }}>Add</EvoTypography>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px dashed #dbd5d5",
                  paddingBlock: 5,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Quick Categories</EvoTypography>
                </Grid>
                <Grid item xs={5}>
                  <Stack spacing={3} sx={{ width: "100%" }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={productCategoryList}
                      getOptionLabel={(option) => option}
                      defaultValue={[productCategoryList[0]]}
                      filterSelectedOptions
                      onChange={(event, value) => setQuickCategories(value)}
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
              </Grid>
              <Grid
                container
                alignItems={"center"}
                sx={{
                  borderBottom: "1px solid #dbd5d5",
                  paddingBlock: 5,
                }}
              >
                <Grid item xs={4} sx={{ textAlign: "right", mr: 2 }}>
                  <EvoTypography>Platforms</EvoTypography>
                </Grid>
                <Grid item xs={5} sx={{ display: "flex" }}>
                  {platforms?.map((platform: any, index: number) => (
                    <EditableButton
                      key={index}
                      index={index}
                      type={true}
                      handleEdit={handleEdit}
                      category={platform}
                    />
                  ))}
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => openAddCategoryDlg(true)}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#1bc5bd !important",
                      color: "white",
                      paddingBlock: 1,
                      paddingInline: 1.5,
                      borderRadius: 1,
                    }}
                  >
                    <EvoTypography sx={{ fontSize: "14px" }}>Add</EvoTypography>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  pt: 2,
                }}
              >
                <Grid item xs={4}></Grid>
                <Grid item xs={5}></Grid>
                <Grid item>
                  <IconButton
                    onClick={saveFashionSettings}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#3699FF !important",
                      color: "white",
                      paddingBlock: 1,
                      paddingInline: 1,
                      borderRadius: 1,
                      ml: 2,
                    }}
                  >
                    <EvoTypography sx={{ fontSize: "14px", marginInline: 2 }}>
                      Save
                    </EvoTypography>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </AccountWrapper>
        </Grid>
      </Grid>
      <AddCategoryDialog
        category={selectedCategory}
        platform={selectedPlatform}
        handleAddCategory={handleAddCategory}
        handleEditFunc={handleEditFunc}
        openState={openDialog}
        dialogType={dialogType}
        handleHeadAction={closeDialog}
      />
    </Page>
  );
};

export default FashionSetting;
