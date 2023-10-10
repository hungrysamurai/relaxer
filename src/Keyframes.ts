interface IKeyframes {
  [key: string]: gsap.AnimationVars
}

import { BgColorPair } from "./gradients";
/**
 * Class that generates Keyframes object for specific mode
 */
export default class Keyframes {
  private BGColors: [string, string];

  keyframesPositions: string[];

  circleContainer: Object;
  textEl: Object;
  outerCircle: Object;
  innerCircle: Object;
  pointerContainer: Object;
  pointer: Object;

  /**
   *
   * @param {string} mode - current mode of relaxer
   * @param {Array} currentGradientsSet - array of two sub-arrays that contains pairs of colors of current color scheme
   * @param {number} totalDuration - total duration of animation
   * @param {Function} textCallback - function that perform text switching
   * @this Keyframes
   */
  constructor(
    private mode: string,
    currentGradientsSet: BgColorPair,
    private totalDuration: number,
    private textCallback: Function
  ) {
    this.BGColors = currentGradientsSet[0];

    // Get array of keyframes
    this.keyframesPositions = this.generatePositions();

    // Get keyframes objects for each element
    this.circleContainer = this.getCircleContainerKeyframes(1, 1.3);
    this.textEl = this.getTextElKeyframes();
    this.outerCircle = this.getOuterCircleKeyframes(
      "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
      "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.7)"
    );
    this.innerCircle = this.getInnerCircleKeyframes(
      0.75,
      0.9,
      0.95,
      "linear",
      "Power1.easeIn"
    );
    this.pointerContainer = this.getPointerContainerKeyframes(
      "linear",
      "Power1.easeIn"
    );
    this.pointer = this.getPointerKeyframes();
  }

  /**
   * @property {Function} generatePositions - init Comparer in DOM
   * @returns {Array} this.keyframesPositions - array of strings that represents each keyframe in animation
   */
  generatePositions(): string[] {
    const periods = this.mode.split("-");
    const positions = [0];

    for (const period of periods) {
      const value = Math.round((parseInt(period) / this.totalDuration) * 100);

      if (positions.length === 1) {
        positions.push(value);
      } else {
        const prev = positions[positions.length - 1];
        positions.push(value + prev);
      }
    }

    return positions.map((position) => `${position}%`);
  }

  /**
   * @property {Function} getCircleContainerKeyframes - generate keyframes object for circleContainer
   * @param {number} min - min value in animation
   * @param {number} max - max value in animation
   */
  getCircleContainerKeyframes(min: number, max: number): Object {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length; i++) {
      keyframes[this.keyframesPositions[i]] = {
        scale: i === 1 || i === 2 ? max : min,
      };
    }

    return {
      keyframes,
    };
  }

  /**
   * @property {Function} getTextElKeyframes - generate keyframes object for textEl
   */
  getTextElKeyframes(): Object {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length - 1; i++) {
      keyframes[this.keyframesPositions[i]] = {
        onComplete:
          i === 0
            ? () => {
              this.textCallback("Вдох");
            }
            : i % 2 === 0
              ? () => {
                this.textCallback("Выдох");
              }
              : () => {
                this.textCallback("Держим");
              },
      };
    }

    return {
      keyframes,
    };
  }

  /**
   * @property {Function} getOuterCircleKeyframes - generate keyframes object for outerCircle
   * @param {string} min - min value in animation
   * @param {string} max - max value in animation
   */
  getOuterCircleKeyframes(min: string, max: string): Object {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length; i++) {
      keyframes[this.keyframesPositions[i]] = {
        boxShadow: i === 1 || i === 2 ? max : min,
      };
    }

    return {
      keyframes,
    };
  }

  /**
   * @property {Function} getInnerCircleKeyframes - generate keyframes object for innerCircle
   * @param {number} scale1 - min value in scale animation
   * @param {number} scale2 - mid value in scale animation
   * @param {number} scale3 - max value in scale animation
   * @param {string} easeMin - easing value
   * @param {string} easeMax - easing value
   */
  getInnerCircleKeyframes(scale1: number, scale2: number, scale3: number, easeMin: string, easeMax: string): Object {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length; i++) {
      keyframes[this.keyframesPositions[i]] = {
        scale: i === 1 ? scale2 : i === 2 ? scale3 : scale1,
        backgroundColor:
          i === 1 || i === 2
            ? this.BGColors[1]
            : this.BGColors[0],
        ease: i === 0 || i === 2 ? easeMin : easeMax,
      };
    }

    return {
      keyframes,
    };
  }

  /**
   * @property {Function} getPointerContainerKeyframes - generate keyframes object for pointerContainer
   * @param {string} easeMin - easing value
   * @param {string} easeMax - easing value
   */
  getPointerContainerKeyframes(easeMin: string, easeMax: string): Object {
    const rotationValues = [0];

    for (let i = 1; i < this.keyframesPositions.length; i++) {
      const current = parseInt(this.keyframesPositions[i]);

      const value = Math.round((360 / 100) * current);
      rotationValues.push(value);
    }

    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length; i++) {
      keyframes[this.keyframesPositions[i]] = {
        rotate: rotationValues[i],
        ease:
          i === 1 || i === this.keyframesPositions.length - 1
            ? easeMax
            : easeMin,
      };
    }

    return {
      keyframes,
    };
  }

  /**
   * @property {Function} getPointerKeyframes - generate keyframes object for pointer
   */
  getPointerKeyframes(): Object {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.keyframesPositions.length; i++) {
      keyframes[this.keyframesPositions[i]] = {
        backgroundColor:
          i === 1 || i === 2
            ? this.BGColors[0]
            : this.BGColors[1],
      };
    }

    return {
      keyframes,
    };
  }
}
