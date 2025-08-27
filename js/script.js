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
  selectedSortFieldVal: "nosort",
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
  populateVoiceActorButtons();

  // Add event listeners
  locationSelectEl.addEventListener("change", (e) => handleLocationChange(e));
  sortFieldSelectEl.addEventListener("change", (e) => handleSortFieldChange(e));
}

function bindDOMElements() {
  locationSelectEl = document.getElementById("choise");
  sortFieldSelectEl = document.getElementById("sort-items");
  cardsWrapper = document.getElementById("overview");
  detailsEl = document.querySelector(".details");
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

function sortData() {
  const sortField = app.selectedSortFieldVal;

  app.filteredData = app.filteredData.sort((a, b) => compare(a, b, sortField));
}

function compare(a, b, sortField) {
  if (a[sortField] < b[sortField]) {
    return -1;
  }
  if (a[sortField] > b[sortField]) {
    return 1;
  }
  return 0;
}

function getCharacterById(id) {
  const foundChar = data.find((char) => char.picture == id);
  return foundChar;
}

function getCharactersByVoiceActor(voiceActor) {
  const actors = [];
  data.forEach((char) => {
    if (char.voice == voiceActor) {
      actors.push(char);
    }
  });
  return actors;
}

function getRandomQuote(favQuotes) {
  if (!Array.isArray(favQuotes)) {
    return favQuotes;
  }

  const randomIndex = getRandomIndex(favQuotes.length);
  const randomQuote = favQuotes[randomIndex];
  return randomQuote;
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/* ==========================
   Event handlers
   ========================== */
function handleLocationChange(e) {
  app.selectedLocationVal = e.target.value;
  applyFiltersToData();
  populateCards();
}

function handleSortFieldChange(e) {
  app.selectedSortFieldVal = e.target.value.toLowerCase();
  sortData();
  populateCards();
}

function handleHover(e) {
  const charId = e.target.id;
  const charObj = getCharacterById(charId);
  displayCharacterDetails(charObj);
}

function handleVoiceActorSelection(e) {
  const selectedVoiceActor = e.target.id;
  console.log(getCharactersByVoiceActor(selectedVoiceActor));
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
    id: character.picture,
    events: { mouseenter: (e) => handleHover(e) },
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

  sortFieldSelectEl.appendChild(new Option("Default", "nosort"));

  sortOrder.forEach((field) => {
    const optionEl = new Option(field, field);
    sortFieldSelectEl.appendChild(optionEl);
  });
}

function displayCharacterDetails(charObj) {
  // Data
  const fullName = `${charObj.firstname} ${charObj.lastname}`;
  const age = charObj.age;
  const job = charObj.job;
  const voiceActor = charObj.voice;

  // Elements
  const fullNameEl = createHTMLElement({
    tagName: "h3",
    innerText: fullName,
    classes: "text-crimson",
  });

  const ageLabel = createHTMLElement({
    tagName: "h4",
    innerText: "Age",
    classes: "text-darkblue",
  });
  const ageEl = createHTMLElement({ tagName: "p", innerText: age });

  const jobLabel = createHTMLElement({
    tagName: "h4",
    innerText: "Job",
    classes: "text-darkblue",
  });
  const jobEl = createHTMLElement({ tagName: "p", innerText: job });

  const voiceLabel = createHTMLElement({
    tagName: "h4",
    innerText: "Voice Actor",
    classes: "text-darkblue",
  });
  const voiceEl = createHTMLElement({ tagName: "p", innerText: voiceActor });

  // Quote data & elements
  let quoteEl = "";
  let quoteLabel;
  if (charObj.favorite_quotes) {
    const quote = getRandomQuote(charObj.favorite_quotes);
    quoteLabel = createHTMLElement({
      tagName: "h4",
      innerText: "Quote",
      classes: "text-darkblue",
    });
    quoteEl = createHTMLElement({ tagName: "p", innerText: quote });
  }

  // Show card
  detailsEl.innerHTML = "";
  detailsEl.appendChild(fullNameEl);
  detailsEl.appendChild(ageLabel);
  detailsEl.appendChild(ageEl);
  detailsEl.appendChild(jobLabel);
  detailsEl.appendChild(jobEl);
  if (quoteLabel) {
    detailsEl.appendChild(quoteLabel);
    detailsEl.appendChild(quoteEl);
  }
  detailsEl.appendChild(voiceLabel);
  detailsEl.appendChild(voiceEl);
}

function populateVoiceActorButtons() {
  voiceActorButtons.innerHTML = "";

  voiceActors.forEach((actor) => {
    const btn = createHTMLElement({
      id: actor,
      tagName: "button",
      innerText: actor,
      classes: "btn-yellow",
      events: {
        click: (e) => handleVoiceActorSelection(e),
      },
    });
    voiceActorButtons.appendChild(btn);
  });
}
