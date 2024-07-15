const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FashionProductSchema = new Schema(
  {
    id: { type: Number, unique: true, required: true },
    title: { type: String, default: "" },
    sku: { type: String, default: "" },
    description: { type: String, default: "No description" },
    category_id: { type: Number, default: null },
    price: { type: Number, default: null },
    tags: { type: String, default: "" },
    views_count: { type: Number, default: 0 },
    is_editor_picked: { type: Number, default: 0 },
    added_to_cart_count: { type: Number, default: 0 },
    purchased_count: { type: Number, default: 0 },
    approval_status: { type: Number, default: 0 },
    user_id: { type: Number, required: true },
    entity_type: { type: Number, default: null },
    in_app: { type: Number, default: 0 },
    public: { type: Number, default: 0 },
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const FashionProduct = mongoose.model("FashionProduct", FashionProductSchema);

FashionProduct.findAll = async function (
  userId,
  userProduct,
  page,
  perPage,
  type,
  filterBy = "all",
  sortBy,
  minPrice,
  maxPrice,
  search
) {
  page = Math.max(Number(page || 1), 0);
  perPage = Math.max(Number(perPage || 20), 0);
  const skip = (page - 1) * perPage;

  const matchQuery = {};
  if (userProduct === "true") {
    Object.assign(matchQuery, { user_id: userId });
  }

  if (search) {
    Object.assign(matchQuery, {
      $or: [
        { description: { $regex: ".*" + search + ".*" } },
        { title: { $regex: ".*" + search + ".*" } },
      ],
    });
  }
  
  if (type && type > 0) {
    type = Number(type);
    Object.assign(matchQuery, { category_id: type });
  }
  const sortQuery = {};
  const projectQuery = {
    id: 1,
    title: 1,
    sku: 1,
    description: 1,
    category_id: 1,
    price: 1,
    tags: 1,
    views_count: 1,
    added_to_cart_count: 1,
    public: 1,
    imgData: 1,
    created_at: 1,
    updated_at: 1,
  };

  if (minPrice && maxPrice) {
    Object.assign(matchQuery, {
      price: { $lte: Number(maxPrice), $gte: Number(minPrice) },
    });
  }

  switch (filterBy) {
    case "price":
      Object.assign(matchQuery, { price: { $lte: maxPrice, $gte: minPrice } });
      break;

    case "user":
      Object.assign(matchQuery, { user_id: userId });
      break;
    default:
      break;
  }

  switch (sortBy) {
    case "title":
      Object.assign(sortQuery, { title: 1 });
      break;
    case "popular":
      Object.assign(sortQuery, { views_count: 1 });
      break;
    case "price":
      Object.assign(sortQuery, { price: 1 });
      break;
    case "posting_date":
      Object.assign(sortQuery, { created_at: -1 });
      break;
  }

  const [total, products] = await Promise.all([
    this.countDocuments(matchQuery),
    this.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "likes",
          localField: "id",
          foreignField: "likeable_id",
          as: "productLike",
        },
      },
      {
        $lookup: {
          from: "fashionproductimages",
          localField: "id",
          foreignField: "product_id",
          as: "productImage",
        },
      },
      {
        $sort: sortQuery,
      },
      {
        $skip: skip,
      },
      {
        $limit: perPage,
      },
      {
        $project: Object.assign(projectQuery, {
          "productLike.id": 1,
          "productImage.path": 1,
        }),
      },
    ]),
  ]);

  return [total, products];
};

FashionProduct.findProductDetailById = async function (_id) {
  // const product_id = new ObjectId(_id);

  const matchQuery = { id: Number(_id) };

  const [product] = await Promise.all([
    this.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "likes",
          localField: "id",
          foreignField: "likeable_id",
          as: "productLike",
        },
      },
      {
        $lookup: {
          from: "dislikes",
          localField: "id",
          foreignField: "dislikeable_id",
          as: "productDislike",
        },
      },
      {
        $lookup: {
          from: "fashionproductimages",
          localField: "id",
          foreignField: "product_id",
          as: "productImage",
        },
      },
      {
        $lookup: {
          from: "producttags",
          localField: "id",
          foreignField: "product_id",
          as: "productTag",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "id",
          as: "publisher",
        },
      },
      {
        $lookup: {
          from: "fashionassetskus",
          localField: "id",
          foreignField: "product_id",
          as: "fashionAssetSkus",
        },
      },
      {
        $lookup: {
          from: "fashionproductfiles",
          localField: "id",
          foreignField: "product_id",
          as: "fashionProductFile",
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          id: 1,
          title: 1,
          sku: 1,
          description: 1,
          category_id: 1,
          price: 1,
          tags: 1,
          views_count: 1,
          added_to_cart_count: 1,
          public: 1,
          created_at: 1,
          updated_at: 1,
          "productImage.path": 1,
          "productLike.id": 1,
          "productDislike.id": 1,
          "productTag.name": 1,
          "publisher.email": 1,
          "fashionAssetSkus.asset": 1,
          "fashionProductFile.path": 1,
          "fashionProductFile.platform_id": 1,
        },
      },
    ]),
  ]);

  return product;
};

FashionProduct.findPurchasedProductById = async function (_id) {
  // const product_id = new ObjectId(_id);

  const matchQuery = { id: Number(_id) };

  const projectQuery = {
    id: 1,
    title: 1,
    sku: 1,
    description: 1,
    category_id: 1,
    price: 1,
    tags: 1,
    views_count: 1,
    added_to_cart_count: 1,
    public: 1,
    imgData: 1,
    created_at: 1,
    updated_at: 1,
  };

  const [total, products] = await Promise.all([
    this.countDocuments(matchQuery),
    this.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "likes",
          localField: "id",
          foreignField: "likeable_id",
          as: "productLike",
        },
      },
      {
        $lookup: {
          from: "fashionproductimages",
          localField: "id",
          foreignField: "product_id",
          as: "productImage",
        },
      },
      {
        $project: Object.assign(projectQuery, {
          "productLike.id": 1,
          "productImage.path": 1,
        }),
      },
    ]),
  ]);

  return [total, products];
};

FashionProduct.updateProduct = async function (body) {
  const updatedProduct = await this.findOneAndUpdate({ id: body.id }, body);
  return updatedProduct;
};

module.exports = FashionProduct;
