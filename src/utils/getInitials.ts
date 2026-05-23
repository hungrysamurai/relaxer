import { getFromLocalStorage, setInLocalStorage } from "./localStorage";

export default function getInitialSchemaAndMode(): {
  currentMode: string;
  currentColorSchema: number;
  customMode: string | null;
} {
  let currentMode: string;
  let currentColorSchema: number;
  let customMode: string | null = null;

  // Get current colorScheme from localStorage, if not found - default to 0
  if (!getFromLocalStorage("color-schema")) {
    currentColorSchema = 0;
    setInLocalStorage("color-schema", currentColorSchema);
  } else {
    currentColorSchema = Number(getFromLocalStorage("color-schema"));
  }

  // Get current mode from localStorage, if noot found - default to 4-7-8
  if (!getFromLocalStorage("mode")) {
    setInLocalStorage("mode", "4-7-8");
    currentMode = "4-7-8";
  } else {
    currentMode = getFromLocalStorage("mode") || "4-7-8";
    customMode = getFromLocalStorage("custom-mode");
  }

  return { currentMode, currentColorSchema, customMode };
}
