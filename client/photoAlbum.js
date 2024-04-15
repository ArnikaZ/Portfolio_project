const profileInfo = document.querySelector('#personal_data_container');
const albumHeader = document.querySelector('#Album');
const albumPhotos = document.querySelector('#Gallery');

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const albumId = urlParams.get('albumId');

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

function renderGalleryContent(album) {
    albumHeader.innerHTML = `
        <img src="${album.thumbnailUrl}" id="Album_photo1"/>
        <div id="Album_info">
            <p id="Album_title">${album.albumTitle}</p>
            <p id="Photo_number">Number of photos: ${album.photoCount}</p>
        </div>
    `;

    albumPhotos.innerHTML = `
        <h2>Photos</h2>
    `;

    album.album.forEach(photo => {
        const photoElement = document.createElement('img');
        photoElement.src = photo.thumbnailUrl;
        albumPhotos.appendChild(photoElement);
    });
}

async function loadProfile() {
    const profile = await fetch(`http://localhost:3001/users/${userId}`).then(response => response.json());

    renderProfile(profile);
}

async function loadGalleryContent() {
    const content = await fetch(`http://localhost:3001/albums/${userId}`).then(response => response.json());

    const album = content[albumId];

    const user = await fetch(`http://localhost:3001/users/${userId}`).then(response => response.json());
    const albumTitle = user.albums.find(album => album.id == albumId).title;

    const photoCount = album.length;

    const thumbnailUrl = album[0].thumbnailUrl;

    renderGalleryContent({album, albumTitle, photoCount, thumbnailUrl});
}

loadProfile();
loadGalleryContent();