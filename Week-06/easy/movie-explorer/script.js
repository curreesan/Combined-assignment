const state = {
  allMovies: [],
  results: [],
  sortDescending: true,
};

const genreSelect = document.getElementById("genre-select");
const movieCountInput = document.getElementById("movie-count");
const searchForm = document.getElementById("search-form");
const sortBtn = document.getElementById("sort-btn");
const statusText = document.getElementById("status-text");
const resultsGrid = document.getElementById("results");

async function loadData() {
  statusText.textContent = "Loading movies...";

  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Failed to load movie data");
    state.allMovies = await response.json();

    const genres = [...new Set(state.allMovies.map((movie) => movie.genre))];
    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre;
      option.textContent = genre;
      genreSelect.appendChild(option);
    });

    statusText.textContent = "";
  } catch (err) {
    statusText.textContent = "Error loading movies. Please try again later.";
  }
}

function renderResults() {
  resultsGrid.innerHTML = "";

  state.results.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.rating}</p>
      <p>${movie.overview}</p>
    `;
    resultsGrid.appendChild(card);
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const genre = genreSelect.value;
  const count = parseInt(movieCountInput.value, 10);

  const filtered = state.allMovies.filter((movie) => movie.genre === genre);

  if (filtered.length === 0) {
    statusText.textContent = "No movies found for this genre.";
    resultsGrid.innerHTML = "";
    sortBtn.classList.add("hidden");
    return;
  }

  state.results = filtered.slice(0, count);
  statusText.textContent = "";
  sortBtn.classList.remove("hidden");
  renderResults();
});

sortBtn.addEventListener("click", () => {
  state.sortDescending = !state.sortDescending;

  state.results.sort((a, b) =>
    state.sortDescending ? b.rating - a.rating : a.rating - b.rating
  );

  renderResults();
});

loadData();
