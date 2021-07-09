const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
  try {
    await Article.find({}, (err, foundArticles) => {
      res.send(foundArticles);
    });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.post('/', async (req, res) => {
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

router.get('/:articleTitle', async (req, res) => {
  try {
    const foundArticle = await Article.findOne({
      title: req.params.articleTitle,
    });

    res.send(foundArticle);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.put('/:articleTitle', async (req, res) => {
  try {
    await Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      err => {
        if (!err)
          res.send(
            `Successfully updated article on ${req.params.articleTitle}`
          );
      }
    );
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.patch('/:articleTitle', async (req, res) => {
  try {
    await Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      err => {
        if (!err)
          res.send(
            `Successfully updated article on ${req.params.articleTitle}`
          );
      }
    );
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
