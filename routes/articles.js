const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/articles', async (req, res) => {
  try {
    await Article.find({}, (err, foundArticles) => {
      res.send(foundArticles);
    });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.post('/articles', async (req, res) => {
  try {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    await newArticle.save(err => {
      if (!err) res.send('Successfully added a new article');
      else res.status(400).send({ message: err.message });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
