const request = require('supertest');

const app = require('../server');

// Blok Opisujący Testy Dotyczące /users/:id Endpoint:
// Stworzenie bloku testów za pomocą funkcji describe dla ścieżki /users/:id.
describe('GET /users/:id', () => {
    // sprawdzenie, czy aplikacja odpowiednio odpowiada na poprawne żądanie danych użytkownika.
  it('responds with user data for a valid user ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/users/${userId}`);

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
      },
      albums: expect.any(Array),
      recentPosts: expect.any(Array)
  });
  });
  // sprawdzenie, czy aplikacja odpowiada poprawnym kodem błędu i komunikatem dla nieprawidłowego ID użytkownika.
  it('responds with 404 for an invalid user ID', async () => {
    const invalidUserId = 1000; // Assuming this ID does not exist
    const response = await request(app).get(`/users/${invalidUserId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
  });
});