const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

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

}, 100000)

afterAll(() => {
  mongoose.connection.close()
})