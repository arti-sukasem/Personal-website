"use strict";

function popupWindow() {
    window.open('https://mapcore-demo.org/current/scaffoldvuer/#/?url=https%3A%2F%2Fmapcore-bucket1.s3-us-west-2.amazonaws.com%2Fexamples%2Fbeating-heart%2Fbeating_heart_metadata.json&region=spiral%20colon', '_blank', 'top=100,left=200,height=400, width=600, toolbar=no, resizable=no')
}

// Initialize and add the map
function initMap() {
    // The location of Uluru -36.85783385252318, 174.79672305923748
    const uluru = { lat:-36.85783385252318, lng: 174.79672305923748 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
  