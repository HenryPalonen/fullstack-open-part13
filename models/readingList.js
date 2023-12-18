// models/readinglist.js

const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../utils/db'); 

class ReadingList extends Model {}

ReadingList.init({

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the Users table
      key: 'id'
    }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'blogs', // Name of the Blogs table
      key: 'id'
    }
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'ReadingList',
  timestamps: false, // Assuming no timestamps in this table
  underscored: true // If your table uses snake_case
});

module.exports = ReadingList;
