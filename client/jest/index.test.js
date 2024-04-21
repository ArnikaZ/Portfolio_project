/**
 * @jest-environment jsdom
 */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM();

// Wczytujemy obiekt window z obiektu DOM
global.window = dom.window;

// Wczytujemy obiekt document z obiektu window
global.document = dom.window.document;

// Importujemy funkcję renderPosts
const { renderPosts, fetchPosts, filterPosts, addPost } = require('../index'); // Zakładając, że renderPosts jest zdefiniowane w osobnym pliku

const posts = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        "length": 158,
        "user": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
        "length": 206,
        "user": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        "length": 164,
        "user": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        "length": 190,
        "user": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    },
    {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        "length": 147,
        "user": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    }
];

// Testujemy funkcję renderPosts
describe('renderPosts function', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="Posts"></div>';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders posts correctly', () => {

        const postsContainer = document.getElementById('Posts');
        renderPosts(posts, postsContainer);
        const firstPost = postsContainer.children[0];
        expect(firstPost.querySelector('#Name').textContent).toBe(posts[0].user);
        expect(firstPost.querySelector('#Post_title1').textContent).toBe(posts[0].title);
        expect(firstPost.querySelector('#Post_text').textContent).toBe(posts[0].body);
    });
});

describe ('fetchPosts function', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="Posts"></div>';
        fetch = jest.fn().mockResolvedValueOnce({ json: () => posts });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        fetch.mockRestore();
    });

    it('fetches posts correctly', async () => {
        const postsContainer = document.getElementById('Posts');
        await fetchPosts(postsContainer);
        const firstPost = postsContainer.children[0];
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts');
        expect(postsContainer.children.length).toBe(posts.length);
        expect(firstPost.querySelector('#Name').textContent).toBe(posts[0].user);
        expect(firstPost.querySelector('#Post_title1').textContent).toBe(posts[0].title);
        expect(firstPost.querySelector('#Post_text').textContent).toBe(posts[0].body);
    });
});

describe ('filterPosts function', () => {

    beforeEach(() => {
        document.body.innerHTML = '<div id="Posts"></div>';
        fetch = jest.fn();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        fetch.mockRestore();
    });

    it('filters posts by user correctly', async () => {
        // todo
    });
});

describe ('addPost function', () => {

    beforeEach(() => {
        fetch = jest.fn();
    });

    afterEach(() => {
        fetch.mockRestore();
    });

    it('adds post correctly', async () => {
        // todo
    });
});