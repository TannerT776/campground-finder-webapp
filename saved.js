let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const savedResults = document.getElementById("savedResults");

favorites.forEach(id => {

  const card = document.createElement("div");

  card.className = "card";

  card.innerHTML = `
    <h3>Saved Campground</h3>
    <p>ID: ${id}</p>
  `;

  savedResults.appendChild(card);

});
