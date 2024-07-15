require("dotenv").config();
require("./mongo");

const User = require("./models/User");
const FashionProduct = require("./models/FashionProduct");
const Like = require("./models/Like");
const Order = require("./models/Order");
const Platform = require("./models/Platform");
const Company = require("./models/Company");
const FashionAssetSkus = require("./models/FashionAssetSkus");
const FashionCategory = require("./models/FashionCategory");
const FashionProductFile = require("./models/FashionProductFile");
const FashionProductImage = require("./models/FashionProductImage");
const FashionTag = require("./models/FashionTag");
const DataSet = require("./models/DataSet");
const DataSetStructure = require("./models/DataSetStructure");
const Role = require("./models/Role");
const Permission = require("./models/Permission");
const RolePermission = require("./models/RolePermission");
const License = require("./models/License");
const Tutorial = require("./models/Tutorial");
const Cart = require("./models/Cart");
const CompanyUser = require("./models/CompanyUser");
const EvoPoint = require("./models/EvoPoint");
const AuthParty = require("./models/AuthParty");
const FashionPurchase = require("./models/FashionPurchase");
const DataSetRecord = require("./models/DataSetRecord");
const Favorite = require("./models/Favorite");
const Review = require("./models/Review");
const Question = require("./models/Question");
const Locale = require("./models/Locale");
const ShowCase = require("./models/ShowCase");

module.exports = {
  User,
  FashionProduct,
  FashionProductImage,
  FashionProductFile,
  FashionCategory,
  FashionAssetSkus,
  FashionTag,
  Like,
  Company,
  Order,
  Platform,
  DataSet,
  DataSetStructure,
  Role,
  Permission,
  RolePermission,
  License,
  Tutorial,
  Cart,
  CompanyUser,
  EvoPoint,
  AuthParty,
  FashionPurchase,
  DataSetRecord,
  Favorite,
  Review,
  Question,
  Locale,
  ShowCase,
};
