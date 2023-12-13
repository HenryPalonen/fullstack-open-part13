const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres' // Specify the dialect
});

const Blog = sequelize.define('Blog', {
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    likes: DataTypes.INTEGER
}, {
    // options
    timestamps: false,
    tableName: 'blogs'
});

module.exports = { Blog };

