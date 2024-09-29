const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Async function to fetch the prophet data
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayProphets(data.prophets); // Pass the prophets array to the display function
  } catch (error) {
    console.error('There has been a problem with the fetch operation:', error);
  }
}

// Function to display the prophet cards
const displayProphets = (prophets) => {
  // Ensure that prophets is an array
  if (!Array.isArray(prophets) || prophets.length === 0) {
    console.error('No prophets data found');
    return;
  }

  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

// Call the function to load the data and build the cards
getProphetData();
