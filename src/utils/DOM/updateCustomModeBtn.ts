import { customModeBtn } from "../../DOMElements";

export default function updateCustomModeBtn(newMode?: string) {
  if (newMode) {
    customModeBtn.textContent = newMode;
    customModeBtn.classList.remove("disable");
    customModeBtn.dataset.mode = newMode;
  } else {
    customModeBtn.textContent = "";
    customModeBtn.classList.add("disable");
    delete customModeBtn.dataset.mode;
  }
}
