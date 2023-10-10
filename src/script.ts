import { gsap } from "gsap";
import Granim from "granim";

import Keyframes from "./Keyframes";
import gradients from "./gradients";

// DOM elements
const animationControlBtn = document.querySelector("#animation-control-btn") as HTMLButtonElement;
const circleContainer = document.getElementById("circle-container") as HTMLDivElement;
const outerCircle = document.querySelector("#outer-circle") as HTMLDivElement;
const innerCircle = document.querySelector("#inner-circle") as HTMLDivElement;
const textEl = document.querySelector("#text") as HTMLParagraphElement;
const pointerContainer = document.querySelector("#pointer-container") as HTMLDivElement;
const pointer = document.querySelector("#pointer") as HTMLSpanElement;
const colorControlsContainer = document.querySelector(
  ".color-controls-container"
) as HTMLDivElement;
const modeBtns = document.querySelectorAll(".mode-btn") as NodeListOf<HTMLDivElement>
const soundButton = document.querySelector(".soundbutton") as HTMLDivElement;
const audio = document.querySelector(".audio") as HTMLAudioElement;
const animationStateicon = animationControlBtn.querySelector("i") as Element;

let currentColorSchema: number | null;
let currentMode: string;
let currentDuration: number;

let mainTimeLine: gsap.core.Timeline | undefined;
let granimBG: Granim | undefined

// Get current colorScheme from localStorage, if not found - default to 0
if (!localStorage.getItem("relaxer-colorSchema")) {
  localStorage.setItem("relaxer-colorSchema", '0');
  currentColorSchema = 0;
} else {
  currentColorSchema = Number(localStorage.getItem("relaxer-colorSchema"));
}

// Get current mode from localStorage, if noot found - default to 4-7-8
if (!localStorage.getItem("relaxer-mode")) {
  localStorage.setItem("relaxer-mode", "4-7-8");
  currentMode = "4-7-8";
} else {
  currentMode = localStorage.getItem("relaxer-mode") || "4-7-8";
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
 */
function init(): void {
  animationStateicon.className = "fa-solid fa-play";
  currentDuration = getTotalDuration(currentMode || '4-7-8');
  setColorSchema(Number(currentColorSchema));
  setAnimation();
}

/**
 * @property {Function} getTotalDuration - calculate total duration of animation
 * @param {string} modeString - string that represents mode
 * @returns {number} - total time of cycle in seconds
 *
 * @example getTotalDuration('4-4-4-4')
 */
function getTotalDuration(modeString: string): number {
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
function setColorSchema(schema: number): void {
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
 */
function updateColorSwitcher(schema: number): void {
  gradients.forEach((_, i) => {
    let element = document.createElement("div");
    element.classList.add("color-scheme");

    if (i === schema) {
      element.classList.add("active");
    } else {
      element.addEventListener("click", (e) => {
        if (e.target instanceof HTMLDivElement && e.target.dataset.color) {
          const newSchema = Number(e.target.dataset.color);
          localStorage.setItem("relaxer-colorSchema", newSchema.toString());
          currentColorSchema = newSchema;
          // Re-init UI
          init();
        }
      });
    }

    element.setAttribute("data-color", i.toString());
    element.style.background = `var(--gradient${i})`;

    colorControlsContainer.appendChild(element);
  });
}

/**
 * @property {Function} setAnimation - sets innerCircle and pointer elements to current color schema colors, init getAnimation function with new Keyframes object with current colors and mode
 */
function setAnimation(): void {
  // Default some elements
  gsap.set(innerCircle, {
    backgroundColor: gradients[Number(currentColorSchema)][0][0],
    scale: 0.75,
  });

  gsap.set(pointer, { backgroundColor: gradients[Number(currentColorSchema)][0][1] });

  getAnimation(
    new Keyframes(
      currentMode,
      gradients[Number(currentColorSchema)],
      currentDuration,
      updateText
    )
  );
}

/**
 * @property {Function} getAnimation - generates animation with current colors and mode
 * @param {Object} options - Keyframes object, instance of Keyframes class
 */
function getAnimation(options: Keyframes): void {

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
 */
function updateText(string: string): void {
  textEl.textContent = string;
}

// Events listeners

// Mode buttons
modeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    modeBtns.forEach((btn) => btn.classList.remove("active"));
    if (e.target instanceof HTMLButtonElement && e.target.dataset.mode) {
      e.target.classList.add("active");

      const mode = e.target.dataset.mode;

      currentDuration = getTotalDuration(mode);
      currentMode = mode;
      localStorage.setItem("relaxer-mode", mode);

      init();
    }
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
      granimBG?.pause();
    } else {
      mainTimeLine.play();
      granimBG?.play();
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
window.addEventListener('DOMContentLoaded', () => {
  init();
})

