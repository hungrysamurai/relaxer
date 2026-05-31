import { modeBtns, customModeBtn } from "../../DOMElements";

export default function initModeBtns(
  currentMode: string,
  customMode: string | null,
) {
  if (customMode) {
    customModeBtn.textContent = customMode;
    customModeBtn.classList.remove("disable");
    customModeBtn.dataset.mode = customMode;
  }

  // Set mode button to active
  modeBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.mode === currentMode) {
      btn.classList.add("active");
    }
  });
}
