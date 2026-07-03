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

  try {
    // TEMP MOCK DATA (for testing)
    campgrounds = [
      {
        id: "1",
        name: "Pine Valley Campground",
        location: "Utah",
        type: "tent"
      },
      {
        id: "2",
        name: "Lakeview RV Park",
        location: "Utah",
        type: "rv"
      },
      {
        id: "3",
        name: "Mountain Creek Camp",
        location: "Utah",
        type: "free"
      }
    ];

    applyFilter();

  } catch (err) {
    errorBox.textContent = "Something went wrong.";
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
