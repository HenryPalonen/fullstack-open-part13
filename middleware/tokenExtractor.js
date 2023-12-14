// middleware/tokenExtractor.js
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    try {
      const decodedToken = jwt.verify(token, SECRET);
      request.user = decodedToken;
    } catch (error) {
      next(error);
    }
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
};

module.exports = tokenExtractor;
