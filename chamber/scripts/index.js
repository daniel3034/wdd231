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


// Weather API

async function fetchWeather() {
    const apiKey = '3aeeac9aae4f715364b29d8237195104'; // OpenWeatherMap API key
    const city = 'Medellin'; // The city for which you want to get the weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);

        // Check if the response is okay (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extracting the required information
        const temperature = data.main.temp; // Current temperature
        const description = data.weather[0].description; // Current weather description
        const forecast = await fetchForecast(city); // Call the function to get the forecast

        // Display the information in the specified element
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h3>Current Weather in ${city}</h3>
            <p>Temperature: ${temperature} °C</p>
            <p>Description: ${description}</p>
            <h4>3-Day Forecast:</h4>
            <ul>${forecast}</ul>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
}

// Function to fetch 3-day weather forecast
async function fetchForecast(city) {
    const apiKey = '3aeeac9aae4f715364b29d8237195104'; // Your OpenWeatherMap API key
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let forecastHTML = '';

        // Extracting forecast data (next 3 days)
        for (let i = 0; i < 3; i++) {
            const day = data.list[i * 8]; // Each entry is every 3 hours, so multiply by 8 for daily
            const date = new Date(day.dt * 1000).toLocaleDateString(); // Format date
            const temp = day.main.temp; // Daily temperature
            const desc = day.weather[0].description; // Daily weather description
            forecastHTML += `<li>${date}: ${temp} °C, ${desc}</li>`;
        }
        return forecastHTML;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        return `<li>Error fetching forecast data.</li>`;
    }
}

// Call the fetchWeather function on page load
document.addEventListener('DOMContentLoaded', fetchWeather);



// Premium Memberships

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // Adjust the path if needed
        const members = await response.json();

        // Filter Gold or Silver members
        const qualifiedMembers = members.filter(member => 
            member.membershipLevel === 3 || member.membershipLevel === 2
        );

        // Randomly select 2-3 members
        const selectedMembers = [];
        while (selectedMembers.length < 3 && qualifiedMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
            selectedMembers.push(qualifiedMembers.splice(randomIndex, 1)[0]);
        }

        // Display selected members in the spotlight section
        const spotlightContainer = document.querySelector('.spotlight-container');
        selectedMembers.forEach(member => {
            const memberHtml = `
                <div class="spotlight">
                    <img src="images/${member.image}" alt="${member.name} Logo" style="width:100%; height:auto;">
                    <h3>${member.name}</h3>
                    <p>Address: ${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
                    <p>${member.additionalInfo}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;
            spotlightContainer.innerHTML += memberHtml;
        });

    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchMembers);
