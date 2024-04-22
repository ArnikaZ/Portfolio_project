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

describe('DOMContentLoaded event handler', () => {

    let mockLocation;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="search-form">
                <input class="search_input" />
                <button type="submit">Search</button>
                </form>
                <div id="logo"></div>
                <div id="avatar"></div>
                `;   

        const searchBar = document.querySelector('#search-form');
        const logo = document.querySelector('#logo');
        const avatar = document.querySelector('#avatar');

        mockLocation = {
            href: '',
            set href(url) {
                this._href = url;
                // Simulacja przekierowania
                console.log('Redirecting to:', url);
                // Tutaj można też wywołać funkcję, która w rzeczywistości by przekierowywała stronę
            },
            get href() {
                return this._href;
            }
        };

        searchBar.addEventListener('submit', async (e) => {
            e.preventDefault();

            const searchInput = document.querySelector('.search_input');

            const user = await fetch(`http://localhost:3001/search/${searchInput.value}`).then(response => response.json());

            if (user.message) {
                alert(user.message);
            } else {
                mockLocation.href = `profile.html?userId=${user.id}`;
            }
        });

        logo.addEventListener('click', () => {
            mockLocation.href = "index.html";
        });

        avatar.addEventListener('click', () => {
            mockLocation.href = "profile.html?userId=3";
        });
    });

    it('should redirect to index page on logo click', () => {
        const logo = document.querySelector('#logo');

        logo.dispatchEvent(new Event('click'));

        expect(mockLocation.href).toBe('index.html');
    });

    it('should redirect to profile page with userId=3 on avatar click', () => {
        const avatar = document.querySelector('#avatar');

        avatar.dispatchEvent(new Event('click'));

        expect(mockLocation.href).toBe('profile.html?userId=3');
    });

    it('should display alert message on search form submission with invalid input', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mockowanie alert

        const searchBar = document.querySelector('#search-form');
        searchBar.querySelector('.search_input').value = 'John Doe';
        searchBar.dispatchEvent(new Event('submit'));

        expect(window.alert).toHaveBeenCalledWith('User not found');
    });

    it('should redirect to profile page on search form submission with valid input', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ json: () => ({ id: 1 }) });

        const searchBar = document.querySelector('#search-form');
        searchBar.querySelector('.search_input').value = 'John Doe';
        searchBar.dispatchEvent(new Event('submit'));

        expect(mockLocation.href).toBe('profile.html?userId=1');
    });
});
