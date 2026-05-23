/**
 * @property {Function} getTotalDuration - calculate total duration of animation
 * @param {string} modeString - string that represents mode
 * @returns {number} - total time of cycle in seconds
 *
 * @example getTotalDuration('4-4-4-4')
 */
export default function getTotalDuration(modeString: string): number {
  return modeString
    .split("-")
    .map((n) => parseInt(n))
    .reduce((a, c) => a + c);
}
