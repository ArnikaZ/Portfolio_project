const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const apiURL = 'https://jsonplaceholder.typicode.com';

// Mock `fetch` implementation
const fetch = jest.fn((url) =>
  Promise.resolve({
    json: () => {
      if (url === `${apiURL}/users`) {
        // Mock response for fetching users
        return Promise.resolve([
          { id: 1, name: 'John Doe', username: 'johnd', email: 'johndoe@example.com', website: 'johndoe.com' },
          { id: 2, name: 'Jane Doe', username: 'janed', email: 'janedoe@example.com', website: 'janedoe.com' }
        ]);
      }
    },
  })
);

// Route definition
app.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  const users = await fetch(`${apiURL}/users`).then((response) => response.json());

  var user = null;
  for (const u of users) {
    if (u.name.toLowerCase() === query.toLowerCase() ||
        u.username.toLowerCase() === query.toLowerCase() ||
        u.email.toLowerCase() === query.toLowerCase() ||
        u.website.toLowerCase() === query.toLowerCase()) {
        user = u;
        break;
    }
  }

  if (user) {
    res.json(user);
  } else {
    res.json({ message: 'User not found' });
  }
});

// Assign fetch mock to global
global.fetch = fetch;

// Test suite
describe('GET /search/:query', () => {
  it('responds with user data for a valid query', async () => {
    const queries = ['John Doe', 'johnd', 'johndoe@example.com', 'johndoe.com'];
    for (const query of queries) {
      const response = await request(app).get(`/search/${query}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        username: 'johnd',
        email: 'johndoe@example.com',
        website: 'johndoe.com'
      });
      expect(fetch).toHaveBeenCalledWith(`${apiURL}/users`);
    }
  });

  it('responds with "User not found" for an invalid query', async () => {
    const response = await request(app).get(`/search/invalidquery`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'User not found' });
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/users`);
  });
});
