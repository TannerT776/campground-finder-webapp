const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

const results = document.getElementById("results");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const favoritesBox = document.getElementById("favorites");

let campgrounds = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

searchBtn.addEventListener("click", fetchCampgrounds);

async function fetchCampgrounds() {
  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  results.innerHTML = "";

  try {
    const query = searchInput.value;

    // Replace this URL with your real API
    const res = await fetch(`https://api.example.com/campgrounds?q=${query}`);
    
    if (!res.ok) throw new Error("Failed to fetch data");

    campgrounds = await res.json();

    applyFilter();

  } catch (err) {
    errorBox.textContent = "Could not load campgrounds. Try again.";
    errorBox.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

function applyFilter() {
  const filter = filterSelect.value;

  let filtered = campgrounds;

  if (filter !== "all") {
    filtered = campgrounds.filter(c => c.type === filter || c.category === filter);
  }

  renderCampgrounds(filtered);
}

function renderCampgrounds(list) {
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = "<p>No campgrounds found.</p>";
    return;
  }

  list.forEach(camp => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${camp.name}</h3>
      <p>${camp.location}</p>
      <p>Type: ${camp.type}</p>
      <button onclick="saveFavorite('${camp.id}')">Save</button>
    `;

    results.appendChild(card);
  });
}

function saveFavorite(id) {
  const exists = favorites.includes(id);

  if (!exists) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

function renderFavorites() {
  favoritesBox.innerHTML = "";

  favorites.forEach(id => {
    const camp = campgrounds.find(c => c.id === id);
    if (!camp) return;

    const div = document.createElement("div");
    div.className = "card small";
    div.textContent = camp.name;

    favoritesBox.appendChild(div);
  });
}

// initial load
renderFavorites();
