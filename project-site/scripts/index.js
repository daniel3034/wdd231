// Wait for the DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Populate current year
    document.getElementById("currentyear").textContent = new Date().getFullYear();

    // Populate last modified date
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

    // Functionality for the hamburger menu
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });

    // Fetch and display recipes when the page loads
    fetchRecipes();

    // Event listener for the form submission
    document.getElementById('recipe-form').addEventListener('submit', handleSubmit);
});

// Action for the form submit
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    // Redirect to the thanks page
    window.location.href = 'thanks.html';
}

// Function to fetch and display featured recipes
async function loadFeaturedRecipes() {
    try {
        const response = await fetch('data/recipes.json'); // Fetch the JSON file
        const recipes = await response.json(); // Parse the JSON

        // Select the featured recipes list
        const featuredRecipesList = document.getElementById('featured-recipes-list');

        // Loop through the first two recipes and create list items
        for (let i = 0; i < 4; i++) {
            const recipe = recipes[i];
            const listItem = document.createElement('li'); // Create a list item

            listItem.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" style="max-width: 100px; height: auto;" />
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
            `;

            featuredRecipesList.appendChild(listItem); // Append the list item to the list
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Call the function to load recipes when the page loads
window.onload = loadFeaturedRecipes;


// Function to search recipes
async function searchRecipes() {
    try {
        const response = await fetch('data/recipes.json'); // Fetch the JSON file
        const recipes = await response.json(); // Parse the JSON
        const searchTerm = document.getElementById('search-bar').value.toLowerCase(); // Get search input
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) || 
            recipe.description.toLowerCase().includes(searchTerm)
        ); // Filter recipes based on name or description

        // Clear previous results
        const featuredRecipesList = document.getElementById('featured-recipes-list');
        featuredRecipesList.innerHTML = ''; // Clear the list

        // Display filtered results
        filteredRecipes.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.classList.add('featured-recipe');
            listItem.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="featured-recipe-image" loading="lazy">
                <h3 class="featured-recipe-title">${recipe.name}</h3>
                <p class="featured-recipe-description">${recipe.description}</p>
                
            `;
            featuredRecipesList.appendChild(listItem);
        });

        // If no recipes found, display a message
        if (filteredRecipes.length === 0) {
            featuredRecipesList.innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        console.error('Error searching recipes:', error);
    }
}

// Add event listener for search button
document.getElementById('search-button').addEventListener('click', searchRecipes);