import { gsap } from "gsap";
import Granim from "granim";

import Keyframes from "./Keyframes";
import gradients from "./gradients";

// DOM elements
const animationControlBtn = document.querySelector("#animation-control-btn");
const circleContainer = document.getElementById("circle-container");
const outerCircle = document.querySelector("#outer-circle");
const innerCircle = document.querySelector("#inner-circle");
const textEl = document.querySelector("#text");
const pointerContainer = document.querySelector("#pointer-container");
const pointer = document.querySelector("#pointer");
const colorControlsContainer = document.querySelector(
  ".color-controls-container"
);
const modeBtns = document.querySelectorAll(".mode-btn");
const soundButton = document.querySelector(".soundbutton");
const audio = document.querySelector(".audio");
const animationStateicon = animationControlBtn.querySelector("i");

/**
 * @type {number}
 */
let currentColorSchema;

/**
 * @type {string}
 */
let currentMode;

/**
 * @type {number}
 */
let currentDuration;

/**
 * @type {Object}
 */
let mainTimeLine;

/**
 * @type {Object}
 */
let granimBG;

// Get current colorScheme from localStorage, if not found - default to 0
if (!localStorage.getItem("relaxer-colorSchema")) {
  localStorage.setItem("relaxer-colorSchema", 0);
  currentColorSchema = 0;
} else {
  currentColorSchema = localStorage.getItem("relaxer-colorSchema");
}

// Get current mode from localStorage, if noot found - default to 4-7-8
if (!localStorage.getItem("relaxer-mode")) {
  localStorage.setItem("relaxer-mode", "4-7-8");
  currentMode = "4-7-8";
} else {
  currentMode = localStorage.getItem("relaxer-mode");
}

// Set mode button to active
modeBtns.forEach((btn) => {
  btn.classList.remove("active");
  if (btn.dataset.mode === currentMode) {
    btn.classList.add("active");
  }
});

/**
 * @property {Function} init - Init/ re-init animation & color schema
 * @returns {void}
 */
function init() {
  animationStateicon.className = "fa-solid fa-play";
  currentDuration = getTotalDuration(currentMode);
  setColorSchema(+currentColorSchema);
  setAnimation();
}

/**
 * @property {Function} getTotalDuration - calculate total duration of animation
 * @param {string} modeString - string that represents mode
 * @returns {number} - total time of cycle in seconds
 *
 * @example getTotalDuration('4-4-4-4')
 */
function getTotalDuration(modeString) {
  return modeString
    .split("-")
    .map((n) => parseInt(n))
    .reduce((a, c) => a + c);
}

/**
 * @property {Function} setColorSchema - set currentColorSchema value, init new Granim object for background with new values
 * @param {number} schema - numeric value represents color schema
 * @returns {void}
 */
function setColorSchema(schema) {
  // Clean container
  colorControlsContainer.innerHTML = "";

  // Update Container
  updateColorSwitcher(schema);
  outerCircle.style.background = `var(--gradient${schema})`;

  // New gradient background
  if (granimBG) granimBG.destroy();

  granimBG = new Granim({
    element: "#granim-canvas",
    direction: "radial",
    opacity: [1, 1],
    states: {
      "default-state": {
        gradients: [gradients[schema][0], gradients[schema][1]],
        transitionSpeed: (currentDuration * 1000) / 2,
      },
    },
  });

  granimBG.pause();
  currentColorSchema = schema;
}

/**
 * @property {Function} updateColorSwitcher - populate color switcher container
 * @param {number} schema - numeric value represents active color schema
 * @returns {void}
 */
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
        currentColorSchema = newSchema;
        // Re-init UI
        init();
      });
    }

    element.setAttribute("data-color", i);
    element.style.background = `var(--gradient${i})`;

    colorControlsContainer.appendChild(element);
  });
}

/**
 * @property {Function} setAnimation - sets innerCircle and pointer elements to current color schema colors, init getAnimation function with new Keyframes object with current colors and mode
 * @returns {void}
 */
function setAnimation() {
  // Default some elements
  gsap.set(innerCircle, {
    backgroundColor: gradients[currentColorSchema][0][0],
    scale: 0.75,
  });

  gsap.set(pointer, { backgroundColor: gradients[currentColorSchema][0][1] });

  getAnimation(
    new Keyframes(
      currentMode,
      gradients[currentColorSchema],
      currentDuration,
      updateText
    )
  );
}

/**
 * @property {Function} getAnimation - generates animation with current colors and mode
 * @param {Object} options - Keyframes object, instance of Keyframes class
 * @returns {void}
 */
function getAnimation(options) {
  if (mainTimeLine) {
    // Reset all animations
    mainTimeLine.kill();
    updateText("");

    gsap.to(circleContainer, {
      scale: 1,
      duration: 0.2,
      ease: "Power4.in",
    });

    gsap.to(outerCircle, {
      boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
      duration: 0.2,
      ease: "Power4.in",
    });

    gsap.to(innerCircle, {
      scale: 0.75,
      duration: 0.2,
      ease: "Power4.in",
    });

    gsap.to(pointerContainer, {
      rotate: 0,
      duration: 0.2,
      ease: "Power4.in",
    });
  }

  // Init timeline
  mainTimeLine = gsap.timeline({
    repeat: -1,
    paused: true,
    defaults: { duration: currentDuration },
  });

  mainTimeLine.to(circleContainer, options.circleContainer);
  mainTimeLine.to(textEl, options.textEl, "<");
  mainTimeLine.to(outerCircle, options.outerCircle, "<");
  mainTimeLine.to(innerCircle, options.innerCircle, "<");
  mainTimeLine.to(pointerContainer, options.pointerContainer, "<0.2");
  mainTimeLine.to(pointer, options.pointer, "<");
}

/**
 * @property {Function} updateText - set textContent of textEl to @param
 * @param {string}
 * @returns {void}
 */
function updateText(string) {
  textEl.textContent = string;
}

// Events listeners

// Mode buttons
modeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    modeBtns.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    const mode = e.target.dataset.mode;

    currentDuration = getTotalDuration(mode);
    currentMode = mode;
    localStorage.setItem("relaxer-mode", mode);

    init();
  });
});

// Toggle color changer container
colorControlsContainer.addEventListener("click", (e) => {
  colorControlsContainer.classList.toggle("folded");
});

// Play/pause button
animationControlBtn.addEventListener("click", () => {
  if (animationStateicon.classList.contains("fa-play")) {
    animationStateicon.classList.remove("fa-play");
    animationStateicon.classList.add("fa-pause");
  } else {
    animationStateicon.classList.remove("fa-pause");
    animationStateicon.classList.add("fa-play");
  }
  if (mainTimeLine) {
    if (mainTimeLine._ts) {
      mainTimeLine.pause();
      granimBG.pause();
    } else {
      mainTimeLine.play();
      granimBG.play();
    }
  }
});

// Audio button
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

// Everything starts here
init();
