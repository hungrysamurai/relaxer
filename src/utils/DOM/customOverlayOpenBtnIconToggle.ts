import { customModeOverlayOpenBtn } from "../../DOMElements";

export default function customModeOverlayOpenBtnIconToggle(): void {
  const iconElement = customModeOverlayOpenBtn.children[0];

  if (iconElement.classList.contains("fa-plus")) {
    iconElement.classList.remove("fa-plus");
    iconElement.classList.add("fa-bars");
  } else {
    iconElement.classList.remove("fa-bars");
    iconElement.classList.add("fa-plus");
  }
}
