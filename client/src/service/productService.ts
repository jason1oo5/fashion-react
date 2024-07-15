import axios_instance, {
  axios_file_instance,
} from "../components/api/api_instance";
import qs from "qs";
import { QuestionType, ReviewType, S3AuthType } from "../config/interface";

export const getConfigs = async () => {
  const productCategory: string[] = [];
  const platform: string[] = [];
  const res = await axios_instance({
    url: "public/getConfigs",
    method: "GET",
  });
  const categories_list = res.data.categories;
  const platforms = res.data.platform;
  platforms.map((item: any) => {
    platform.push(String(item.name));
  });
  categories_list.map((item: any) => {
    productCategory.push(String(item.title));
  });

  return { productCategory, platform };
};

export const getAssetskus = async () => {
  const res = await axios_instance({
    url: "user/fashionAssetSkus/getAssetSkusList",
    method: "GET",
  });
  const skus = res.data.fashionAssetSkus;
  const assetSkus: string[] = [];
  skus.map((item: any) => {
    assetSkus.push(item.asset);
  });
  return { assetSkus };
};

export const getPlatforms = async () => {
  const res = await axios_instance({
    url: "/public/platform/getPlatforms",
    method: "GET",
  });
  return res.data.platforms;
};

export const getTags = async () => {
  const res = await axios_instance({
    url: "user/fashionTags/getTags",
    method: "GET",
  });
  const fashionTags: string[] = [];
  res.data.tags.map((tag: any) => {
    fashionTags.push(tag.tag);
  });
  return { fashionTags };
};

export const getAllProduct = async (option: any) => {
  const dataToSend = {
    userProduct: option.userProduct,
    page: option.page,
    perPage: option.perPage,
    type: option.type,
    filterBy: option.filterBy,
    sortBy: option.sortBy,
    minPrice: option.minPrice,
    maxPrice: option.maxPrice,
    search: option.search,
  };

  const res = await axios_instance({
    url: "/public/fashion_product/getAllProduct",
    method: "POST",
    data: qs.stringify(dataToSend),
  });

  const s3Auth: S3AuthType = res.data.data.s3_auth;
  const total = res.data.data.total;
  const products = res.data.data.products;
  return { total, products, s3Auth };
};

export const getProductDetailById = async (id: any) => {
  let productDetail;
  await axios_instance({
    url: "public/fashion_product/getProductDetail/" + id,
    method: "GET",
  }).then((res) => {
    productDetail = res.data.data[0];
  });

  return productDetail;
};

export const addProductLike = async (product_id: any) => {
  await axios_instance({
    url: "user/like/addFavorite",
    method: "POST",
    data: qs.stringify({ product_id: product_id }),
  }).then((res) => {
    console.log("like", res.data);
  });
};

export const addProductDislike = async (product_id: any) => {
  await axios_instance({
    url: "user/like/addDislike",
    method: "POST",
    data: qs.stringify({ product_id: product_id }),
  }).then((res) => {
    console.log("dislike", res.data);
  });
};

export const getAllCategories = async () => {
  let categories;
  await axios_instance({
    url: "/public/fashion_category/getAllCategories",
    method: "GET",
  }).then((res) => {
    categories = res.data.data;
  });

  return categories;
};

export const addProduct = async (newProduct: any) => {
  const res = await axios_instance({
    url: "/user/product/addProduct",
    method: "POST",
    data: qs.stringify(newProduct),
  });
  return res.data.success;
};

export const updateProduct = async (updatedProduct: any) => {
  await axios_instance({
    url: "/user/product/addProduct",
    method: "POST",
    data: qs.stringify(updatedProduct),
  }).then((res) => {
    console.log("updateProduct", res.data);
  });
};

export const addProductFile = async (imgData: any, files: any) => {
  const formData = new FormData();
  imgData.map((imgItem: any) => {
    formData.append("images", imgItem);
  });
  files.map((file: any) => {
    formData.append("files", file);
  });
  const res = await axios_file_instance({
    url: "user/product/uploadProductFile",
    method: "POST",
    data: formData,
  });

  return res.data.success;
};

export const removeProductFile = async (
  fileToRemove: any,
  imageToRemove: any
) => {
  await axios_instance({
    url: "user/product/removeProductFile",
    method: "POST",
    data: qs.stringify({
      fileToRemove: fileToRemove,
      imageToRemove: imageToRemove,
    }),
  }).then((res) => {
    console.log("addProductFile", res.data);
  });
};

export const deleteProduct = async (product_id: any) => {
  const res = await axios_instance({
    url: "user/product/deleteProduct/" + product_id,
    method: "DELETE",
  });

  return res.data.success;
};

export const getPurchasedProduct = async () => {
  const res = await axios_instance({
    url: "user/product/purchasedProducts",
    method: "GET",
  });

  return res.data.products;
};

export const getFavoriteProduct = async () => {
  const res = await axios_instance({
    url: "user/like/getFavorites",
    method: "GET",
  });

  return res.data.favorites;
};

export const removeFavorite = async (id: any) => {
  const res = await axios_instance({
    url: "user/like/deleteFavorite/" + id,
    method: "DELETE",
  });

  return res.data.success;
};

export const getSkuSales = async (promotionState: boolean, page: number) => {
  const res = await axios_instance({
    url: "user/findSkuSales/" + promotionState + "/" + page,
    method: "GET",
  });

  return res.data.skuSales;
};

export const getUserOwnedSkusByAdmin = async ({ type, id, page }: any) => {
  const res = await axios_instance({
    url: "/user/admin/getOwnedSkus/" + type + "/" + id + "/" + page,
    method: "GET",
  });

  return res.data.purchased;
};

// Question, Reviews

export const getQuestionsByUser = async (product_id: number) => {
  const res = await axios_instance({
    url: "user/question/getQuestions/" + product_id,
    method: "GET",
  });

  return res.data.questions;
};

export const getReviews = async (product_id: number) => {
  const res = await axios_instance({
    url: "user/review/getReviews/" + product_id,
    method: "GET",
  });

  return res.data.reviews;
};

export const addReview = async (dataToSend: ReviewType) => {
  const res = await axios_instance({
    url: "user/review/addReview",
    method: "POST",
    data: qs.stringify(dataToSend),
  });

  return res.data.success;
};

export const addQuestion = async (dataToSend: QuestionType) => {
  const res = await axios_instance({
    url: "user/question/addQuestion",
    method: "POST",
    data: qs.stringify(dataToSend),
  });

  return res.data.success;
};
