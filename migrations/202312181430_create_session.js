const router = require('express').Router();
const tokenExtractor = require('../middleware/tokenExtractor');
const { Session } = require('../models');

router.delete('/', tokenExtractor, async (req, res) => {
  const session = await Session.findByPk(req.token);
  await session.destroy();

  return res.status(200).end();
});

module.exports = router;