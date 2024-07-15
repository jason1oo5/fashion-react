const express = require("express");
const router = express.Router();
const { Question } = require("../../db");

router.post("/addQuestion", async (req, res) => {
  const { title, content, product_id } = req.body;  
  try {
    const newQuestion = {
      user_id: req.user.user._id,
      title: title,
      content: content,
      product_id: product_id,
    };
    const result = await Question.create(newQuestion);
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false });
  }
});

router.get("/getQuestions/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const questions = await Question.findUserQuestion(product_id);    
    if(questions.length == 0) {
      return res.status(200).send({ success: false, questions: [] });  
    }
    return res.status(200).send({ success: true, questions });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false });
  }
});

module.exports = router;
