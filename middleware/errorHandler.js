const errorHandler = (error, _req, res, next) => {
    console.log(`Error msg: ${error.message}`);
    console.log(`Error name: ${error.name}`);
  
    switch (error.name) {
      case 'ReferenceError':
        return res.status(404).send({ error: 'Requested object not found' });
      case 'SequelizeDatabaseError':
        return res.status(400).send({ error: 'Something went wrong' });
      case 'SequelizeValidationError':
        return res.status(400).send({ error: error.message });
      case 'SequelizeUniqueConstraintError':
        return res.status(400).send({ error: 'Object field not unique' });
      case 'JsonWebTokenError':
        return res.status(401).send({ error: error.message });
      case 'SequelizeForeignKeyConstraintError':
        return res.status(400).send({ error: 'Something went wrong' });
      default:
        return next(error);
    }
  };
  
  module.exports = errorHandler;