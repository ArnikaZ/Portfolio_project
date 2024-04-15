const request = require('supertest'); // Moduł do testowania aplikacji HTTP w Node.js

const app = require('./server');

// definiowanie testu jednostkowego dla endpointu /posts:
describe('GET /posts', () => {
  it('responds with an array of posts', async () => {
    const response = await request(app).get('/posts'); // Wysłanie żądania GET do endpointu /posts za pomocą biblioteki `supertest`
    expect(response.statusCode).toBe(200); // Sprawdzenie, czy status odpowiedzi jest równy 200 (OK)
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(100);
  });
  });


  describe('GET /posts?user=TestUser', () => {
    it('filters posts by the specified user', async () => {
      const testUser = 'Leanne Graham';
      const response = await request(app).get(`/posts?user=${testUser}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      
      // Assuming 'TestUser' has at least one post for this test case to be meaningful
      expect(response.body.length).toBeGreaterThan(0); 
      response.body.forEach(post => {
        expect(post.user).toEqual(testUser);
      });
    });
  });

  describe('GET /posts sorted by user', () => {
    it('sorts posts by user in ascending order', async () => {
      const response = await request(app).get('/posts?sortby=user&order=asc');
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
  
      let isSortedAscending = true;
      for (let i = 0; i < response.body.length - 1; i++) {
        if (response.body[i].user.localeCompare(response.body[i + 1].user) > 0) {
          isSortedAscending = false;
          break;
        }
      }
  
      expect(isSortedAscending).toBeTruthy();
    });
  });

  describe('GET /posts sorted by body length', () => {
    it('sorts posts by body length in ascending order', async () => {
      const response = await request(app).get('/posts?sortby=length&order=asc');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
  
      let isSortedAscending = true;
      for (let i = 0; i < response.body.length - 1; i++) {
        const currentPostLength = response.body[i].body.length;
        const nextPostLength = response.body[i + 1].body.length;
        if (currentPostLength > nextPostLength) {
          isSortedAscending = false;
          break;
        }
      }
  
      expect(isSortedAscending).toBeTruthy();
    });
  });

  describe('GET /posts between character numbers', () => {
    it('gets post between certain number of characters', async () => {
      const lengthMin = 111;
      const lengthMax = 131;
      const response = await request(app).get(`/posts?lengthMin=${lengthMin}&lengthMax=${lengthMax}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      
      for (const post of response.body) {
        const postLength = post.body.length;
        expect(postLength).toBeGreaterThanOrEqual(lengthMin);
        expect(postLength).toBeLessThanOrEqual(lengthMax);
      }
    });
  });

  describe('GET /posts limited to certain number', () => {
    it('gets a certain number of posts', async () => {
      const limit = 10;
      const response = await request(app).get(`/posts?limit=${limit}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(limit);
    });
  });





