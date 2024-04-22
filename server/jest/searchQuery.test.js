const request = require('supertest');

const app = require('../server');

// Test suite
describe('GET /search/:query', () => {
  it('responds with user data for a valid query', async () => {
    const queries = ['Clementine Bauch', 'Samantha', 'Nathan@yesenia.net', 'ramiro.info'];
    for (const query of queries) {
      const response = await request(app).get(`/search/${query}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        address: {
          street: expect.any(String),
          suite: expect.any(String),
          city: expect.any(String),
          zipcode: expect.any(String),
          geo: {
            lat: expect.any(String),
            lng: expect.any(String)
          }
        },
        phone: expect.any(String),
        website: expect.any(String),
        company: {
          name: expect.any(String),
          catchPhrase: expect.any(String),
          bs: expect.any(String)
        }});
    }
  });

  it('responds with "User not found" for an invalid query', async () => {
    const response = await request(app).get(`/search/invalidquery`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });
});
