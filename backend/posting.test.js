const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const apiURL = 'https://jsonplaceholder.typicode.com';

// Mock `fetch` implementation for POST request
const fetch = jest.fn((url, options) => {
  if (url === `${apiURL}/posts` && options.method === 'POST') {
    // Assume the external API simply echoes back the post data for the purpose of this mock.
    return Promise.resolve({
      json: () => Promise.resolve(JSON.parse(options.body))
    });
  }
});

app.post('/posts', async (req, res) => {
  const { content, author } = req.body;

  const result = await fetch(`${apiURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      author
    })
  }).then(response => response.json());

  res.json(result);
});

// Assign fetch mock to global
global.fetch = fetch;

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
    expect(response.body).toEqual(newPost);

    // Verify fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    });
  });
});
