const postsContainer = document.getElementById('Posts');

function renderPosts(posts) { //definica funkcji renderującej posty na stronie
    
    while (postsContainer.firstChild) {// remove all children of postsContainer before rendering new
        postsContainer.removeChild(postsContainer.firstChild);
    }

    posts.forEach(post => { // Iteruje przez listę postów, tworząc dla każdego postu element DOM i dodając go do kontenera postsContainer.
        const postElement = document.createElement('div'); // Tworzenie nowego elementu div, który będzie zawierał dane postu.
        // Ustawienie wewnętrznego HTML dla elementu postu, w tym struktury i danych postu (użytkownik, tytuł, treść).
        postElement.innerHTML = ` 
            <div class="Post_header">
            <img class="profile_clickable id_${post.userId}" src="avatar.png"/>
            <p><span class="profile_clickable id_${post.userId}" id="Name">${post.user}</span></p>
            </div>
            <div class="Post_content">
            <p><span id="Post_title1">${post.title}</span></p>
            <p><span id="Post_text">${post.body}</span></p>
            </div>
        `;
        postsContainer.appendChild(postElement); // Dodanie elementu postu do kontenera postsContainer.
    });
     // Dodanie nasłuchiwaczy zdarzeń kliknięcia do wszystkich elementów z klasą 'profile_clickable'.
    for (let i = 0; i < document.querySelectorAll('.profile_clickable').length; i++) {
        // Pobranie identyfikatora użytkownika z klasy elementu, na który kliknięto, i przekierowanie do strony profilu użytkownika.
        document.querySelectorAll('.profile_clickable')[i].addEventListener('click', () => {
            let userId = document.querySelectorAll('.profile_clickable')[i].classList[1].split('_')[1];
            window.location.href = `profile.html?userId=${userId}`;
        });
    }
}

// gets posts and puts them on the front page
// Definicja funkcji asynchronicznej, która pobiera posty z API i wywołuje renderPosts, aby je wyświetlić.
async function fetchPosts() {
    const posts = await fetch('http://localhost:3001/posts').then(response => response.json());
    renderPosts(posts);
}
// Wywołanie fetchPosts(), aby pobrać i wyświetlić posty przy inicjalizacji.
    fetchPosts();

// filter and sort posts
// Dodanie nasłuchiwacza zdarzeń dla formularza filtrowania postów, reagującego na zdarzenie 'submit'.
const form = document.querySelector('#left_container');
// Zapobieganie domyślnej akcji przeglądarki dla zdarzenia submit.
form.addEventListener('submit', async (e) => {
    const sortby = form.sort_btn.value;
    const order = 'asc';
    const user = form.filter_user.value;
    const lengthMin = form.filter_length_from.value;
    const lengthMax = form.filter_length_to.value

    e.preventDefault();
// Pobranie i wyświetlenie postów zgodnie z ustawieniami filtrowania.
    const posts = await fetch(`http://localhost:3001/posts?sortby=${sortby}&order=${order}&user=${user}&lengthMin=${lengthMin}&lengthMax=${lengthMax}`).then(response => response.json());
    console.log(posts);
    renderPosts(posts);
});

// add a post
 // Dodanie nasłuchiwacza zdarzeń dla formularza dodawania nowego postu.
const postForm = document.querySelector('#post_adding');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = postForm.content.value;
    const userId = 3; // hardcoded, we are Clementine Bauch

    const result = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            author: userId,
        })
    }).then(response => response.json());

    // if post id was returned
    if (result.id) {
        alert('Post added successfully');
    } else {
        alert('Could not post');
    }

    window.location.reload();
});