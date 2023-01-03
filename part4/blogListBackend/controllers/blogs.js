const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title === undefined) {
    response.status(400).json('title not found')
  }
  if (request.body.url === undefined) {
    response.status(400).json('url not found')
  }
  if (request.token === undefined) {
    response.status(401).json('token missing or invalid')
  }
  const body =(request.body)
  const token = request.token
  /* Verifying the token. */
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blog = user.blog.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken) {
    response.status(401).json({
      error: 'invalid token'
    })
  }
  const user = await User.findById(decodedToken.id)
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (user.id.toString() === blog.user.toJSON()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'invalid user'
    })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())

})

module.exports = blogRouter