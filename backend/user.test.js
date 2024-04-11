const request = require('supertest'); // moduł jest używany do wykonywania żądań HTTP do aplikacji Express.js w celach testowych.
const express = require('express');
const cors = require('cors');


const app = express();

// Definiujemy funkcję fetch jako mokowanie, które zwraca obietnicę z danymi użytkownika w postaci tablicy. Ten kawałek kodu służy do symulowania zapytania do zewnętrznego API.
const fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Test User' }]),
  })
);


app.use(cors());
app.use(express.json());

// Tworznie obsługi końcowej dla ścieżki /users/:id, która pobiera ID użytkownika z parametrów żądania.
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  // Symulacja pobierania danych użytkownika za pomocą funkcji fetch z zewnętrznego API.
  const userData = await fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
    response.json()
  );

  // Znalezienie użytkownika o określonym ID i odpowiadamy z danymi użytkownika.
  const user = userData.find((user) => user.id == id);
  // Jeśli użytkownik nie istnieje, zwracamy odpowiedni komunikat błędu.
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Respond with the user data
  res.json(user);
});

// Ustawienie mokowanie fetch globalnie, aby było dostępne we wszystkich testach.
global.fetch = fetch;

// Blok Opisujący Testy Dotyczące /users/:id Endpoint:
// Stworzenie bloku testów za pomocą funkcji describe dla ścieżki /users/:id.
describe('GET /users/:id', () => {
    // sprawdzenie, czy aplikacja odpowiednio odpowiada na poprawne żądanie danych użytkownika.
  it('responds with user data for a valid user ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/users/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Test User' });
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
  // sprawdzenie, czy aplikacja odpowiada poprawnym kodem błędu i komunikatem dla nieprawidłowego ID użytkownika.
  it('responds with 404 for an invalid user ID', async () => {
    const invalidUserId = 1000; // Assuming this ID does not exist
    const response = await request(app).get(`/users/${invalidUserId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' }); 
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});




