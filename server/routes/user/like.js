const express = require("express");
const router = express.Router();
const Like = require("../../models/Like");
const Dislike = require("../../models/Dislike");
const { User, Favorite } = require("../../db");

const isLikeableForUser = async (user_id, product_id) => {
  const [like] = await Like.aggregate([
    {
      $match: {
        likeable_id: product_id,
        user_id: user_id,
        likeable_type: "App\\Models\\Fashion\\Product",
      },
    },
    { $project: { id: 1, likeable_type: 1, user_id: 1 } },
  ]);
  const [dislike] = await Dislike.aggregate([
    {
      $match: {
        dislikeable_id: product_id,
        user_id: user_id,
        dislikeable_type: "App\\Models\\Fashion\\Product",
      },
    },
    { $project: { id: 1, dislikeable_type: 1, user_id: 1 } },
  ]);
  if (dislike) {
    await Dislike.findOneAndDelete({ _id: dislike._id });
  }
  if (like) {
    await Like.findOneAndDelete({ _id: like._id });
    return false;
  } else {
    return true;
  }
};

const isDislikeableForUser = async (user_id, product_id) => {
  const [dislike] = await Dislike.aggregate([
    {
      $match: {
        dislikeable_id: product_id,
        user_id: user_id,
        dislikeable_type: "App\\Models\\Fashion\\Product",
      },
    },
    { $project: { id: 1, dislikeable_type: 1, user_id: 1 } },
  ]);
  const [like] = await Like.aggregate([
    {
      $match: {
        likeable_id: product_id,
        user_id: user_id,
        likeable_type: "App\\Models\\Fashion\\Product",
      },
    },
    { $project: { id: 1, likeable_type: 1, user_id: 1 } },
  ]);
  if (like) {
    await Like.findOneAndDelete({ _id: like._id });
  }
  if (dislike) {
    await Dislike.findOneAndDelete({ _id: dislike._id });
    return false;
  } else {
    return true;
  }
};

router.post("/addFavorite", async (req, res) => {  
  const user = await User.findById(req.user.user.id);
  const { product_id } = req.body;
  try {
    const isLikeable = await isLikeableForUser(user.id, Number(product_id));    
    const [maxIdItem] = await Like.find().sort({ id: -1 }).limit(1);
    console.log("Is like able", isLikeable);
    if (isLikeable) {
      const data = {
        id: maxIdItem.id + 1,
        user_id: user.id,
        likeable_type: "App\\Models\\Fashion\\Product",
        likeable_id: product_id,
      };
      const newLike = await Like.create(data);      
      return res.status(200).send({ msg: "Like added", data: newLike });
    }

    return res.status(200).send({ msg: "Removed Like" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "failed" });
  }
});

router.post("/addDislike", async (req, res) => {
  const user = await User.findById(req.user.user.id);
  const { product_id } = req.body;
  try {
    const isDislikeable = await isDislikeableForUser(
      user.id,
      Number(product_id)
    );
    const [maxIdItem] = await Like.find().sort({ id: -1 }).limit(1);

    if (isDislikeable) {
      const data = {
        id: maxIdItem.id + 1,
        user_id: user.id,
        dislikeable_type: "App\\Models\\Fashion\\Product",
        dislikeable_id: product_id,
      };
      const newDislike = await Dislike.create(data);
      return res.status(200).send({ msg: "DisLike added", data: newDislike });
    }

    return res.status(200).send({ msg: "Removed Dislike" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "failed" });
  }
});

router.get("/getFavorites", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const favorites = await Favorite.findUserFavorite(user.id);
    return res.status(200).send({ success: true, favorites });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false });
  }
});

router.post("/saveFavorite/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const user = await User.findOne({ _id: req.user.user._id });
    const [maxIdItem] = await Favorite.find().sort({ id: -1 }).limit(1);

    const newFavorite = {
      id: maxIdItem + 1,
      user_id: user.id,
      saveable_id: product_id,
    };
    await Favorite.create(newFavorite);
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(500).send({ success: false });
  }
});

router.delete("/deleteFavorite/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.deleteOne({ _id: id });
    return res.status(200).send({ success: true, msg: "successfully deleted" });
  } catch (err) {
    return res.status(500).send({ success: false });
  }
});

module.exports = router;
