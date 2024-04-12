const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const apiURL = 'https://jsonplaceholder.typicode.com';

app.use(cors());
app.use(express.json());

// get all posts (sorted, filtered, and limited)
app.get('/posts', async (req, res) => {
    const { sortby, order, user, lengthMin, lengthMax, limit } = req.query;

    const users = await fetch(`${apiURL}/users`).then((response) => response.json());

    const posts = await fetch(`${apiURL}/posts`).then((response) => response.json());

    var result = [];

    for (const post of posts) {
        const user = users.find((user) => user.id === post.userId);
        result.push({
            ...post,
            length: post.body.length,
            user: user.name,
            username: user.username,
            email: user.email,
        });
    }

    // TODO: sort by last name and make order optional
    if (sortby && order) {
        result.sort((a, b) => {
            if (order === 'asc') {
                return a[sortby] > b[sortby] ? 1 : -1;
            } else {
                return a[sortby] < b[sortby] ? 1 : -1;
            }
        });
    }

    if (user) {
        result = result.filter((post) => post.user === user);
    }

    if (lengthMin && lengthMax) {
        result = result.filter((post) => post.length >= lengthMin && post.length <= lengthMax);
    }

    if (limit) {
        result = result.slice(0, limit);
    }

    res.status(200).json(result);
});

// get a particular user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const users = await fetch(`${apiURL}/users`).then((response) => response.json());
    const user = users.find((user) => user.id == id);

    // if user doesn't exist
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    const recentPosts = await fetch(`http://localhost:3001/posts?user=${user.name}&sortby=id&order=desc&limit=3`).then(response => response.json());

    const albums = await fetch(`${apiURL}/albums`).then(response => response.json());
    const userAlbums = albums.filter((album) => album.userId == id)

    const result = {
        ...user,
        albums: userAlbums,
        recentPosts: recentPosts,
    };
    res.status(200).json(result);
});

// get all albums of a particular user
app.get('/albums/:id', async (req, res) => {
    const { id } = req.params;

    const result = {};

    const albums = await fetch(`${apiURL}/albums`).then((response) => response.json());
    const userAlbums = albums.filter((album) => album.userId == id);

    for (const album of userAlbums) {
        const photos = await fetch(`${apiURL}/photos`).then(response => response.json());
        const albumPhotos = photos.filter(photo => photo.albumId == album.id);
        result[album.id] = albumPhotos.map(photo => ({ ...photo }));
    }

    res.status(200).json(result);
});


// search for a user
app.get('/search/:query', async (req, res) => {
    const { query } = req.params;

    const users = await fetch(`${apiURL}/users`).then((response) => response.json());

    // checking by name, username, email, and website
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
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// post a post
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

    res.status(200).json(result);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} 

module.exports = app;