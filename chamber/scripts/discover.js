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

    // Visitor message logic
    const lastVisitKey = 'lastVisit';
    const now = Date.now();
    const visitorMessageElement = document.getElementById('visitorMessage');

    const lastVisit = localStorage.getItem(lastVisitKey);
    if (!lastVisit) {
        visitorMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceLastVisit < 1) {
            visitorMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitorMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    localStorage.setItem(lastVisitKey, now);
