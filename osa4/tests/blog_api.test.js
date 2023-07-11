const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('GET-tests', () => {
    test('returns right amount of blogs as JSON', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(2)
    })
    test('identification is named id', async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map(b => b.id)

        expect(ids).toBeDefined()
    })
})
describe('POST-tests', () => {
    test('post works and blog is saved in right format', async () => {
        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allNotes = await api.get('/api/blogs')
        expect(allNotes.body).toHaveLength(initialBlogs.length + 1)
    })
    test('if likes is not defined, set it to 0', async () => {
        const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blog = await Blog.findOne({ title: 'Type wars' })
        expect(blog.likes).toBe(0)
    })
})
// npm test -- -t 'DELETE-tests' suorittaa vain yhden testin, muuten npm test suorittaa kaikki
describe('DELETE-tests', () => {
    test('is able to delete one blog with id', async () => {
        const blogs = await Blog.find({})
        const blogDlt = blogs[0]

        await api
            .delete(`/api/blogs/${blogDlt.id}`)
            .expect(204)
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mterho',
        name: 'Mikko Terho',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })


afterAll(async () => {
    await mongoose.connection.close()
})