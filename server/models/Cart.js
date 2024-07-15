const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    product_id: { type: Number, index: true, unique: true, required: true },
  },
  {
    strict: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Cart = mongoose.model("Cart", CartSchema);

Cart.findByUser = async function (user_id) {
  const matchQuery = { user_id: user_id };

  const [cartItems] = await Promise.all([
    this.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "fashionproducts",
          localField: "product_id",
          foreignField: "id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: "fashionproductimages",
          localField: "product.id",
          foreignField: "product_id",
          as: "productImage",
        },
      },
      {
        $project: {
          id: 1,
          user_id: 1,
          product_id: 1,
          "product.title": 1,
          "product.sku": 1,
          "product.price": 1,
          "productImage.path": 1,
        },
      },
    ]),
  ]);

  return cartItems;
};

module.exports = Cart;
