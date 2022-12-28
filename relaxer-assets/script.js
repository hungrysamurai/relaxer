// DOM
const container = document.getElementById("container");
const text = document.getElementById("text");
let soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");
const colorControlsContainer = document.querySelector('.color-controls-container');


// Color scheme state
let colorScheme = 0;

// TIme data
const totalTime = 9500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

// Color themes
const gradients = [
  [
    ["#231942", "#E0B1CB"],
    ["#E0B1CB", "#231942"]
  ],
  [
    ["#023E8A", "#ADE8F4"],
    ["#ADE8F4", "#023E8A"]
  ],
  [
    ["#233B3F", "#E2BF83"],
    ["#E2BF83", "#233B3F"]
  ],
  [
    ["#28102B", "#4E313D"],
    ["#4E313D", "#28102B"]
  ],
  [
    ["#BEE3DB", "#FAF9F9"],
    ["#FAF9F9", "#BEE3DB"]
  ],
]

// Main func
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
let granimBG = new Granim({
  element: "#granim-canvas",
  direction: "radial",
  opacity: [1, 1],
  states: {
    "default-state": {
      gradients: [
        gradients[0][0],
        gradients[0][1],
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


// Color Switcher
function colorSwitcher() {
  gradients.forEach((el, i) => {
    let element = document.createElement('div');
    element.classList.add('color-scheme');
    element.setAttribute('data-color', i);
    element.style.background = `var(--gradient${i})`;

    colorControlsContainer.appendChild(element);
  })
}

colorControlsContainer.addEventListener('click', () => {
  colorControlsContainer.classList.toggle('folded')
})

// Init
colorSwitcher();
breathAnimation();
setInterval(breathAnimation, totalTime);