import { gsap } from "gsap";
import Granim from "granim";

import Keyframes from "./Keyframes";
import gradients from "./gradients";

import {
  animationControlBtn,
  circleContainer,
  outerCircle,
  innerCircle,
  textEl,
  pointerContainer,
  pointer,
  colorControlsContainer,
  modeBtns,
  customModeBtn,
  soundButton,
  audio,
  animationStateIcon,
  customModeOverlayOpenBtn,
  customModeOverlayCloseBtn,
  customModeOverlay,
  customModeInputs,
  customModeSubmitBtn,
  customModeResetBtn,
} from "./DOMElements";

import getInitialSchemaAndMode from "./utils/getInitialSchemaAndMode";
import initModeBtns from "./utils/initModeBtns";
import getTotalDuration from "./utils/getTotalDuration";
import animationStateIconToggle from "./utils/animationStateIconToggle";
import validateInputData from "./utils/validateInputData";
import { setInLocalStorage } from "./utils/localStorage";

// Globals
let { currentColorSchema, currentMode, customMode } = getInitialSchemaAndMode();

let currentDuration: number;

let mainTimeLine: gsap.core.Timeline | undefined;
let granimBG: Granim | undefined;

/**
 * @property {Function} init - Init/ re-init animation & color schema
 */
function init(): void {
  animationStateIconToggle(animationStateIcon, true);

  currentDuration = getTotalDuration(currentMode || "4-7-8");
  setColorSchema(Number(currentColorSchema));
  setAnimation();
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
          localStorage.setItem("relaxer-color-schema", newSchema.toString());
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

  gsap.set(pointer, {
    backgroundColor: gradients[Number(currentColorSchema)][0][1],
  });

  getAnimation(
    new Keyframes(
      currentMode,
      gradients[Number(currentColorSchema)],
      currentDuration,
      updateText,
    ),
  );
}

function setOverlay() {
  gsap.set(customModeOverlay, {
    x: "100%",
  });
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

function activateModeAndButton(buttonToActivate: HTMLButtonElement) {
  modeBtns.forEach((btn) => btn.classList.remove("active"));

  buttonToActivate.classList.add("active");
  const mode = buttonToActivate.dataset.mode;

  if (mode) {
    currentMode = mode;
    localStorage.setItem("relaxer-mode", mode);

    init();
  }
}

function toggleCustomModeOverlay(state: "open" | "close") {
  gsap.to(customModeOverlay, {
    x: state === "open" ? 0 : "100%",
    duration: 0.2,
    ease: "Power4.out",
  });
}

// ///////////////////////    Events listeners

// Mode buttons
modeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    activateModeAndButton(e.target as HTMLButtonElement);
  });
});

// Custom modes overlay
customModeOverlayOpenBtn?.addEventListener("click", () => {
  toggleCustomModeOverlay("open");
});

customModeOverlayCloseBtn?.addEventListener("click", () => {
  toggleCustomModeOverlay("close");
});

// Custom mode inputs
customModeInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement) validateInputData(e.target);
  });
});

// Custom mode submit/reset buttons
customModeSubmitBtn?.addEventListener("click", () => {
  let newCustomModeValues: string[] = [];
  customModeInputs.forEach((input) => {
    newCustomModeValues.push(input.value || "0");
  });

  // if no breath in or breath out - return
  if (newCustomModeValues[0] === "0" || newCustomModeValues[2] === "0") return;

  // if last hold don't specify - remove last zero
  if (newCustomModeValues[3] === "0") {
    newCustomModeValues.pop();
  }

  customMode = newCustomModeValues.join("-");

  customModeBtn.textContent = customMode;
  customModeBtn.classList.remove("disable");
  customModeBtn.dataset.mode = customMode;

  setInLocalStorage("custom-mode", customMode);

  activateModeAndButton(customModeBtn);

  toggleCustomModeOverlay("close");
});

customModeResetBtn?.addEventListener("click", () => {
  customModeInputs.forEach((input) => {
    input.value = "";
  });

  customMode = null;
  currentMode = "4-7-8";

  customModeBtn.textContent = "";
  customModeBtn.classList.add("disable");
  delete customModeBtn.dataset.mode;

  localStorage.removeItem("relaxer-custom-mode");

  initModeBtns(modeBtns, currentMode, customMode, customModeBtn);
  init();
  toggleCustomModeOverlay("close");
});

// Toggle color changer container
colorControlsContainer.addEventListener("click", (e) => {
  colorControlsContainer.classList.toggle("folded");
});

// Play/pause button
animationControlBtn.addEventListener("click", (e) => {
  animationStateIconToggle(animationStateIcon);
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
window.addEventListener("DOMContentLoaded", () => {
  // setInLocalStorage("custom-mode", "0-2-2");
  initModeBtns(modeBtns, currentMode, customMode, customModeBtn);
  setOverlay();
  init();
});
