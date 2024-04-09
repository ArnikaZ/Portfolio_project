const profileInfo = document.querySelector('#personal_data_container');

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

async function loadProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    console.log(userId);
    const profile = await fetch(`http://localhost:3001/users/${userId}`).then(response => response.json());
    console.log(profile);
    renderProfile(profile);
}
    loadProfile();