// DOM
const container = document.getElementById("container");
const text = document.getElementById("text");
let soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");
const colorControlsContainer = document.querySelector(
  ".color-controls-container"
);
const innerCircle = document.querySelector(".circle");
const outerCircle = document.querySelector(".gradient-circle");
const pointer = document.querySelector(".pointer");

// Get current colorScheme from localStorage, if not found - default to 0
if (!localStorage.getItem("relaxer-colorSchema")) {
  localStorage.setItem("relaxer-colorSchema", 0);
}

let currentColorSchema = +localStorage.getItem("relaxer-colorSchema");

// Time data
const totalTime = 9500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// Color themes
const gradients = [
  [
    ["#231942", "#E0B1CB"],
    ["#E0B1CB", "#231942"],
  ],
  [
    ["#023E8A", "#ADE8F4"],
    ["#ADE8F4", "#023E8A"],
  ],
  [
    ["#233B3F", "#E2BF83"],
    ["#E2BF83", "#233B3F"],
  ],
  [
    ["#28102B", "#4E313D"],
    ["#4E313D", "#28102B"],
  ],
  [
    ["#BEE3DB", "#FAF9F9"],
    ["#FAF9F9", "#BEE3DB"],
  ],
];

// Animation
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

// Switch Color Schema
function setColorSchema(schema) {
  // Clean container
  colorControlsContainer.innerHTML = "";

  // Update Container
  updateColorSwitcher(schema);

  // Update styles in DOM
  innerCircle.style.animationName = `change-bg-${schema}`;
  outerCircle.style.background = `var(--gradient${schema})`;
  pointer.style.animationName = `change-bg-${schema}`;

  // New gradient background
  let granimBG = new Granim({
    element: "#granim-canvas",
    direction: "radial",
    opacity: [1, 1],
    states: {
      "default-state": {
        gradients: [gradients[schema][0], gradients[schema][1]],
        transitionSpeed: totalTime / 2,
      },
    },
  });
}

// Color switcher container - populate
function updateColorSwitcher(schema) {
  gradients.forEach((el, i) => {
    let element = document.createElement("div");
    element.classList.add("color-scheme");

    if (i === schema) {
      element.classList.add("active");
    } else {
      element.addEventListener("click", (e) => {
        const newSchema = +e.target.dataset.color;
        localStorage.setItem("relaxer-colorSchema", newSchema);
        setColorSchema(newSchema);
      });
    }

    element.setAttribute("data-color", i);
    element.style.background = `var(--gradient${i})`;

    colorControlsContainer.appendChild(element);
  });
}

// Toggle color changer container
colorControlsContainer.addEventListener("click", (e) => {
  colorControlsContainer.classList.toggle("folded");
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

// Init color schema
setColorSchema(currentColorSchema);

// Init animations
breathAnimation();
setInterval(breathAnimation, totalTime);
