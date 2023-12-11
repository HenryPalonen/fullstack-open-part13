const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// initial blogs
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '62b058a9cda8e9225951e41f'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '62af14e972dfceab22dba2d3'
  }
]


const initialUsers = [
  {
    username: 'seconduser',
    name: 'Some Testuser2',
    passwordHash: '$2a$10$SvFULHK8btPq3u6MTgOwieQ9XCn7XKvvfoUDIemTa4PepLKm5Cn1.',
    blogs: []
  }
]

// helper function
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getTokenForUser = (user) => {
  const jwt_user = {
    username: user.username,
    id: user.id
  }
  return jwt.sign(jwt_user, process.env.SECRET)
}


module.exports = {
  initialBlogs, 
  initialUsers, 
  blogsInDb,
  usersInDb, 
  getTokenForUser
}