document.addEventListener('DOMContentLoaded', () => {
    // Populate current year
    document.getElementById("currentyear").textContent = new Date().getFullYear();

    // Populate last modified date
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    // Functionality for the hamburger menu
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });
});

// Fetch member data and display it
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card'; // You can style this in your CSS
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" />
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membershipLevel}</p>
            <p>${member.additionalInfo}</p>
        `;
        main.appendChild(memberCard);
    });
}

// Toggle between grid and list view
let isGridView = true;

function toggleView() {
    const main = document.querySelector('main');
    if (isGridView) {
        main.classList.remove('grid-view');
        main.classList.add('list-view');
    } else {
        main.classList.remove('list-view');
        main.classList.add('grid-view');
    }
    isGridView = !isGridView;
}

// Initialize the page
fetchMembers();

// Add toggle view event listener
document.querySelector('.view-toggle').addEventListener('click', toggleView);
