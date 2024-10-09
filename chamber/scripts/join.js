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

// Modal functionality
const modals = document.querySelectorAll('.modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        document.getElementById(target).style.display = 'block';
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Timestamp 
document.querySelector('form').addEventListener('submit', (event) => {
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toISOString();  // Populate with current date-time
});
