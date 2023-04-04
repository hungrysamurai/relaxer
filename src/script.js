import { gsap } from "gsap";
import Granim from "granim";

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

let currentColorSchema, currentMode, currentDuration, mainTimeLine, granimBG;

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

modeBtns.forEach((btn) => {
  btn.classList.remove("active");
  if (btn.dataset.mode === currentMode) {
    btn.classList.add("active");
  }
});

// Data

// Gradients sets
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
    ["#6D6875", "#FFCDB2"],
    ["#FFCDB2", "#6D6875"],
  ],
];

//Keyframes sets
const getKeyframes = (mode) => {
  if (mode === "4-7-8") {
    return {
      circleContainer: {
        keyframes: {
          "0%": {
            scale: 1,
          },
          "21%": {
            scale: 1.3,
          },
          "58%": {
            scale: 1.3,
          },
          "100%": {
            scale: 1,
          },
        },
      },
      textEl: {
        keyframes: {
          "0%": {
            onComplete: () => {
              updateText("Вдох");
            },
          },
          "21%": {
            onComplete: () => {
              updateText("Держим");
            },
          },
          "58%": {
            onComplete: () => {
              updateText("Выдох");
            },
          },
        },
      },
      outerCircle: {
        keyframes: {
          "0%": {
            boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
          },
          "21%": {
            boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
          },
          "58%": {
            boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
          },
          "100%": {
            boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.7)",
          },
          ease: "linear",
        },
      },

      innerCircle: {
        keyframes: {
          "0%": {
            scale: 0.75,
            backgroundColor: gradients[currentColorSchema][0][0],
            ease: "linear",
          },
          "21%": {
            scale: 0.9,
            backgroundColor: gradients[currentColorSchema][0][1],
            ease: "Power1.easeIn",
          },
          "58%": {
            scale: 0.95,
            backgroundColor: gradients[currentColorSchema][0][1],
            ease: "linear",
          },
          "100%": {
            scale: 0.75,
            backgroundColor: gradients[currentColorSchema][0][0],
            ease: "Power1.easeIn",
          },
        },
      },

      pointerContainer: {
        keyframes: {
          "0%": {
            rotate: 0,
            ease: "linear",
          },
          "21%": {
            rotate: 76,
            ease: "Power1.easeIn",
          },
          "58%": {
            rotate: 120,
            ease: "linear",
          },
          "100%": {
            rotate: 360,
            ease: "Power1.easeIn",
          },
        },
      },

      pointer: {
        keyframes: {
          "0%": {
            backgroundColor: gradients[currentColorSchema][0][1],
          },
          "21%": {
            backgroundColor: gradients[currentColorSchema][0][0],
          },
          "58%": {
            backgroundColor: gradients[currentColorSchema][0][0],
          },
          "100%": {
            backgroundColor: gradients[currentColorSchema][0][1],
          },
        },
      },
    };
  } else if (mode === "4-4-4-4") {
    return {
      circleContainer: {
        keyframes: {
          "0%": {
            scale: 1,
          },
          "25%": {
            scale: 1.3,
          },
          "50%": {
            scale: 1.3,
          },
          "75%": {
            scale: 1,
          },
          "100%": {
            scale: 1,
          },
        },
      },
      textEl: {
        keyframes: {
          "0%": {
            onComplete: () => {
              updateText("Вдох");
            },
          },
          "25%": {
            onComplete: () => {
              updateText("Держим");
            },
          },
          "50%": {
            onComplete: () => {
              updateText("Выдох");
            },
          },
          "75%": {
            onComplete: () => {
              updateText("Держим");
            },
          },
        },
      },
      outerCircle: {
        keyframes: {
          "0%": {
            boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
          },
          "25%": {
            boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
          },
          "50%": {
            boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
          },
          "75%": {
            boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
          },
          "100%": {
            boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
          },
          ease: "linear",
        },
      },

      innerCircle: {
        keyframes: {
          "0%": {
            scale: 0.75,
            backgroundColor: gradients[currentColorSchema][0][0],
            ease: "linear",
          },
          "25%": {
            scale: 0.9,
            backgroundColor: gradients[currentColorSchema][0][1],
            ease: "Power1.easeIn",
          },
          "50%": {
            scale: 0.95,
            backgroundColor: gradients[currentColorSchema][0][1],
            ease: "linear",
          },
          "75%": {
            scale: 0.75,
            backgroundColor: gradients[currentColorSchema][0][0],
            ease: "Power1.easeIn",
          },
          "100%": {
            scale: 0.75,
            backgroundColor: gradients[currentColorSchema][0][0],
            ease: "Power1.easeIn",
          },
        },
      },

      pointerContainer: {
        keyframes: {
          "0%": {
            rotate: 0,
            ease: "linear",
          },
          "25%": {
            rotate: 90,
            ease: "Power1.easeIn",
          },
          "50%": {
            rotate: 180,
            ease: "linear",
          },
          "75%": {
            rotate: 270,
            ease: "linear",
          },
          "100%": {
            rotate: 360,
            ease: "Power1.easeIn",
          },
        },
      },

      pointer: {
        keyframes: {
          "0%": {
            backgroundColor: gradients[currentColorSchema][0][1],
          },
          "25%": {
            backgroundColor: gradients[currentColorSchema][0][0],
          },
          "50%": {
            backgroundColor: gradients[currentColorSchema][0][0],
          },
          "75%": {
            backgroundColor: gradients[currentColorSchema][0][1],
          },
          "100%": {
            backgroundColor: gradients[currentColorSchema][0][1],
          },
        },
      },
    };
  }
};

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
        currentColorSchema = newSchema;

        init();
      });
    }

    element.setAttribute("data-color", i);
    element.style.background = `var(--gradient${i})`;

    colorControlsContainer.appendChild(element);
  });
}

function setAnimation() {
  // Default some elements
  gsap.set(innerCircle, {
    backgroundColor: gradients[currentColorSchema][0][0],
    scale: 0.75,
  });
  gsap.set(pointer, { backgroundColor: gradients[currentColorSchema][0][1] });

  getAnimation(getKeyframes(currentMode));
}

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

function updateText(string) {
  textEl.textContent = string;
}

function getTotalDuration(string) {
  return string
    .split("-")
    .map((n) => parseInt(n))
    .reduce((a, c) => a + c);
}

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

// Init/ re-init animation & color schema
function init() {
  animationStateicon.className = "fa-solid fa-play";
  currentDuration = getTotalDuration(currentMode);

  setColorSchema(+currentColorSchema);

  setAnimation();
}

init();
