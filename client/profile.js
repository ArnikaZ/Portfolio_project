const profileInfo = document.querySelector('#personal_data_container');
const galleriesInfo = document.querySelector('#Gallery');
const postContainer = document.querySelector('#Posts');

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

function renderProfile(profile) {

    profileInfo.innerHTML = `
    <div id="left_side_data">
        <img src="avatar.png" alt="default avatar"/>
        <p><span id="Name">${profile.name}</span></p>
        <p><span id="Work">${profile.company.name}</span></p>
        <p><span id="Job_description">${profile.company.catchPhrase}</span></p>
    </div>
    <div id="right_side_data">
        <p id="Contact">Contact:</p>
        <p><span id="Address">${profile.address.street}, ${profile.address.suite} <br> ${profile.address.city}, ${profile.address.zipcode}</span></p>
        <p><span id="Website">${profile.website}</span></p>
        <p><span id="Email">${profile.email}</span></p>
        <p><span id="Phone">${profile.phone.split(" ")[0]}</span></p>
    </div>
    `;
}

function renderGalleries(galleries) {

    galleriesInfo.innerHTML = `
        <h2>Galleries</h2>
    `;

    Object.keys(galleries).forEach(key => {
        const gallery = galleries[key];
        const galleryElement = document.createElement('img');
        galleryElement.src = gallery[0].thumbnailUrl;
        galleryElement.classList.add("gallery_clickable");
        galleryElement.classList.add(`id_${key}`);
        galleriesInfo.appendChild(galleryElement);
    });

    for (let i = 0; i < document.querySelectorAll('.gallery_clickable').length; i++) {
        document.querySelectorAll('.gallery_clickable')[i].addEventListener('click', () => {
            let albumId = document.querySelectorAll('.gallery_clickable')[i].classList[1].split('_')[1];
            window.location.href = `photoAlbum.html?userId=${userId}&albumId=${albumId}`;
        });
    }
}

function renderRecentPosts(posts) {
    postContainer.innerHTML = `
        <h2>Recent posts</h2>
    `;

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = ` 
        <div class="Post_header">
            <img src="avatar.png"/>
            <p><span id="Name">${post.user}</span></p>
        </div>
        <div class="Post_content">
            <p><span id="Post_title1">${post.title}</span></p>
            <p><span id="Post_text">${post.body}</span></p>
        </div>
        `;
        postContainer.appendChild(postElement);
    });
}

async function loadProfile() {
    const profile = await fetch(`http://localhost:3001/users/${userId}`).then(response => response.json());

    renderProfile(profile);
}


async function loadGalleries() {
    const galleries = await fetch(`http://localhost:3001/albums/${userId}`).then(response => response.json());
    console.log(galleries);

    renderGalleries(galleries);
}

async function loadRecentPosts() {
    const profile = await fetch(`http://localhost:3001/users/${userId}`).then(response => response.json());
    const posts = profile.recentPosts;
    console.log(posts);

    renderRecentPosts(posts);
}

    loadProfile();
    loadGalleries();
    loadRecentPosts();