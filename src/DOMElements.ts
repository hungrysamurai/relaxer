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

// Custom modes overlay
const customModesOverlayOpenBtn = document.querySelector(
  ".custom-mode-overlay-open-btn",
);
const customModesOverlayCloseBtn = document.querySelector(
  ".custom-mode-overlay-close-btn",
);
const customModesOverlay = document.querySelector(".custom-mode-overlay");

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
  customModesOverlayOpenBtn,
  customModesOverlayCloseBtn,
  customModesOverlay,
};
