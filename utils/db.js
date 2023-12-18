const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const { DATABASE_URL } = require('./config');

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      // Remove or comment out the SSL options
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false
      // }
    },
  });

const connect = async () => {
    try {
      await sequelize.authenticate();
      await runMigrations();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  };
  
const disconnect = async () => {
    await sequelize.close();
};


const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};


module.exports = {
  sequelize,
  db: {
    connect,
    disconnect,
  },
  rollbackMigration,
};