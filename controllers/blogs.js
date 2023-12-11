const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogsRouter = express.Router();
/*
blogsRouter.get('', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs);
    })
    .catch(error => {
      console.log('Error fetching blogs:', error);
      response.status(500).json({ error: 'Error fetching blogs' });
    });
});
*/

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})
// get individual blog
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

/*
blogsRouter.post('', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log('Error saving blog:', error);
      response.status(500).json({ error: 'Error saving blog' });
    });
});
*/

// add blog
blogsRouter.post('/', async (request, response) => {
    const body = request.body
  
    // Check token
    if (!request.decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    // check content
    if (!body.title) {
      return response.status(400).json({
        error: 'title missing'
      })
    }
  
    if (!body.url) {
      return response.status(400).json({
        error: 'url missing'
      })
    }
  
    // get user
    const user = await User.findById(request.decodedToken.id)
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
  
    // blog's id added to the user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)
  })


blogsRouter.put('/:id', (request, response) => {
  const { id } = request.params;
  const updatedBlog = request.body;

  Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog);
      } else {
        response.status(404).json({ error: 'Blog not found' });
      }
    })
    .catch(error => {
      console.log('Error updating blog:', error);
      response.status(500).json({ error: 'Error updating blog' });
    });
});


blogsRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  Blog.findByIdAndDelete(id)
    .then(deletedBlog => {
      if (deletedBlog) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: 'Blog not found' });
      }
    })
    .catch(error => {
      console.log('Error deleting blog:', error);
      response.status(500).json({ error: 'Error deleting blog' });
    });
});

module.exports = blogsRouter;
