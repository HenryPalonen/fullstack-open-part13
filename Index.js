require('dotenv').config();
const http = require('http');
const app = require('./app');
/*
const { PORT } = require('./utils/config');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/


const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()






/*
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

app().then((app) => {
  const server = http.createServer(app)

  server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  });
});

*/