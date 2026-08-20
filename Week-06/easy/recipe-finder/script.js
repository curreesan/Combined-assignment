const state = {
  allRecipes: [],
  results: [],
};

const cuisineSelect = document.getElementById("cuisine-select");
const recipeCountInput = document.getElementById("recipe-count");
const searchForm = document.getElementById("search-form");
const statusText = document.getElementById("status-text");
const resultsGrid = document.getElementById("results");

async function loadData() {
  statusText.textContent = "Loading recipes...";

  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Failed to load recipe data");
    state.allRecipes = await response.json();

    const cuisines = [...new Set(state.allRecipes.map((recipe) => recipe.cuisine))];
    cuisines.forEach((cuisine) => {
      const option = document.createElement("option");
      option.value = cuisine;
      option.textContent = cuisine;
      cuisineSelect.appendChild(option);
    });

    statusText.textContent = "";
  } catch (err) {
    statusText.textContent = "Error loading recipes. Please try again later.";
  }
}

function renderResults() {
  resultsGrid.innerHTML = "";

  state.results.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
    `;
    resultsGrid.appendChild(card);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cuisine = cuisineSelect.value;
  const count = parseInt(recipeCountInput.value, 10);

  const filtered = state.allRecipes.filter((recipe) => recipe.cuisine === cuisine);

  if (filtered.length === 0) {
    statusText.textContent = "No recipes found for this cuisine.";
    resultsGrid.innerHTML = "";
    return;
  }

  state.results = filtered.slice(0, count);
  statusText.textContent = "";
  renderResults();
});

loadData();
