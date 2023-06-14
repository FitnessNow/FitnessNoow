// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("fitness-nowt JS imported successfully!");
});

$(document).ready(function() {
  var interval = 4000;
  // carousel element
  var carousel = $("#carouselExample");
  
  // Start the carousel
  carousel.carousel();
  
  // function to automatically advance the carousel
  function autoAdvanceCarousel() {
    // Move to the next slide
    carousel.carousel("next");

    // Call the function again after the specified interval
    setTimeout(autoAdvanceCarousel, interval);
  }

  // Call the function to start the auto-advancing carousel
  setTimeout(autoAdvanceCarousel, interval);
});