const { test , after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')





const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
})

test('notes are returned as json', () => {
    api.
    get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 4)
})

test('the first blog deals with React Patterns', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(e => e.title)
    assert(title.includes('React patterns'))
})


 test('a valid blog object can be added', async () => {
    const newBlog =  {
        
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        
      }

     await api.
         post('/api/blogs')
         .send(newBlog)
         .expect(201)
         .expect('Content-Type', /application\/json/)
         

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Go To Statement Considered Harmful'))
 })


 test.only('blog without title is not added', async () => {
  const newBlog = {
    
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    
  }

  await api.
         post('/api/blogs')
         .send(newBlog)
         .expect(400)

  const response = await api.get('/api/blogs')       
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


 after(async () => {
    await mongoose.connection.close()
    console.log('closing database connection')
})