const campgrounds = [
    {
        name: "Yellowstone Campground",
        location: "Wyoming",
        description: "Beautiful campground near Yellowstone National Park."
    },
    {
        name: "Bear Lake Campground",
        location: "Utah",
        description: "Great fishing and lake access."
    },
    {
        name: "Mountain View Campground",
        location: "Idaho",
        description: "Amazing mountain scenery and hiking trails."
    }
];

const campgroundList = document.getElementById("campgroundList");
const favoritesList = document.getElementById("favoritesList");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

function displayCampgrounds(list) {
    campgroundList.innerHTML = "";

    list.forEach(campground => {
        const card = document.createElement("div");
        card.classList.add("campground-card");

        card.innerHTML = `
            <h3>${campground.name}</h3>
            <p><strong>Location:</strong> ${campground.location}</p>
            <p>${campground.description}</p>
            <button class="favorite-btn">Add to Favorites</button>
        `;

        const button = card.querySelector("button");

        button.addEventListener("click", () => {
            saveFavorite(campground);
        });

        campgroundList.appendChild(card);
    });
}

function saveFavorite(campground) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(campground);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();
}

function loadFavorites() {
    favoritesList.innerHTML = "";

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach(campground => {
        const item = document.createElement("div");

        item.classList.add("campground-card");

        item.innerHTML = `
            <h3>${campground.name}</h3>
            <p>${campground.location}</p>
        `;

        favoritesList.appendChild(item);
    });
}

searchButton.addEventListener("click", () => {
    const searchTerm =
        searchInput.value.toLowerCase();

    const filtered =
        campgrounds.filter(campground =>
            campground.name
                .toLowerCase()
                .includes(searchTerm)
        );

    displayCampgrounds(filtered);
});

displayCampgrounds(campgrounds);
loadFavorites();
