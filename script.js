import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

const results = document.getElementById("results");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const favoritesBox = document.getElementById("favorites");

let campgrounds = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchCampgrounds();
});

async function fetchCampgrounds() {
  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");

  try {
   const querySnapshot = await getDocs(collection(db, "campgrounds"));

campgrounds = [];

querySnapshot.forEach((doc) => {
  campgrounds.push({
    id: doc.id,
    ...doc.data()
  });
});

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
  const searchText = searchInput.value.toLowerCase();

  let filtered = campgrounds;

  // Filter by dropdown
  if (filter !== "all") {
    filtered = filtered.filter(c => 
      c.type === filter || c.category === filter
    );
  }

  // Filter by search box
  if (searchText !== "") {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(searchText) ||
      c.location.toLowerCase().includes(searchText)
    );
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

  <a href="details.html?id=${camp.id}">
    View Details
  </a>

  <button onclick="saveFavorite('${camp.id}')">
    Save
  </button>
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
