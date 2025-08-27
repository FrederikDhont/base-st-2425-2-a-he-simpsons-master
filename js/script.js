"use strict";

window.addEventListener("load", initialize);

// Data variables
const data = members;
const sortOrder = ["Age", "Firstname", "Lastname"];
const voiceActors = ["Dan Castellaneta", "Nancy Cartwright", "Hank Azaria"];

// DOM elements
let locationSelectEl;
let sortSelectEl;
let cardsWrapper;
let detailsEl;
let voiceActorButtons;
let cardsPerVoiceActorWrapper;

// App state
const app = {
  selectedLocationVal: "all",
  selectedSortingVal: "no-sort",
};

/* ==========================
   App initialization
   ========================== */

function initialize() {
  // Initialize data
  // Bind DOM elements
  bindDOMElements();
  // Initialize GUI
  // Add event listeners
}

function bindDOMElements() {
  locationSelectEl = document.getElementById("location-filter");
  sortSelectEl = document.getElementById("sort");
  cardsWrapper = document.getElementById("cards-main");
  detailsEl = document.getElementById("details");
  voiceActorButtons = document.getElementById("voice-actor-filter");
  cardsPerVoiceActorWrapper = document.getElementById("cards-per-voice-actor");
}
