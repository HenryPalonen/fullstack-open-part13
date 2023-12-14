const router = require('express').Router();
const { User } = require('../models/user'); // Adjust the path to your user model

// POST api/users - Add a new user
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// GET api/users - List all users
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['id', 'title', 'author', 'url', 'likes'] // Select specific attributes of the blogs
    }
  });
  res.json(users);
});

// PUT api/users/:username - Change a username
router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
