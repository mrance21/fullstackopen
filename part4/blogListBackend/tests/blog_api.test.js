const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog.js')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('verifies unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs/')
  console.log(response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})


test('verify POST request creates a new blog post', async () => {
  const newBlog = {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = await blogsAtEnd.map(r => r.title)
  expect(titles).toContain('TDD harms architecture')
})


test('http likes', async () => {
  const responseBlogs = await api.get('/api/blogs/')

  responseBlogs.body.forEach(async (blog) => {
    if (blog.likes === undefined) {
      blog.likes = 0
    }
  })

  responseBlogs.body.forEach(async (blog) => {
    await expect(blog.likes).toBeDefined()
  })
})

test('invalid users', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'mrance35',
    name: 'miles',
    password: 'mick'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})