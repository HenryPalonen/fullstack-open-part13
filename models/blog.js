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

module.exports = Blog;


/*const mongoose = require('mongoose')

// Data model
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)


*/