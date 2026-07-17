import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const savedResults = document.getElementById("savedResults");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadSavedCampgrounds() {

  const querySnapshot = await getDocs(collection(db, "campgrounds"));

  querySnapshot.forEach((doc) => {

    if (favorites.includes(doc.id)) {

      const camp = {
        id: doc.id,
        ...doc.data()
      };

      const card = document.createElement("div");

      card.className = "card";

      card.innerHTML = `
        <h3>${camp.name}</h3>
        <p>${camp.location}</p>
        <p>Type: ${camp.type}</p>
      `;

      savedResults.appendChild(card);

    }

  });

}

loadSavedCampgrounds();
