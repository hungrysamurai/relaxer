import { getFromLocalStorage, setInLocalStorage } from "./localStorage";

export default function getInitialSchemaAndMode(): {
  currentMode: string;
  currentColorSchema: number;
} {
  let currentMode: string;
  let currentColorSchema: number;

  // Get current colorScheme from localStorage, if not found - default to 0
  if (!getFromLocalStorage("colorSchema")) {
    currentColorSchema = 0;
    setInLocalStorage("colorSchema", currentColorSchema);
  } else {
    currentColorSchema = Number(getFromLocalStorage("colorSchema"));
  }

  // Get current mode from localStorage, if noot found - default to 4-7-8
  if (!localStorage.getItem("relaxer-mode")) {
    localStorage.setItem("relaxer-mode", "4-7-8");
    currentMode = "4-7-8";
  } else {
    currentMode = localStorage.getItem("relaxer-mode") || "4-7-8";
  }

  return { currentMode, currentColorSchema };
}
