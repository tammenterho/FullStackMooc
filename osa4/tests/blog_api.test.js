const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are only one blog', async () => {
    const response = await api.get('/api/blogs');
         expect(response.body).toHaveLength(1)
})

test('blogs have id field instead of _id', async () => {
    const response = await api.get('/api/blogs');

    const blog = response.body[0];
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();

});

afterAll(async () => {
  await mongoose.connection.close()
})