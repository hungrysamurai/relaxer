export function getFromLocalStorage(
  item: "color-schema" | "mode" | "custom-mode",
): string | null {
  return localStorage.getItem(`relaxer-${item}`);
}

export function setInLocalStorage(
  item: "color-schema" | "mode" | "custom-mode",
  value: string | number,
): void {
  localStorage.setItem(`relaxer-${item}`, value.toString());
}
