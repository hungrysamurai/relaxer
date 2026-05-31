// DOM elements
const animationControlBtn = document.querySelector(
  "#animation-control-btn",
) as HTMLButtonElement;
const circleContainer = document.getElementById(
  "circle-container",
) as HTMLDivElement;
const outerCircle = document.querySelector("#outer-circle") as HTMLDivElement;
const innerCircle = document.querySelector("#inner-circle") as HTMLDivElement;
const textEl = document.querySelector("#text") as HTMLParagraphElement;
const pointerContainer = document.querySelector(
  "#pointer-container",
) as HTMLDivElement;
const pointer = document.querySelector("#pointer") as HTMLSpanElement;
const colorControlsContainer = document.querySelector(
  ".color-controls-container",
) as HTMLDivElement;
const modeBtns = document.querySelectorAll(
  ".mode-btn",
) as NodeListOf<HTMLButtonElement>;
const customModeBtn = document.querySelector(
  ".mode-btn.custom-mode-btn",
) as HTMLButtonElement;
const soundButton = document.querySelector(".soundbutton") as HTMLDivElement;
const audio = document.querySelector(".audio") as HTMLAudioElement;
const animationStateIcon = animationControlBtn.querySelector("i") as Element;

// Custom mode overlay
const customModeOverlayOpenBtn = document.querySelector(
  ".custom-mode-overlay-open-btn",
) as HTMLButtonElement;
const customModeOverlayCloseBtn = document.querySelector(
  ".custom-mode-overlay-close-btn",
);
const customModeOverlay = document.querySelector(".custom-mode-overlay");

const customModeInputs = document.querySelectorAll(
  ".custom-mode-inputs-container .input-container input",
) as NodeListOf<HTMLInputElement>;

const customModeSubmitBtn = document.querySelector(".submit-custom-mode-btn");

const customModeResetBtn = document.querySelector(".reset-custom-mode-btn");

export {
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
};
