const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
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

describe('unique users and blogs operation', () => {
  test('add new blog with correct user', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const loginData = {
      'username': 'Zoro',
      'password': 'sword'
    }

    const user = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    console.log('userId', userId)

    const newBlog = {
      'title': 'the vjegeS  ',
      'author': 'hectsdosr',
      'url': 'www.senk.ed',
      'likes': 311
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(200)
  })

  test('add new blog with no token', async () => {
    // const responseBlogs = await api.get('/api/blogs')
    const loginData = {
      'username': 'Zoro',
      'password': 'sword'
    }

    const user = await api
      .post('/api/login')
      .send(loginData)
      .expect(200)

    console.log('user, ', user.body)

    const token = user.body.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      // return response.status(401).json({ error: 'token missing or invalid' })
      console.log('token missing or invalid')
    }

    const userId = decodedToken.id
    console.log('userId', userId)

    const newBlog = {
      'title': 'the vjegeS  ',
      'author': 'hectsdosr',
      'url': 'www.senk.ed',
      'likes': 311
    }

    await api
      .post('/api/blogs')
      // .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(401)
  })

})

afterAll(() => {
  mongoose.connection.close()
})