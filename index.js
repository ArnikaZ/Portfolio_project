const postsContainer = document.getElementById('Posts');

function renderPosts(posts) {
    // remove all children of postsContainer before rendering new
    while (postsContainer.firstChild) {
        postsContainer.removeChild(postsContainer.firstChild);
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
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
        postsContainer.appendChild(postElement);
    });

    for (let i = 0; i < document.querySelectorAll('.profile_clickable').length; i++) {
        document.querySelectorAll('.profile_clickable')[i].addEventListener('click', () => {
            let userId = document.querySelectorAll('.profile_clickable')[i].classList[1].split('_')[1];
            window.location.href = `profile.html?userId=${userId}`;
        });
    }
}

// gets posts and puts them on the front page
async function fetchPosts() {
    const posts = await fetch('http://localhost:3001/posts').then(response => response.json());
    console.log(posts);
    renderPosts(posts);
}

    fetchPosts();

// filter and sort posts
const form = document.querySelector('#left_container');

form.addEventListener('submit', async (e) => {
    const sortby = form.sort_btn.value;
    const order = 'asc';
    const user = form.filter_user.value;
    const lengthMin = form.filter_length_from.value;
    const lengthMax = form.filter_length_to.value

    e.preventDefault();
    console.log(sortby, order, user, lengthMin, lengthMax);

    const posts = await fetch(`http://localhost:3001/posts?sortby=${sortby}&order=${order}&user=${user}&lengthMin=${lengthMin}&lengthMax=${lengthMax}`).then(response => response.json());
    console.log(posts);
    renderPosts(posts);
})
