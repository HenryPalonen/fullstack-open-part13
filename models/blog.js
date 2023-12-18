const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db')


const Blog = sequelize.define('Blog', {
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0 // Assuming likes should not be negative
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1991,
        max: new Date().getFullYear() // Ensures year is not greater than the current year
      }
    }
}, {
    timestamps: true, // If want to add created_at and updated_at, set this to true
    tableName: 'blogs'
});

module.exports = Blog;


