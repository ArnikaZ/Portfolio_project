const request = require('supertest');

const app = require('../server');

describe('GET /albums/:id', () => {
  it('responds with albums and their photos for a valid user ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/albums/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  })
  it('responds with an empty object for a user ID with no albums', async () => {
    // Assuming userID 999 does not have any albums
    const userId = 999;
    const response = await request(app).get(`/albums/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
});
