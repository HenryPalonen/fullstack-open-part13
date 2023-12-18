const router = require('express').Router();
const User = require('../models'); 

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

// single user route GET
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: ReadingList,
        include: {
          model: Blog,
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year']
        },
        where: {}
      }
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Filter based on the 'read' query parameter
    if (req.query.read) {
      const isRead = req.query.read === 'true';
      user.ReadingLists = user.ReadingLists.filter(rl => rl.isRead === isRead);
    }

    const userData = {
      name: user.name,
      username: user.username,
      readings: user.ReadingLists.map(readingList => {
        const blog = readingList.Blog;
        return {
          id: blog.id,
          url: blog.url,
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
          year: blog.year,
          readinglists: [
            {
              read: readingList.isRead,
              id: readingList.id
            }
          ]
        };
      })
    };

    res.json(userData);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
