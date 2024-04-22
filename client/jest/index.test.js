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

    it('sorts posts by user correctly', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => [
            {
                "userId": 10,
                "id": 99,
                "title": "temporibus sit alias delectus eligendi possimus magni",
                "body": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia",
                "length": 109,
                "user": "Clementina DuBuque",
                "username": "Moriah.Stanton",
                "email": "Rey.Padberg@karina.biz"
            },
            {
                "userId": 3,
                "id": 27,
                "title": "quasi id et eos tenetur aut quo autem",
                "body": "eum sed dolores ipsam sint possimus debitis occaecati\ndebitis qui qui et\nut placeat enim earum aut odit facilis\nconsequatur suscipit necessitatibus rerum sed inventore temporibus consequatur",
                "length": 190,
                "user": "Clementine Bauch",
                "username": "Samantha",
                "email": "Nathan@yesenia.net"
            },
            {
                "userId": 2,
                "id": 12,
                "title": "in quibusdam tempore odit est dolorem",
                "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
                "length": 152,
                "user": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv"
            }
        ]});

        const postsContainer = document.getElementById('Posts');
        await filterPosts(postsContainer, 'user', 'asc', '',  '', '');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts?sortby=user&order=asc&user=&lengthMin=&lengthMax=');
        expect(postsContainer.children.length).toBe(3);
        expect(postsContainer.children[0].querySelector('#Name').textContent).toBe('Clementina DuBuque');
        expect(postsContainer.children[1].querySelector('#Name').textContent).toBe('Clementine Bauch');
        expect(postsContainer.children[2].querySelector('#Name').textContent).toBe('Ervin Howell');
    });

    it('sorts posts by length correctly', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => [
            {
                "userId": 10,
                "id": 99,
                "title": "temporibus sit alias delectus eligendi possimus magni",
                "body": "quo deleniti praesentium dicta non quod\naut est molestias\nmolestias et officia quis nihil\nitaque dolorem quia",
                "length": 109,
                "user": "Clementina DuBuque",
                "username": "Moriah.Stanton",
                "email": "Rey.Padberg@karina.biz"
            },
            {
                "userId": 8,
                "id": 78,
                "title": "quam voluptatibus rerum veritatis",
                "body": "nobis facilis odit tempore cupiditate quia\nassumenda doloribus rerum qui ea\nillum et qui totam\naut veniam repellendus",
                "length": 117,
                "user": "Nicholas Runolfsdottir V",
                "username": "Maxime_Nienow",
                "email": "Sherwood@rosamond.me"
            },
            {
                "userId": 7,
                "id": 64,
                "title": "et fugit quas eum in in aperiam quod",
                "body": "id velit blanditiis\neum ea voluptatem\nmolestiae sint occaecati est eos perspiciatis\nincidunt a error provident eaque aut aut qui",
                "length": 128,
                "user": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz"
            }
        ]});

        const postsContainer = document.getElementById('Posts');
        await filterPosts(postsContainer, 'length', 'asc', '', '', '');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts?sortby=length&order=asc&user=&lengthMin=&lengthMax=');
        expect(postsContainer.children.length).toBe(3);
        expect(postsContainer.children[0].querySelector('#Name').textContent).toBe('Clementina DuBuque');
        expect(postsContainer.children[1].querySelector('#Name').textContent).toBe('Nicholas Runolfsdottir V');
        expect(postsContainer.children[2].querySelector('#Name').textContent).toBe('Kurtis Weissnat');
    });

    it('filters posts by user correctly', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => [
            {
                "userId": 7,
                "id": 65,
                "title": "consequatur id enim sunt et et",
                "body": "voluptatibus ex esse\nsint explicabo est aliquid cumque adipisci fuga repellat labore\nmolestiae corrupti ex saepe at asperiores et perferendis\nnatus id esse incidunt pariatur",
                "length": 173,
                "user": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz"
            },
            {
                "userId": 7,
                "id": 66,
                "title": "repudiandae ea animi iusto",
                "body": "officia veritatis tenetur vero qui itaque\nsint non ratione\nsed et ut asperiores iusto eos molestiae nostrum\nveritatis quibusdam et nemo iusto saepe",
                "length": 147,
                "user": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz"
            },
            {
                "userId": 7,
                "id": 67,
                "title": "aliquid eos sed fuga est maxime repellendus",
                "body": "reprehenderit id nostrum\nvoluptas doloremque pariatur sint et accusantium quia quod aspernatur\net fugiat amet\nnon sapiente et consequatur necessitatibus molestiae",
                "length": 162,
                "user": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz"
            },
            {
                "userId": 7,
                "id": 68,
                "title": "odio quis facere architecto reiciendis optio",
                "body": "magnam molestiae perferendis quisquam\nqui cum reiciendis\nquaerat animi amet hic inventore\nea quia deleniti quidem saepe porro velit",
                "length": 131,
                "user": "Kurtis Weissnat",
                "username": "Elwyn.Skiles",
                "email": "Telly.Hoeger@billy.biz"
            }
        ]});

        const postsContainer = document.getElementById('Posts');
        await filterPosts(postsContainer, '', '', 'Kurtis Weissnat', '', '');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts?sortby=&order=&user=Kurtis Weissnat&lengthMin=&lengthMax=');
        expect(postsContainer.children.length).toBe(4);
        expect(postsContainer.children[0].querySelector('#Name').textContent).toBe('Kurtis Weissnat');
        expect(postsContainer.children[1].querySelector('#Name').textContent).toBe('Kurtis Weissnat');
        expect(postsContainer.children[2].querySelector('#Name').textContent).toBe('Kurtis Weissnat');
        expect(postsContainer.children[3].querySelector('#Name').textContent).toBe('Kurtis Weissnat');
    });

    it('filters posts by length correctly', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => [
            {
                "userId": 8,
                "id": 76,
                "title": "doloremque officiis ad et non perferendis",
                "body": "ut animi facere\ntotam iusto tempore\nmolestiae eum aut et dolorem aperiam\nquaerat recusandae totam odio",
                "length": 102,
                "user": "Nicholas Runolfsdottir V",
                "username": "Maxime_Nienow",
                "email": "Sherwood@rosamond.me"
            },
            {
                "userId": 9,
                "id": 87,
                "title": "nostrum quis quasi placeat",
                "body": "eos et molestiae\nnesciunt ut a\ndolores perspiciatis repellendus repellat aliquid\nmagnam sint rem ipsum est",
                "length": 106,
                "user": "Glenna Reichert",
                "username": "Delphine",
                "email": "Chaim_McDermott@dana.io"
            },
            {
                "userId": 9,
                "id": 88,
                "title": "sapiente omnis fugit eos",
                "body": "consequatur omnis est praesentium\nducimus non iste\nneque hic deserunt\nvoluptatibus veniam cum et rerum sed",
                "length": 106,
                "user": "Glenna Reichert",
                "username": "Delphine",
                "email": "Chaim_McDermott@dana.io"
            }
        ]});

        const postsContainer = document.getElementById('Posts');
        await filterPosts(postsContainer, '', '', '', '100', '108');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts?sortby=&order=&user=&lengthMin=100&lengthMax=108');
        expect(postsContainer.children.length).toBe(3);
        expect(postsContainer.children[0].querySelector('#Name').textContent).toBe('Nicholas Runolfsdottir V');
        expect(postsContainer.children[1].querySelector('#Name').textContent).toBe('Glenna Reichert');
        expect(postsContainer.children[2].querySelector('#Name').textContent).toBe('Glenna Reichert');
    });
});

describe('addPost function', () => {
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        fetch = jest.fn();
    });

    afterEach(() => {
        window.alert.mockRestore();
        fetch.mockRestore();
    });

    it('adds post correctly', async () => {
        const content = 'Test content';
        const userId = 3;

        const mockResponse = {
            content: content,
            userId: userId,
            id: 101
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse)
        });

        await addPost({ content, userId });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                author: userId
            })
        });

        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('Post added successfully');
    });
});

describe('DOMContentLoaded event handler', () => {

    let spyFilterPosts;
    let spyAddPost;

    beforeEach(() => {
        spyFilterPosts = jest.spyOn({ filterPosts }, 'filterPosts').mockReturnValue(undefined);
        spyAddPost = jest.spyOn({ addPost }, 'addPost').mockReturnValue(undefined);
        fetch = jest.fn();

        document.body.innerHTML = `
            <div id="Posts"></div>
            <form id="left_container">
            <p class="left_side">Sort by</p>
            <input type="radio" name="sort_btn" id="radio1" class="radio" value="user">
            <label for="radio1" class="left_side">User</label>
            <br>
            <input type="radio" name="sort_btn" id="radio2" class="radio" value="length">
            <label for="radio2" class="left_side">Length</label>
            <p class="left_side">Filter by</p>
            <div>
                <label for="filter_user" class="left_side">User</label>
                <input type="text" id="filter_user" name="filter_user">
                <br>
                <label for="filter_length_from" class="left_side">Length from</label>
                <input type="number" id="filter_length_from" name="filter_length_from" min="1">
                <label for="filter_length_to" class="left_side">up to</label>
                <input type="number" id="filter_length_to" name="filter_length_to" min="1">
            </div>
            <button type="submit">Sumbit</button>
            </form>
            <form id="post_adding">
                <p>Welcome, <span id="Name">Clementine Bauch</span></p>
                <textarea name="content" placeholder="What's on your mind?"></textarea>
                <input id="post_button" type="submit" value="Post">
            </form>
        `;
        const postsContainer = document.getElementById('Posts');
        const form = document.querySelector('#left_container');
        const postForm = document.querySelector('#post_adding');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            const sortby = document.querySelector('#radio2').value;
            const order = 'asc';
            const user = document.querySelector('#filter_user').value;
            const lengthMin = parseInt(document.querySelector('#filter_length_from').value);
            const lengthMax = parseInt(document.querySelector('#filter_length_to').value);
            spyFilterPosts(postsContainer, sortby, order, user, lengthMin, lengthMax);
        });

        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.querySelector('#post_adding textarea').value;
            const userId = 3;
            spyAddPost({ content: content, userId: userId });
        });
    });

    afterEach(() => {
        fetch.mockRestore();
        document.body.innerHTML = '';
        spyFilterPosts.mockRestore();
        spyAddPost.mockRestore();
    });

    it('fetches posts on DOMContentLoaded', async () => {
        fetch.mockResolvedValueOnce({ json: () => [] });

        document.dispatchEvent(new Event('DOMContentLoaded'));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts');
    });

    it('submits form on submit event', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => []});

        const postsContainer = document.getElementById('Posts');
        const form = document.querySelector('#left_container');

        let sortby = document.querySelector('#radio2');
        sortby.setAttribute('value', 'length');
        let order = 'asc';
        let user = document.querySelector('#filter_user');
        user.setAttribute('value', 'Clementine Bauch');
        let lengthMin = document.querySelector('#filter_length_from');
        lengthMin.setAttribute('value', 100);
        let lengthMax = document.querySelector('#filter_length_to');
        lengthMax.setAttribute('value', 200);

        console.log(form);

        form.dispatchEvent(new Event('submit'));

        await new Promise(resolve => setTimeout(resolve));

        expect(spyFilterPosts).toHaveBeenCalledWith(postsContainer, 'length', 'asc', 'Clementine Bauch', 100, 200);

        spyFilterPosts.mockRestore();
    });

    it('adds post on submit event', async () => {
        fetch = jest.fn().mockResolvedValueOnce({json: () => []});

        const postForm = document.querySelector('#post_adding');

        const content = document.querySelector('#post_adding textarea');
        content.value = 'Test content';
        const userId = 3;

        postForm.dispatchEvent(new Event('submit'));

        await new Promise(resolve => setTimeout(resolve));

        expect(spyAddPost).toHaveBeenCalledWith({ content: 'Test content', userId: 3 });

        spyAddPost.mockRestore();
    });
});

