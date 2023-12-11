// Load the full build.
const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => (
  blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

const favoriteBlog = blogs => {
  let likes = blogs.map(blog => blog.likes) // array with amount of likes
  let index = likes.indexOf(Math.max(...likes))
  return blogs[index]
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  let occurences = blogs.reduce(function(sums, entry){
    sums[entry.author] = (sums[entry.author] || 0) + 1
    return sums
  }, {}) // object with {name:occurences, name:occurences, ...}

  const values = _.values(occurences) // array with amount oif blogs per author
  const mostBlogs = Math.max(...values) // max amount of blog per author
  const index = values.indexOf(mostBlogs)

  return {
    author: _.keys(occurences)[index],
    blogs: mostBlogs
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  const groupedAuthors = _.groupBy(blogs, blog => blog.author)
  const authors = _.keys(groupedAuthors)

  for (const author of authors) {
    groupedAuthors[author] = totalLikes(groupedAuthors[author])
  } // object with {name:totLikes, name:totLikes, ...}

  const likes = _.values(groupedAuthors)
  const mostLikes = Math.max(...likes)

  return {
    author: authors[likes.indexOf(mostLikes)],
    likes: mostLikes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}