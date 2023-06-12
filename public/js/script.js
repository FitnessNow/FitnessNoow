// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("fitness-nowt JS imported successfully!");
});

const welcomeEl = document.getElementsByClassName("welcome");

setTimeout(() => {
  welcomeEl.style.display = block;
}, 100)
