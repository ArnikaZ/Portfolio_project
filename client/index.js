function renderPosts(posts, postsContainer) { //definica funkcji renderującej posty na stronie

    while (postsContainer.firstChild) { // remove all children of postsContainer before rendering new
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

async function fetchPosts(postsContainer) {
    const posts = await fetch('http://localhost:3001/posts').then(response => response.json());
    renderPosts(posts, postsContainer);
}

async function filterPosts(postsContainer, sortby, order, user, lengthMin, lengthMax) {
    const posts = await fetch(`http://localhost:3001/posts?sortby=${sortby}&order=${order}&user=${user}&lengthMin=${lengthMin}&lengthMax=${lengthMax}`).then(response => response.json());
    renderPosts(posts, postsContainer);
}

async function addPost(post) {

    const { content, userId } = post;

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
}

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('Posts');

    fetchPosts(postsContainer);

    const form = document.querySelector('#left_container');

    form.addEventListener('submit', async (e) => {
        const sortby = form.sort_btn.value;
        const order = 'asc';
        const user = form.filter_user.value;
        const lengthMin = form.filter_length_from.value;
        const lengthMax = form.filter_length_to.value

        e.preventDefault();

        filterPosts(postsContainer, sortby, order, user, lengthMin, lengthMax);
    });


    const postForm = document.querySelector('#post_adding');

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const content = postForm.content.value;
        const userId = 3; // hardcoded, we are Clementine Bauch

        addPost({content, userId});

        window.location.reload();
    });

});

module.exports = { renderPosts, fetchPosts, filterPosts, addPost }; // Export funkcji renderPosts, aby można ją było testować.