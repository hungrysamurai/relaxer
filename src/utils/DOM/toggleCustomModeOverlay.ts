import gsap from "gsap";
import { customModeOverlay } from "../../DOMElements";

export default function toggleCustomModeOverlay(state: "open" | "close") {
  gsap.to(customModeOverlay, {
    x: state === "open" ? 0 : "100%",
    duration: 0.2,
    ease: "Power4.out",
  });
}
