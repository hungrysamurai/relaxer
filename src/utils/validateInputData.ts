export default function validateInputData(input: HTMLInputElement) {
  const value = Number(input.value);
  if (value < 0 || value > 20 || isNaN(value)) {
    input.value = "";
  }
}
