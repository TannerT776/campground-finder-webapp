import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const details = document.getElementById("details");

const params = new URLSearchParams(window.location.search);

const campgroundId = params.get("id");


async function loadCampground() {

  const campgroundRef = doc(db, "campgrounds", campgroundId);

  const campgroundSnap = await getDoc(campgroundRef);


  if (campgroundSnap.exists()) {

    const camp = campgroundSnap.data();

    details.innerHTML = `
      <div class="card">

        <h2>${camp.name}</h2>

        <p>Location: ${camp.location}</p>

        <p>Type: ${camp.type}</p>

      </div>
    `;

  } else {

    details.innerHTML = `
      <p>Campground not found.</p>
    `;

  }

}


loadCampground();
