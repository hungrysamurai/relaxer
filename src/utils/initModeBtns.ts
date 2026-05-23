export default function initModeBtns(
  modeBtns: NodeListOf<HTMLButtonElement>,
  currentMode: string,
  customMode: string | null,
  customModeBtn: HTMLButtonElement,
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
