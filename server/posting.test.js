const request = require('supertest');

const app = require('./server');

// Test suite for POST /posts endpoint
describe('POST /posts', () => {
  it('successfully creates a new post', async () => {
    const newPost = {
      content: 'This is a test post',
      author: 'Test Author'
    };

    const response = await request(app)
      .post('/posts')
      .send(newPost)
      .expect('Content-Type', /json/)
      .expect(200);

    // Expect the response body to equal the new post data
    expect(response.body).toEqual({
      ...newPost,
      id: 101
    });
  });
});
