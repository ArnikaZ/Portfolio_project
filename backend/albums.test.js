const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Setting the API URL for easier reference
const apiURL = 'https://jsonplaceholder.typicode.com';

// Mock `fetch` implementation
const fetch = jest.fn((url) =>
  Promise.resolve({
    json: () => {
      if (url === `${apiURL}/albums`) {
        // Mock response for fetching albums
        return Promise.resolve([{ id: 1, userId: 1 }, { id: 2, userId: 1 }]);
      } else if (url.startsWith(`${apiURL}/photos`)) {
        // Mock response for fetching photos for albums
        return Promise.resolve([
          { albumId: 1, id: 1, title: 'Photo 1' },
          { albumId: 1, id: 2, title: 'Photo 2' },
          { albumId: 2, id: 3, title: 'Photo 3' },
        ]);
      }
    },
  })
);

// Route definition
app.get('/albums/:id', async (req, res) => {
  const { id } = req.params;
  const result = {};

  const albums = await fetch(`${apiURL}/albums`).then((response) => response.json());
  const userAlbums = albums.filter((album) => album.userId == parseInt(id));

  for (const album of userAlbums) {
    const photos = await fetch(`${apiURL}/photos`).then((response) => response.json());
    const albumPhotos = photos.filter((photo) => photo.albumId == album.id);
    result[album.id] = albumPhotos;
  }

  res.json(result);
});

// Assign fetch mock to global
global.fetch = fetch;

// Test suite
describe('GET /albums/:id', () => {
  it('responds with albums and their photos for a valid user ID', async () => {
    const userId = 1;
    const response = await request(app).get(`/albums/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "1": [{ albumId: 1, id: 1, title: 'Photo 1' }, { albumId: 1, id: 2, title: 'Photo 2' }],
      "2": [{ albumId: 2, id: 3, title: 'Photo 3' }]
    });
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/albums`);
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/photos`);
  });

  it('responds with an empty object for a user ID with no albums', async () => {
    // Assuming userID 999 does not have any albums
    const userId = 999;
    const response = await request(app).get(`/albums/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/albums`);
    expect(fetch).toHaveBeenCalledWith(`${apiURL}/photos`);
  });
});
