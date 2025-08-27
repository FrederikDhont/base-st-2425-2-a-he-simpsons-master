"use strict";

window.addEventListener("load", initialize);

// Data variables
const data = members;
const sortOrder = ["Age", "Firstname", "Lastname"];
const voiceActors = ["Dan Castellaneta", "Nancy Cartwright", "Hank Azaria"];

// DOM elements
let locationSelectEl;
let sortFieldSelectEl;
let cardsWrapper;
let detailsEl;
let voiceActorButtons;
let cardsPerVoiceActorWrapper;

// App state
const app = {
  filteredData: data,
  locations: [],
  selectedLocationVal: "all",
  selectedSortingVal: "nosort",
};

/* ==========================
   App initialization
   ========================== */

function initialize() {
  // Initialize data
  getLocationsFromData();

  // Bind DOM elements
  bindDOMElements();

  // Initialize GUI
  populateCards();
  populateLocationSelector();
  populateSortFieldSelector();

  // Add event listeners
  locationSelectEl.addEventListener("change", (e) => handleLocationChange(e));
}

function bindDOMElements() {
  locationSelectEl = document.getElementById("choise");
  sortFieldSelectEl = document.getElementById("sort-items");
  cardsWrapper = document.getElementById("overview");
  detailsEl = document.getElementById("details");
  voiceActorButtons = document.getElementById("voices");
  cardsPerVoiceActorWrapper = document.getElementById("characters");
}

/* ==========================
   Data logic
   ========================== */
function getLocationsFromData() {
  app.locations = [];
  data.forEach((char) => {
    if (char.type != "" && !app.locations.includes(char.type)) {
      app.locations.push(char.type);
    }
  });
  app.locations.sort();
}

function applyFiltersToData() {
  app.filteredData = data.filter((char) => {
    // Location filter
    if (app.selectedLocationVal && app.selectedLocationVal !== "all") {
      if (char.type != app.selectedLocationVal) return false;
    }

    return true;
  });
}

/* ==========================
   Event handlers
   ========================== */
function handleLocationChange(e) {
  app.selectedLocationVal = e.target.value;
  console.log(app.selectedLocationVal);
  applyFiltersToData();
  populateCards();
}

/* ==========================
   GUI logic
   ========================== */

function populateCards() {
  cardsWrapper.innerHTML = "";

  if (app.filteredData.length < 1) {
    cardsWrapper.innerHTML = "<p>Geen resultaten</p>";
    return;
  }

  for (const character of app.filteredData) {
    const el = createCard(character);
    cardsWrapper.appendChild(el);
  }
}

function createCard(character) {
  // Article
  const cardEl = createHTMLElement({
    tagName: "article",
  });

  // Name
  const nameEl = createHTMLElement({
    tagName: "h3",
    innerText: `${character.firstname} ${character.lastname}`,
  });
  cardEl.appendChild(nameEl);

  // Image
  const imgSrc =
    character.type == "family"
      ? `img/Family/${character.picture}`
      : `img/Other/${character.picture}`;
  const imgEl = createHTMLElement({
    tagName: "img",
    src: imgSrc,
  });
  cardEl.appendChild(imgEl);

  // Return result
  return cardEl;
}

function populateLocationSelector() {
  locationSelectEl.innerHTML = "";

  locationSelectEl.appendChild(new Option("All locations", "all"));

  app.locations.forEach((loc) => {
    const optionEl = new Option(capitalizeAndFormat(loc), loc);
    locationSelectEl.appendChild(optionEl);
  });
}

function populateSortFieldSelector() {
  sortFieldSelectEl.innerHTML = "";

  sortOrder.forEach((field) => {
    const optionEl = new Option(field, field);
    sortFieldSelectEl.appendChild(optionEl);
  });
}
