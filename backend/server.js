const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
const apiURL = 'https://jsonplaceholder.typicode.com';

app.use(cors());

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

    res.json(result);
    /*
    example response:
    [
        {
            "userId": 9,
            "id": 84,
            "title": "optio ipsam molestias necessitatibus occaecati facilis veritatis dolores aut",
            "body": "sint molestiae magni a et quos\neaque et quasi\nut rerum debitis similique veniam\nrecusandae dignissimos dolor incidunt consequatur odio",
            "length": 134,
            "user": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io"
        },
        {
            "userId": 9,
            "id": 90,
            "title": "ad iusto omnis odit dolor voluptatibus",
            "body": "minus omnis soluta quia\nqui sed adipisci voluptates illum ipsam voluptatem\neligendi officia ut in\neos soluta similique molestias praesentium blanditiis",
            "length": 151,
            "user": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io"
        }
    ]
    */
});

// get a particular user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const users = await fetch(`${apiURL}/users`).then((response) => response.json());
    const user = users.find((user) => user.id == id);

    const recentPosts = await fetch(`http://localhost:3001/posts?user=${user.name}&sortby=id&order=desc&limit=3`).then(response => response.json());

    const albums = await fetch(`${apiURL}/albums`).then(response => response.json());
    const userAlbums = albums.filter((album) => album.userId == id)

    const result = {
        ...user,
        albums: userAlbums,
        recentPosts: recentPosts,
    };

    res.json(result);
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

    res.json(result);
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
        res.json(user);
    } else {
        res.json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});