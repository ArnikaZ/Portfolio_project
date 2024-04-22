document.addEventListener('DOMContentLoaded', function() {
const searchBar = document.querySelector('#search-form');
const searchInput = document.querySelector('.search_input');

const logo = document.querySelector('#logo');
const avatar = document.querySelector('#avatar');

searchBar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = await fetch(`http://localhost:3001/search/${searchInput.value}`).then(response => response.json());

    if (user.message) {
        alert(user.message);
    } else {
        window.location.href = `profile.html?userId=${user.id}`;
    }
});

logo.addEventListener('click', () => {
    window.location.href = "index.html";
});

avatar.addEventListener('click', () => {
    window.location.href = "profile.html?userId=3";
});


});