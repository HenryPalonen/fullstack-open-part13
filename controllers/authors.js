const router = require("express").Router();
const { Sequelize } = require("sequelize");
const { Blog } = require("../models/blog"); 

router.get('/authors', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'articles'],
        [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']
      ],
      group: ['author'],
      order: [[Sequelize.fn('SUM', Sequelize.col('likes')), 'DESC']], // Ordering by total likes
    });

    const authorStats = authors.map(author => {
      return {
        author: author.author,
        articles: author.getDataValue('articles'),
        likes: author.getDataValue('likes')
      };
    });

    res.json(authorStats);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 
