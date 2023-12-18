const router = require('express').Router();
const userExtractor = require('../middleware/tokenExtractor');
const { ReadingList } = require('../models');

router.get('/', async (req, res) => {
  const readingLists = await ReadingList.findAll();
  return res.status(200).json(readingLists);
});

router.post('/', async (req, res) => {
  const { blog_id, user_id } = req.body;
  const readingList = await ReadingList.create({
    blogId: blog_id,
    userId: user_id,
  });

  return res.status(200).send(readingList);
});

router.put('/:id', userExtractor, async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const readingList = await ReadingList.findByPk(id);

  if (user.id !== readingList.userId) {
    return res.status(401).json({
      error: 'Can only mark blogs as read from own reading list',
    });
  }

  readingList.read = req.body.read;
  await readingList.save();
  return res.json(readingList);
});

module.exports = router;