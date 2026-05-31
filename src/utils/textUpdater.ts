import { textEl } from "../DOMElements";

/**
 * @property {Function} updateText - set textContent of textEl to @param
 */
export default function updateText(string: string): void {
  textEl.textContent = string;
}
