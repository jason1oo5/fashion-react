import { Box, Divider, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GalleryDropzone from "../../../components/GalleryDropzone";
import ProductEditHeader from "../../../components/ProductEditHeader";
import {
  EvoTypography,
  FormInput,
} from "../../../components/styled-components";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProductConfig } from "../../../config/navConfig";
import MenuSelect from "../../../components/select/MenuSelect";
import AddPlatform from "../../../components/AddPlatform";
import EvoImgLoader from "../../../components/image-crop/ImgLoader";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import MultiSelector from "../../../components/select/MultiSelector";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  addProduct,
  addProductFile,
  deleteProduct,
  getProductDetailById,
  updateProduct,
} from "../../../service/productService";
import { toast } from "react-toastify";
import { Validation_data } from "../../../config/interface";
import { useValidator } from "../../../hooks/useValidator";
import { Editor } from "../../../config/ReactQuill";
import { useSelector } from "react-redux";
import { configState } from "../../../reducers/configSlice";

const ProductEditWrapper = styled(Grid)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  borderRadius: 5,
  boxShadow: "0 0 30px 0 rgb(82 63 105 / 30%)",
  backgroundColor: "white",
}));

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product_id } = useParams();
  const { appUserList } = useSelector(configState);

  const [product, setProduct] = useState<any>();
  const [imgData, setImgData] = useState<any>();
  const [mainImg, setMainImg] = useState<any>();
  const [platformList, setPlatformList] = useState<any>([{}]);
  const [platformData, setPlatformData] = useState<any>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [getState, setGetState] = useState(false);
  const [productImageData, setProductImageData] = useState<any>();
  const search_param = location.search.substr(1, location.search.length);

  const { productCategoryList, fashionTagList, s3Auth } =
    useSelector(configState);

  useEffect(() => {
    const fetch_product_detail = async () => {
      if (product_id) {
        const product_detail: any = await getProductDetailById(product_id);
        const productMainImg =
          process.env.REACT_APP_S3BASEURL +
          product_detail.productImage[0].path +
          "?Authorization=" +
          s3Auth.authorizationToken;
        setImgPreview(productMainImg);
        const d_productImgList: any = [];
        await Promise.all(
          product_detail.productImage.map((img: any) => {
            const d_img =
              process.env.REACT_APP_S3BASEURL +
              img.path +
              "?Authorization=" +
              s3Auth.authorizationToken;
            d_productImgList.push({ preview: d_img });
          })
        );
        // console.log("product detail", product_detail);
        setProductImageData(d_productImgList);
        const tagList = product_detail.tags
          ? product_detail.tags.split(",")
          : [];
        Object.assign(product_detail, {
          publisher: [product_detail.publisher[0].email],
          tags: tagList,
        });
        setProduct(product_detail);
        setPlatformList(product_detail.fashionProductFile);
      }
    };
    if (search_param == "edit") {
      fetch_product_detail().catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const addPlatformList = () => {
    setGetState(true);
    setPlatformList([...platformList, platformList.length]);
  };

  const removePlatform = (index: number) => {
    const arr = [...platformList];
    arr.splice(index, 1);
    setPlatformList(arr);
  };

  const handleAssetChange = (assets: any) => {
    const d_product = { ...product };
    Object.assign(d_product, { fashionAssetSkus: assets });
    setProduct(d_product);
  };

  const handlePublisher = (publisher: any) => {
    const d_product = { ...product };
    Object.assign(d_product, { publisher: publisher });
    setProduct(d_product);
  };

  const handleLabel = (label: any) => {
    const d_product = { ...product };
    Object.assign(d_product, { tags: label });
    setProduct(d_product);
  };

  const handleCategory = (category: any) => {
    const d_product = { ...product };
    Object.assign(d_product, { category_id: category });
    setProduct(d_product);
  };

  const handlePublicState = (pub_state: any) => {
    const d_product = { ...product };
    Object.assign(d_product, { public: pub_state });
    setProduct(d_product);
  };

  const handlePlatformData = (data: any) => {
    if (data.file) {
      setPlatformData([...platformData, data.file]);
      setGetState(false);
    } else {
      return toast.error("You should select the file correctly.");
    }
  };

  const handleInputChange = (value: any, index: number) => {
    const d_product = { ...product };
    if (index == 0) {
      Object.assign(d_product, { title: value });
    } else if (index == 1) {
      Object.assign(d_product, { sku: value });
    } else if (index == 3) {
      Object.assign(d_product, { price: value });
    }
    setProduct(d_product);
  };

  const onDescriptionChange = (e: any) => {
    if (product) {
      const d_product = { ...product };
      Object.assign(d_product, { description: e });
      setProduct(d_product);
    }
  };

  const openImgLoader = (open: any) => {
    setOpenDialog(!openDialog);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleImgUpload = async (blog: any, previewUrl: any) => {
    const file = new File([blog], previewUrl, { type: blog.type });
    setMainImg(file);
    setImgPreview(previewUrl);
  };

  const handleImgData = (files: any) => {
    setImgData(files);
  };

  const checkValidation = async () => {
    const validation_data: Validation_data[] = [
      {
        input: product?.title ?? "",
        type: "title",
        inputReg: {
          min: 3,
        },
      },
      {
        input: product?.sku ?? "",
        type: "sku",
        inputReg: {
          min: 3,
        },
      },
      {
        input: product?.assetskus ?? [],
        type: "assetskus",
        inputReg: {
          min: 0,
        },
      },
      {
        input: product?.price ?? "",
        type: "price",
        inputReg: {
          min: 1,
        },
      },
      {
        input: product && product.publisher ? product.publisher[0] : "",
        type: "email",
        inputReg: {
          min: 1,
        },
      },
      {
        input: product?.tags ?? [],
        type: "tags",
        inputReg: {
          min: 1,
        },
      },
      {
        input: product?.description ?? "",
        type: "description",
        inputReg: {
          min: 10,
        },
      },
      {
        input: platformList ?? [],
        type: "platformList",
        inputReg: {
          min: 1,
        },
      },
    ];

    let validation_state = true;
    validation_data.map((item) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      if (!useValidator(item)) {
        validation_state = false;
        // return false;
      }
    });

    if (!validation_state) {
      return false;
    }
    return true;
  };

  const removeProduct = async () => {
    const res = await deleteProduct(product_id).catch((err) => {
      console.log(err);
      toast.error("Failed");
    });
    if (res) {
      toast.success("Successfully deleted product");
    } else {
      toast.error("Error occured");
    }
  };

  const saveProduct = async () => {
    const d_product = { ...product };
    if (d_product.tags) {
      Object.assign(d_product, { tags: d_product.tags.toString() });
    }
    const res = await addProduct(d_product);
    if (res) {
      const file_res = await addProductFile(imgData, platformData);
      if (file_res) {
        toast.success("Product saved successfully");
      } else {
        toast.error("Error occured to save product files");
      }
      navigate(-1);
    } else {
      toast.error("Error occured");
    }
  };

  const submitProductEdition = async () => {
    const validState = await checkValidation();
    const d_product = { ...product };
    Object.assign(d_product, { tags: d_product.tags.toString() });
    if (validState) {
      if (search_param == "edit") {
        try {
          await updateProduct(d_product).then(async (res) => {
            // await
          });
          toast.success("Product updated successfully");
        } catch (error) {
          toast.success("Cann't update product.");
        }
      } else {
        try {
          await addProduct(d_product)
            .then(async (res) => {
              try {
                await addProductFile(imgData, platformData);
                toast.success("Product created successfully");
              } catch (error) {
                toast.error("Cann't add your product.");
              }
            })
            .catch((err) => {
              console.log("add product error", err);
            });
        } catch (error) {
          toast.error("Cann't add your product.");
        }
      }
    }
  };

  const getType = (index: number) => {
    switch (index) {
      case 0:
        return (
          <FormInput
            value={product ? product.title : ""}
            onChange={(e) => handleInputChange(e.target.value, index)}
          />
        );
      case 1:
        return (
          <FormInput
            value={product ? product.sku : ""}
            onChange={(e) => handleInputChange(e.target.value, index)}
          />
        );
      case 2:
        return (
          <MultiSelector
            type="solo"
            id="e_asset"
            default={product ? product.fashionAssetSkus : ""}
            handleSoloChange={handleAssetChange}
            options={product?.fashionAssetSkus}
          />
        );
      case 3:
        return (
          <FormInput
            type="profile"
            id="e_price"
            value={product ? product.price : 0}
            onChange={(e) => handleInputChange(e.target.value, index)}
          />
        );
      case 4:
        return (
          <MenuSelect
            type="profile"
            id="p_category"
            default={
              product
                ? productCategoryList[product.category_id - 1]
                : productCategoryList[0]
            }
            handleCategory={handleCategory}
            menuItems={productCategoryList}
          />
        );
      case 5:
        return (
          <MultiSelector
            type="filter"
            handlePublisher={handlePublisher}
            default={product ? product.publisher : ""}
            options={appUserList}
          />
        );
      case 6:
        return (
          <MultiSelector
            type="label"
            handleLabel={handleLabel}
            default={product ? product.tags : ""}
            options={fashionTagList}
          />
        );
      case 7:
        return (
          <ReactQuill
            formats={Editor.formats}
            modules={Editor.modules}
            theme="snow"
            value={product ? product.description : "description"}
            onChange={(e) => onDescriptionChange(e)}
          />
        );
      case 8:
        return (
          <MenuSelect
            type="profile"
            id="editor_pick"
            default={
              product ? (product.is_editor_picked == 1 ? "Yes" : "No") : "Yes"
            }
            menuItems={["Yes", "No"]}
          />
        );
      case 10:
        return (
          <MenuSelect
            type="profile"
            id="public"
            default={product ? (product.public == 1 ? "Yes" : "No") : "No"}
            handlePublicState={handlePublicState}
            menuItems={["Yes", "No"]}
          />
        );
      case 9:
        return (
          <>
            {platformList.map((item: any, index: any) => (
              <AddPlatform
                key={index}
                value={item}
                type={
                  product && product.fashionProductFile
                    ? product.fashionProductFile[index].platform_id
                    : 1
                }
                index={index}
                getState={getState}
                handlePlatformData={handlePlatformData}
                removePlatform={removePlatform}
              />
            ))}
            <IconButton onClick={addPlatformList}>
              <AddRoundedIcon />
            </IconButton>
          </>
        );
    }
  };

  return (
    <>
      <ProductEditWrapper>
        <ProductEditHeader
          submitProductEdition={submitProductEdition}
          removeProduct={removeProduct}
          saveProduct={saveProduct}
        />
        <Divider />
        <Grid container>
          <Grid xs={1} item />
          <Grid xs={10} item sx={{ paddingBlock: 2 }}>
            <Grid container sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <Grid xs={2} item>
                <EvoTypography>Main image</EvoTypography>
              </Grid>
              <Grid xs={10} item sx={{ maxWidth: { xs: "100%" } }}>
                <IconButton
                  onClick={openImgLoader}
                  sx={{
                    boxShadow: "0 9px 16px 0 rgba(24,28,50,.3)!important",
                    color: "#b5b5c3",
                    ml: 17,
                  }}
                >
                  <CreateRoundedIcon
                    sx={{
                      width: "15px",
                      height: "auto",
                    }}
                  />
                </IconButton>
                <Box sx={{ height: "105px", marginTop: "5px" }}>
                  {/* <img src="/assets/images/avatars/ava1.jpg" /> */}
                  {imgPreview && (
                    <img
                      src={imgPreview}
                      alt="img-preview"
                      style={{ width: "150px", height: "105px" }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              mt={2}
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
              <Grid xs={2} item>
                <EvoTypography>Gallery</EvoTypography>
              </Grid>
              <Grid xs={10} item sx={{ maxWidth: { xs: "100%" } }}>
                <GalleryDropzone
                  handleImgData={handleImgData}
                  productImgData={productImageData}
                />
              </Grid>
            </Grid>
            {ProductConfig.map((item, index) => (
              <Grid
                container
                key={item + index}
                mt={2}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
              >
                <Grid xs={2} item>
                  <EvoTypography>{item}</EvoTypography>
                </Grid>
                <Grid xs={10} item sx={{ maxWidth: { xs: "100%" } }}>
                  {getType(index)}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid xs={1} item />
        </Grid>
        <EvoImgLoader
          handleImgUpload={handleImgUpload}
          openState={openDialog}
          handleHeadAction={closeDialog}
        />
      </ProductEditWrapper>
    </>
  );
};

export default ProductEdit;
