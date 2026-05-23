export default function animationStateIconToggle(
  animationStateIcon: Element,
  reset = false,
) {
  if (!reset) {
    if (animationStateIcon.classList.contains("fa-play")) {
      animationStateIcon.classList.remove("fa-play");
      animationStateIcon.classList.add("fa-pause");
    } else {
      animationStateIcon.classList.remove("fa-pause");
      animationStateIcon.classList.add("fa-play");
    }
  } else {
    animationStateIcon.className = "fa-solid fa-play";
  }
}
