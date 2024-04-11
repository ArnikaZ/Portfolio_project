//zy aplikacja Express prawidłowo obsługuje endpoint /posts, czy zwraca oczekiwaną odpowiedź (tj. tablicę postów) i czy wykonuje zapytanie do odpowiedniego zewnętrznego źródła danych (JSONPlaceholder).


const request = require('supertest'); // Moduł do testowania aplikacji HTTP w Node.js
const express = require('express'); // Framework do tworzenia aplikacji webowych w Node.js
const cors = require('cors'); // Middleware do obsługi Cross-Origin Resource Sharing (CORS)

const app = express(); // Inicjalizacja aplikacji Express
app.use(cors()); // Dodanie obsługi CORS do aplikacji Express
app.use(express.json()); // Dodanie parsera JSON do aplikacji Express

const fetch = jest.fn(() => // Mockowanie funkcji fetch za pomocą biblioteki `jest`
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, userId: 1, title: 'Test Post', body: 'This is a test', user: 'Test User' }]),
  })
);


// Definiowanie endpointu /posts, który pobiera dane z zewnętrznego źródła (w tym przypadku z serwera JSONPlaceholder):
app.get('/posts', async (req, res) => {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json());
  res.json(posts);
});



global.fetch = fetch; // Ustawienie mockowanej funkcji fetch jako globalnej, aby była dostępna dla całej aplikacji



// definiowanie testu jednostkowego dla endpointu /posts:
describe('GET /posts', () => {
  it('responds with an array of posts', async () => {
    const response = await request(app).get('/posts'); // Wysłanie żądania GET do endpointu /posts za pomocą biblioteki `supertest`
    expect(response.statusCode).toBe(200); // Sprawdzenie, czy status odpowiedzi jest równy 200 (OK)
    expect(response.body).toEqual([{ id: 1, userId: 1, title: 'Test Post', body: 'This is a test', user: 'Test User' }]);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts'); // Sprawdzenie, czy funkcja fetch została wywołana z właściwym adresem URL
  });
  });


  describe('GET /posts?user=TestUser', () => {
    it('filters posts by the specified user', async () => {
      const response = await request(app).get('/posts?user=TestUser');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      
      // Assuming 'TestUser' has at least one post for this test case to be meaningful
      expect(response.body.length).toBeGreaterThan(0); 
      response.body.forEach(post => {
        expect(post.user).toEqual('Test User');
      });
    });
  });






  describe('GET /posts sorted by userId', () => {
    it('sorts posts by userId in ascending order', async () => {
      const response = await request(app).get('/posts?sortby=userId&order=asc');
  
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  
      // Assuming there are posts and the response is not empty,
      // check if they are sorted in ascending order by userId
      let isSortedAscending = true;
      for (let i = 0; i < response.body.length - 1; i++) {
        if (response.body[i].userId > response.body[i + 1].userId) {
          isSortedAscending = false;
          break;
        }
      }
  
      expect(isSortedAscending).toBeTruthy();
    });
  });



  describe('GET /posts sorted by username', () => {
    it('sorts posts by username in ascending order', async () => {
      const response = await request(app).get('/posts?sortby=username&order=asc');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  
      // Assuming that the API response includes username information within each post
      // and that there are sufficient posts for a meaningful test
      let isSortedAscending = true;
      for (let i = 0; i < response.body.length - 1; i++) {
        if (response.body[i].username.localeCompare(response.body[i + 1].username) > 0) {
          isSortedAscending = false;
          break;
        }
      }
  
      expect(isSortedAscending).toBe(true);
    });
  });


  describe('GET /posts sorted by body length', () => {
    it('sorts posts by body length in ascending order', async () => {
      const response = await request(app).get('/posts?sortby=length&order=asc');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  
      // Verify that posts are sorted in ascending order by body length
      let isSortedAscending = true;
      for (let i = 0; i < response.body.length - 1; i++) {
        const currentPostLength = response.body[i].body.length;
        const nextPostLength = response.body[i + 1].body.length;
        if (currentPostLength > nextPostLength) {
          isSortedAscending = false;
          break;
        }
      }
  
      expect(isSortedAscending).toBe(true);
    });
  });





