// DOM
const container = document.getElementById("container");
const text = document.getElementById("text");
let soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");

// Data
const totalTime = 9500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// Init
breathAnimation();
setInterval(breathAnimation, totalTime);

// Main functionality
function breathAnimation() {
  text.innerText = "Вдох";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Держим";

    setTimeout(() => {
      text.innerText = "Выдох";
      container.className = "container shrink";
    }, holdTime);
  }, breathTime);
}

// Gradient Background
let granimInstance = new Granim({
  element: "#granim-canvas",
  direction: "radial",
  opacity: [1, 1],
  states: {
    "default-state": {
      gradients: [
        ["#231942", "#E0B1CB"],
        ["#E0B1CB", "#231942"],
      ],

      transitionSpeed: totalTime / 2,
    },
  },
});

// Audio
soundButton.addEventListener("click", (e) => {
  soundButton.classList.toggle("paused");
  audio.paused ? audio.play() : audio.pause();
});

window.onfocus = function () {
  soundButton.classList.contains("paused") ? audio.pause() : audio.play();
};

window.onblur = function () {
  audio.pause();
};
