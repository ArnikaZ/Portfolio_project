/**
 * @jest-environment jsdom
 */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('', { url: 'http://localhost:3001/users/2' });

// Wczytujemy obiekt window z obiektu DOM
global.window = dom.window;

// Wczytujemy obiekt document z obiektu window
global.document = dom.window.document;

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

const { renderProfile, renderGalleryContent, loadProfile, loadGalleryContent } = require('../photoAlbum');

const profile = {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
        }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
    },
    "albums": [
        {
            "userId": 2,
            "id": 11,
            "title": "quam nostrum impedit mollitia quod et dolor"
        },
        {
            "userId": 2,
            "id": 12,
            "title": "consequatur autem doloribus natus consectetur"
        },
        {
            "userId": 2,
            "id": 13,
            "title": "ab rerum non rerum consequatur ut ea unde"
        },
        {
            "userId": 2,
            "id": 14,
            "title": "ducimus molestias eos animi atque nihil"
        },
        {
            "userId": 2,
            "id": 15,
            "title": "ut pariatur rerum ipsum natus repellendus praesentium"
        },
        {
            "userId": 2,
            "id": 16,
            "title": "voluptatem aut maxime inventore autem magnam atque repellat"
        },
        {
            "userId": 2,
            "id": 17,
            "title": "aut minima voluptatem ut velit"
        },
        {
            "userId": 2,
            "id": 18,
            "title": "nesciunt quia et doloremque"
        },
        {
            "userId": 2,
            "id": 19,
            "title": "velit pariatur quaerat similique libero omnis quia"
        },
        {
            "userId": 2,
            "id": 20,
            "title": "voluptas rerum iure ut enim"
        }
    ],
    "recentPosts": [
        {
            "userId": 2,
            "id": 20,
            "title": "doloribus ad provident suscipit at",
            "body": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo",
            "length": 213,
            "user": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv"
        },
        {
            "userId": 2,
            "id": 19,
            "title": "adipisci placeat illum aut reiciendis qui",
            "body": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas",
            "length": 143,
            "user": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv"
        },
        {
            "userId": 2,
            "id": 18,
            "title": "voluptate et itaque vero tempora molestiae",
            "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam",
            "length": 111,
            "user": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv"
        }
    ]
};

const album = [
    {
        "albumId": 11,
        "id": 501,
        "title": "asperiores exercitationem voluptates qui amet quae necessitatibus facere",
        "url": "https://via.placeholder.com/600/cda4c0",
        "thumbnailUrl": "https://via.placeholder.com/150/cda4c0"
    },
    {
        "albumId": 11,
        "id": 502,
        "title": "omnis qui sit et",
        "url": "https://via.placeholder.com/600/74e371",
        "thumbnailUrl": "https://via.placeholder.com/150/74e371"
    },
    {
        "albumId": 11,
        "id": 503,
        "title": "modi voluptas fugiat eos",
        "url": "https://via.placeholder.com/600/9022fb",
        "thumbnailUrl": "https://via.placeholder.com/150/9022fb"
    },
    {
        "albumId": 11,
        "id": 504,
        "title": "sapiente id vel dignissimos",
        "url": "https://via.placeholder.com/600/99dd3f",
        "thumbnailUrl": "https://via.placeholder.com/150/99dd3f"
    },
    {
        "albumId": 11,
        "id": 505,
        "title": "quam voluptatibus ea saepe",
        "url": "https://via.placeholder.com/600/1cb49b",
        "thumbnailUrl": "https://via.placeholder.com/150/1cb49b"
    },
    {
        "albumId": 11,
        "id": 506,
        "title": "maxime unde repudiandae similique reiciendis harum",
        "url": "https://via.placeholder.com/600/91f992",
        "thumbnailUrl": "https://via.placeholder.com/150/91f992"
    },
    {
        "albumId": 11,
        "id": 507,
        "title": "doloremque nulla ab in sed possimus",
        "url": "https://via.placeholder.com/600/dfe687",
        "thumbnailUrl": "https://via.placeholder.com/150/dfe687"
    },
    {
        "albumId": 11,
        "id": 508,
        "title": "et officiis maxime consequatur magnam",
        "url": "https://via.placeholder.com/600/c4e0b1",
        "thumbnailUrl": "https://via.placeholder.com/150/c4e0b1"
    },
    {
        "albumId": 11,
        "id": 509,
        "title": "eligendi cum voluptate ipsum alias laudantium in",
        "url": "https://via.placeholder.com/600/963d65",
        "thumbnailUrl": "https://via.placeholder.com/150/963d65"
    },
    {
        "albumId": 11,
        "id": 510,
        "title": "commodi labore impedit ipsam quasi dignissimos culpa ut",
        "url": "https://via.placeholder.com/600/4e59cd",
        "thumbnailUrl": "https://via.placeholder.com/150/4e59cd"
    },
    {
        "albumId": 11,
        "id": 511,
        "title": "officia tenetur sed",
        "url": "https://via.placeholder.com/600/4016ae",
        "thumbnailUrl": "https://via.placeholder.com/150/4016ae"
    },
    {
        "albumId": 11,
        "id": 512,
        "title": "tenetur delectus et ea ut quae quisquam necessitatibus",
        "url": "https://via.placeholder.com/600/a45dfe",
        "thumbnailUrl": "https://via.placeholder.com/150/a45dfe"
    },
    {
        "albumId": 11,
        "id": 513,
        "title": "et aut quas earum placeat eligendi sequi dolor ratione",
        "url": "https://via.placeholder.com/600/893903",
        "thumbnailUrl": "https://via.placeholder.com/150/893903"
    },
    {
        "albumId": 11,
        "id": 514,
        "title": "eveniet repellat sint molestiae enim non qui",
        "url": "https://via.placeholder.com/600/664a83",
        "thumbnailUrl": "https://via.placeholder.com/150/664a83"
    },
    {
        "albumId": 11,
        "id": 515,
        "title": "reprehenderit blanditiis voluptatum quae magni",
        "url": "https://via.placeholder.com/600/61c959",
        "thumbnailUrl": "https://via.placeholder.com/150/61c959"
    },
    {
        "albumId": 11,
        "id": 516,
        "title": "placeat quia voluptas quos aut nobis ut officia adipisci",
        "url": "https://via.placeholder.com/600/452ba6",
        "thumbnailUrl": "https://via.placeholder.com/150/452ba6"
    },
    {
        "albumId": 11,
        "id": 517,
        "title": "et omnis in rerum",
        "url": "https://via.placeholder.com/600/9c4d5d",
        "thumbnailUrl": "https://via.placeholder.com/150/9c4d5d"
    },
    {
        "albumId": 11,
        "id": 518,
        "title": "qui quia aspernatur officia quo est alias cupiditate",
        "url": "https://via.placeholder.com/600/a4b943",
        "thumbnailUrl": "https://via.placeholder.com/150/a4b943"
    },
    {
        "albumId": 11,
        "id": 519,
        "title": "ut minima nemo",
        "url": "https://via.placeholder.com/600/c44dff",
        "thumbnailUrl": "https://via.placeholder.com/150/c44dff"
    },
    {
        "albumId": 11,
        "id": 520,
        "title": "id quo et dicta et sed id omnis",
        "url": "https://via.placeholder.com/600/143863",
        "thumbnailUrl": "https://via.placeholder.com/150/143863"
    },
    {
        "albumId": 11,
        "id": 521,
        "title": "nesciunt molestiae et est laudantium nisi qui perspiciatis quibusdam",
        "url": "https://via.placeholder.com/600/7cc030",
        "thumbnailUrl": "https://via.placeholder.com/150/7cc030"
    },
    {
        "albumId": 11,
        "id": 522,
        "title": "ipsam assumenda dolores nulla id consequatur",
        "url": "https://via.placeholder.com/600/34f26b",
        "thumbnailUrl": "https://via.placeholder.com/150/34f26b"
    },
    {
        "albumId": 11,
        "id": 523,
        "title": "similique qui voluptatibus molestiae sed dicta sit",
        "url": "https://via.placeholder.com/600/59fd84",
        "thumbnailUrl": "https://via.placeholder.com/150/59fd84"
    },
    {
        "albumId": 11,
        "id": 524,
        "title": "nisi est dignissimos doloribus quisquam",
        "url": "https://via.placeholder.com/600/bd8435",
        "thumbnailUrl": "https://via.placeholder.com/150/bd8435"
    },
    {
        "albumId": 11,
        "id": 525,
        "title": "maiores nostrum nam consequatur illo ipsam",
        "url": "https://via.placeholder.com/600/7bccd9",
        "thumbnailUrl": "https://via.placeholder.com/150/7bccd9"
    },
    {
        "albumId": 11,
        "id": 526,
        "title": "ullam eum molestias facere",
        "url": "https://via.placeholder.com/600/e2374f",
        "thumbnailUrl": "https://via.placeholder.com/150/e2374f"
    },
    {
        "albumId": 11,
        "id": 527,
        "title": "laborum non occaecati tenetur ut repellendus",
        "url": "https://via.placeholder.com/600/ef43fa",
        "thumbnailUrl": "https://via.placeholder.com/150/ef43fa"
    },
    {
        "albumId": 11,
        "id": 528,
        "title": "accusamus dignissimos ad quo sint asperiores voluptas repellendus",
        "url": "https://via.placeholder.com/600/37efd",
        "thumbnailUrl": "https://via.placeholder.com/150/37efd"
    },
    {
        "albumId": 11,
        "id": 529,
        "title": "ipsa sint consequatur sint",
        "url": "https://via.placeholder.com/600/812555",
        "thumbnailUrl": "https://via.placeholder.com/150/812555"
    },
    {
        "albumId": 11,
        "id": 530,
        "title": "labore impedit cum distinctio sapiente eveniet praesentium et",
        "url": "https://via.placeholder.com/600/a08784",
        "thumbnailUrl": "https://via.placeholder.com/150/a08784"
    },
    {
        "albumId": 11,
        "id": 531,
        "title": "ut corrupti minima ut",
        "url": "https://via.placeholder.com/600/c55662",
        "thumbnailUrl": "https://via.placeholder.com/150/c55662"
    },
    {
        "albumId": 11,
        "id": 532,
        "title": "harum qui ducimus commodi repellat iusto",
        "url": "https://via.placeholder.com/600/eb4341",
        "thumbnailUrl": "https://via.placeholder.com/150/eb4341"
    },
    {
        "albumId": 11,
        "id": 533,
        "title": "earum quia qui inventore enim",
        "url": "https://via.placeholder.com/600/89ef74",
        "thumbnailUrl": "https://via.placeholder.com/150/89ef74"
    },
    {
        "albumId": 11,
        "id": 534,
        "title": "non voluptas quasi quia quo quam",
        "url": "https://via.placeholder.com/600/12f36e",
        "thumbnailUrl": "https://via.placeholder.com/150/12f36e"
    },
    {
        "albumId": 11,
        "id": 535,
        "title": "illum est fuga",
        "url": "https://via.placeholder.com/600/124f3a",
        "thumbnailUrl": "https://via.placeholder.com/150/124f3a"
    },
    {
        "albumId": 11,
        "id": 536,
        "title": "non sequi est delectus ullam impedit voluptatum sunt",
        "url": "https://via.placeholder.com/600/e309a5",
        "thumbnailUrl": "https://via.placeholder.com/150/e309a5"
    },
    {
        "albumId": 11,
        "id": 537,
        "title": "ea libero et consectetur enim fugiat et tempore",
        "url": "https://via.placeholder.com/600/bcb3cc",
        "thumbnailUrl": "https://via.placeholder.com/150/bcb3cc"
    },
    {
        "albumId": 11,
        "id": 538,
        "title": "animi vero et",
        "url": "https://via.placeholder.com/600/1a2898",
        "thumbnailUrl": "https://via.placeholder.com/150/1a2898"
    },
    {
        "albumId": 11,
        "id": 539,
        "title": "repudiandae aliquam beatae eveniet voluptas illum",
        "url": "https://via.placeholder.com/600/d7cf9b",
        "thumbnailUrl": "https://via.placeholder.com/150/d7cf9b"
    },
    {
        "albumId": 11,
        "id": 540,
        "title": "eum et quia voluptatem unde",
        "url": "https://via.placeholder.com/600/d9acde",
        "thumbnailUrl": "https://via.placeholder.com/150/d9acde"
    },
    {
        "albumId": 11,
        "id": 541,
        "title": "quia molestiae repellendus expedita quis consequatur enim",
        "url": "https://via.placeholder.com/600/343aa4",
        "thumbnailUrl": "https://via.placeholder.com/150/343aa4"
    },
    {
        "albumId": 11,
        "id": 542,
        "title": "perferendis aliquid et nulla occaecati voluptas tempore",
        "url": "https://via.placeholder.com/600/187191",
        "thumbnailUrl": "https://via.placeholder.com/150/187191"
    },
    {
        "albumId": 11,
        "id": 543,
        "title": "ratione culpa unde et et voluptas",
        "url": "https://via.placeholder.com/600/5f8db6",
        "thumbnailUrl": "https://via.placeholder.com/150/5f8db6"
    },
    {
        "albumId": 11,
        "id": 544,
        "title": "ex totam aliquam consequatur voluptas est",
        "url": "https://via.placeholder.com/600/2dfa38",
        "thumbnailUrl": "https://via.placeholder.com/150/2dfa38"
    },
    {
        "albumId": 11,
        "id": 545,
        "title": "id explicabo qui cumque ut et repellendus aut",
        "url": "https://via.placeholder.com/600/69125",
        "thumbnailUrl": "https://via.placeholder.com/150/69125"
    },
    {
        "albumId": 11,
        "id": 546,
        "title": "et ullam libero in aliquid",
        "url": "https://via.placeholder.com/600/8b5af6",
        "thumbnailUrl": "https://via.placeholder.com/150/8b5af6"
    },
    {
        "albumId": 11,
        "id": 547,
        "title": "libero ut vero et et voluptatem",
        "url": "https://via.placeholder.com/600/e94d9b",
        "thumbnailUrl": "https://via.placeholder.com/150/e94d9b"
    },
    {
        "albumId": 11,
        "id": 548,
        "title": "culpa ea consequuntur tempora et voluptas ipsum voluptatem",
        "url": "https://via.placeholder.com/600/9cc2e7",
        "thumbnailUrl": "https://via.placeholder.com/150/9cc2e7"
    },
    {
        "albumId": 11,
        "id": 549,
        "title": "repudiandae dolorum corporis unde",
        "url": "https://via.placeholder.com/600/f75bc8",
        "thumbnailUrl": "https://via.placeholder.com/150/f75bc8"
    },
    {
        "albumId": 11,
        "id": 550,
        "title": "eaque ut incidunt quae aut quo quis praesentium",
        "url": "https://via.placeholder.com/600/ff382e",
        "thumbnailUrl": "https://via.placeholder.com/150/ff382e"
    }
];


describe('renderProfile function', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="personal_data_container"></div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders profile data', () => {
        renderProfile(profile);

        const personalDataContainer = document.querySelector('#personal_data_container');

        expect(personalDataContainer.innerHTML).toContain(profile.name);
        expect(personalDataContainer.innerHTML).toContain(profile.company.name);
        expect(personalDataContainer.innerHTML).toContain(profile.company.catchPhrase);
        expect(personalDataContainer.innerHTML).toContain(profile.address.street);
        expect(personalDataContainer.innerHTML).toContain(profile.address.suite);
        expect(personalDataContainer.innerHTML).toContain(profile.address.city);
        expect(personalDataContainer.innerHTML).toContain(profile.website);
        expect(personalDataContainer.innerHTML).toContain(profile.email);
        expect(personalDataContainer.innerHTML).toContain(profile.phone.split(" ")[0]);
    });
});

describe('renderGalleryContent function', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="Album"></div>
            <div id="Gallery"></div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders album data', () => {
        const albumTitle = "quam nostrum impedit mollitia quod et dolor";
        const photoCount = album.length;
        const thumbnailUrl = album[0].thumbnailUrl;

        const albumHeader = document.querySelector('#Album');
        const albumPhotos = document.querySelector('#Gallery');

        renderGalleryContent({album, albumTitle, photoCount, thumbnailUrl});

        expect(albumHeader.innerHTML).toContain(albumTitle);
        expect(albumHeader.innerHTML).toContain(`${photoCount}`);

    });
});

describe('loadProfile function', () => {

    beforeEach(() => {
        fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(profile)
        }));
        document.body.innerHTML = `
            <div id="personal_data_container"></div>
        `;
    });

    afterEach(() => {
        fetch.mockClear();
        document.body.innerHTML = '';
    });

    it('loads profile data', async () => {
        await loadProfile();
    
        expect(fetch).toBeCalledWith(`http://localhost:3001/users/${userId}`);
    });
});

describe('loadGalleryContent function', () => {

    beforeEach(() => {
        fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(profile)
        }));
        document.body.innerHTML = `
            <div id="Album"></div>
            <div id="Gallery"></div>
        `;
    });

    afterEach(() => {
        fetch.mockClear();
        document.body.innerHTML = '';
    });

    it('loads gallery content', async () => {

        await loadGalleryContent();
    
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenNthCalledWith(1, 'http://localhost:3001/albums/1');
        expect(fetch).toHaveBeenNthCalledWith(2, 'http://localhost:3001/users/1');
    });
});
