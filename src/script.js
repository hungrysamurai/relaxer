// DOM
const soundButton = document.querySelector(".soundbutton"),
  audio = document.querySelector(".audio");
const colorControlsContainer = document.querySelector(
  ".color-controls-container"
);

const circleContainer = document.getElementById("circle-container");

const outerCircle = document.querySelector("#outer-circle");
const innerCircle = document.querySelector("#inner-circle");
const textEl = document.querySelector("#text");

const pointerContainer = document.querySelector("#pointer-container");
const pointer = document.querySelector("#pointer");

const animationControlBtn = document.querySelector("#animation-control-btn");
// Get current colorScheme from localStorage, if not found - default to 0
if (!localStorage.getItem("relaxer-colorSchema")) {
  localStorage.setItem("relaxer-colorSchema", 0);
}

let currentColorSchema = +localStorage.getItem("relaxer-colorSchema");

let mainTimeLine, granimBG;

// Color themes for BG
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

// Switch Color Schema
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
        transitionSpeed: 19000 / 2,
      },
    },
  });
  granimBG.pause();

  currentColorSchema = schema;

  initBreathAnimation();
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

// const breathInTime = 4000;
// const holdTime = 7000;
// const breathOutTime = 8000;
// const totalTime = 19000;

// const data478 = [
//   {
//     '0s': { scale: 1 },
//     '4s': { scale: 1.2 },
//     '11s': { scale: 1.2 },
//     '19s': { scale: 1 }
//   },
//   { duration: 19 }
// ]

animationControlBtn.addEventListener("click", () => {
  if (mainTimeLine) {
    if (mainTimeLine._ts) {
      mainTimeLine.pause();
      granimBG.pause();

      // mainTimeLine.restart();
    } else {
      mainTimeLine.play();
      granimBG.play();
    }
  }
});

function initBreathAnimation() {
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

  mainTimeLine = gsap.timeline({
    repeat: -1,
    paused: true,
    defaults: { duration: 19 },
  });

  // Container shrink/grow
  mainTimeLine.to(circleContainer, {
    keyframes: {
      "0%": {
        scale: 1,
      },
      "21%": {
        scale: 1.3,
      },
      "47%": {
        scale: 1.3,
      },
      "100%": {
        scale: 1,
      },
    },
  });

  mainTimeLine.to(
    textEl,
    {
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
        "47%": {
          onComplete: () => {
            updateText("Выдох");
          },
        },
        // "100%": {
        //   onStart: () => {
        //     updateText("Вдох");
        //   },
        // },
      },
    },
    "<"
  );

  // Outer Circle shadow dynamic
  mainTimeLine.to(
    outerCircle,
    {
      keyframes: {
        "0%": {
          boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
        },
        "21%": {
          boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
        },
        "47%": {
          boxShadow: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.5)",
        },
        "100%": {
          boxShadow: "0rem 0rem 1px rgba(0, 0, 0, 0.7)",
        },
        ease: "linear",
      },
    },
    "<"
  );

  // Inner circle BG
  mainTimeLine.to(
    innerCircle,
    {
      keyframes: {
        "0%": {
          backgroundColor: gradients[currentColorSchema][0][0],
          ease: "linear",
        },
        "21%": {
          backgroundColor: gradients[currentColorSchema][0][1],
          ease: "Power1.easeIn",
        },
        "47%": {
          backgroundColor: gradients[currentColorSchema][0][1],
          ease: "linear",
        },
        "100%": {
          backgroundColor: gradients[currentColorSchema][0][0],
          ease: "Power1.easeIn",
        },
      },
    },
    "<"
  );

  gsap.set(innerCircle, {
    backgroundColor: gradients[currentColorSchema][0][0],
    scale: 0.75,
  });

  mainTimeLine.to(
    innerCircle,
    {
      keyframes: {
        "0%": {
          scale: 0.75,
          ease: "linear",
        },
        "21%": {
          scale: 0.9,
          ease: "Power1.easeIn",
        },
        "47%": {
          scale: 0.95,
          ease: "linear",
        },
        "100%": {
          scale: 0.75,
          ease: "Power1.easeIn",
        },
      },
    },
    "<"
  );

  mainTimeLine.to(
    pointerContainer,
    {
      keyframes: {
        "0%": {
          rotate: 0,
          ease: "linear",
        },
        "21%": {
          rotate: 76,
          ease: "Power1.easeIn",
        },
        "47%": {
          rotate: 120,
          ease: "linear",
        },
        "100%": {
          rotate: 360,
          ease: "Power1.easeIn",
        },
      },
    },
    "<0.2"
  );

  gsap.set(pointer, { backgroundColor: gradients[currentColorSchema][0][1] });

  mainTimeLine.to(
    pointer,
    {
      keyframes: {
        "0%": {
          backgroundColor: gradients[currentColorSchema][0][1],
        },
        "21%": {
          backgroundColor: gradients[currentColorSchema][0][0],
        },
        "47%": {
          backgroundColor: gradients[currentColorSchema][0][0],
        },
        "100%": {
          backgroundColor: gradients[currentColorSchema][0][1],
        },
      },
    },
    "<"
  );
}

function updateText(string) {
  textEl.textContent = string;
}

// Init color schema
setColorSchema(currentColorSchema);
