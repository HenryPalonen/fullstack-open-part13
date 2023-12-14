const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog } = require("../models/blog");
const tokenExtractor = require('../middleware/tokenExtractor');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        author: {
          [Op.iLike]: req.query.search,
        },
      },
      {
        title: {
          [Op.iLike]: req.query.search,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    where,
    order: [["likes", "DESC"]],
    include: {
      model: User, // Include the user associated with each blog
      attributes: ['id', 'name', 'username'] // Select specific user attributes to include
    }
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  // Assuming the user's ID is included in the request's user object
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  return res.json(blog);
});


router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  if (!req.blog) {
    return res.status(404).send({ error: 'Blog not found' });
  }

  if (req.blog.userId !== req.user.id) {
    return res.status(401).send({ error: 'Unauthorized to delete this blog' });
  }

  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;


