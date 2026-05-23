export function getFromLocalStorage(
  item: "colorSchema" | "mode",
): string | null {
  return localStorage.getItem(`relaxer-${item}`);
}

export function setInLocalStorage(
  item: "colorSchema" | "mode",
  value: string | number,
): void {
  localStorage.setItem(`relaxer-${item}`, value.toString());
}
