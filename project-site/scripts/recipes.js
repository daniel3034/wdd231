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

});

async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json'); // Ensure this path matches your project structure
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const recipeListElement = document.getElementById('recipe-list');
    
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>${recipe.description}</p>
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" loading="lazy">
            <button onclick="openModal(${recipe.id})">View Recipe</button>
        `;
        recipeListElement.appendChild(recipeItem);
    });
}

function openModal(recipeId) {
    fetch('data/recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                document.getElementById('modal-title').textContent = recipe.name;
                document.getElementById('modal-ingredients').textContent = "Ingredients: " + recipe.ingredients.join(', ');
                document.getElementById('modal-instructions').innerHTML = formatInstructions(recipe.instructions);
                document.getElementById('recipe-modal').style.display = 'block';
            }
        })
        .catch(error => console.error("Error loading recipe details:", error));
}

function formatInstructions(instructions) {
    return instructions.map((step, index) => `<p>${index + 1}. ${step}</p>`).join('');
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}
