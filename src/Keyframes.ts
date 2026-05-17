import { BgColorPair } from "./gradients";

/**
 * GSAP keyframes map keyed by timeline position labels (e.g. `"0%"`, `"21%"`).
 */
interface IKeyframes {
  [key: string]: gsap.AnimationVars;
}

/**
 * Wrapper for a single element's GSAP `keyframes` tween vars.
 */
export interface ElementKeyframes {
  keyframes: IKeyframes;
}

/** Breath phase label shown in the UI during the cycle. */
type BreathLabel = "Вдох" | "Держим" | "Выдох";

/** Callback invoked when the breath instruction text should update. */
type TextCallback = (label: BreathLabel) => void;

/**
 * A single point on the breathing animation timeline.
 */
interface TimelinePoint {
  /** Zero-based index of this point in the timeline. */
  index: number;
  /** Cumulative position on the timeline, from 0 to 100. */
  percent: number;
  /** GSAP-compatible position label (e.g. `"58%"`). */
  positionLabel: string;
}

/**
 * Default scale, shadow, color, and easing values for all animated elements.
 */
const ANIMATION_PROFILE = {
  circleContainer: { collapsed: 1, expanded: 1.3 },
  outerCircle: {
    shadowRest: "0rem 0rem 1px rgba(0, 0, 0, 0.1)",
    shadowPeak: "0.1rem 0.1rem 86px 4px rgba(0, 0, 0, 0.7)",
  },
  innerCircle: {
    scales: { rest: 0.75, mid: 0.9, peak: 0.95 },
    ease: { segment: "linear", transition: "Power1.easeIn" },
  },
  pointerContainer: {
    ease: { segment: "linear", transition: "Power1.easeIn" },
  },
} as const;

/**
 * Returns whether the keyframe index represents the expanded circle state
 * (peak inhale and hold). For a classic 4-7-8 cycle, only indices 1 and 2
 * are expanded; index 0 is the start and index 3+ is exhale / collapse.
 *
 * @param index - Zero-based keyframe index on the timeline.
 * @returns `true` for expanded keyframes (indices 1 and 2).
 */
function isExpandedKeyframe(index: number): boolean {
  return index === 1 || index === 2;
}

/**
 * Resolves the breath instruction label shown when a timeline segment completes.
 *
 * @param index - Zero-based keyframe index at the start of the segment.
 * @returns UI label: inhale at 0, hold on odd indices, exhale on even indices > 0.
 */
function breathLabelAtKeyframe(index: number): BreathLabel {
  if (index === 0) return "Вдох";
  if (index % 2 === 0) return "Выдох";
  return "Держим";
}

/**
 * Returns the inner circle scale for a given keyframe index.
 *
 * @param index - Zero-based keyframe index on the timeline.
 * @param scales - Rest, mid, and peak scale values from {@link ANIMATION_PROFILE}.
 * @returns Scale value for that keyframe (mid at 1, peak at 2, rest otherwise).
 */
function innerScaleAt(
  index: number,
  scales: typeof ANIMATION_PROFILE.innerCircle.scales,
): number {
  if (index === 1) return scales.mid;
  if (index === 2) return scales.peak;
  return scales.rest;
}

/**
 * Builds GSAP keyframe tween configs for the relaxer breathing animation
 * from a mode string (e.g. `"4-7-8"`) and the active color scheme.
 */
export default class Keyframes {
  private readonly bgColors: [string, string];
  private readonly timeline: TimelinePoint[];
  private readonly rotationDegrees: number[];

  /**
   * Timeline position labels in GSAP format (`"0%"`, `"21%"`, …).
   * One entry per keyframe point on the breathing cycle.
   */
  readonly keyframesPositions: string[];

  /** Keyframes for the main circle container scale animation. */
  readonly circleContainer: ElementKeyframes;

  /** Keyframes for breath instruction text (`onComplete` callbacks). */
  readonly textEl: ElementKeyframes;

  /** Keyframes for the outer circle box-shadow animation. */
  readonly outerCircle: ElementKeyframes;

  /** Keyframes for the inner circle scale, fill color, and easing. */
  readonly innerCircle: ElementKeyframes;

  /** Keyframes for the pointer container rotation and easing. */
  readonly pointerContainer: ElementKeyframes;

  /** Keyframes for the pointer fill color. */
  readonly pointer: ElementKeyframes;

  /**
   * Parses the breathing mode, builds the timeline, and populates all
   * element keyframe objects used by the main GSAP timeline.
   *
   * @param mode - Breathing pattern as hyphen-separated seconds (e.g. `"4-7-8"`).
   * @param currentGradientsSet - Active color scheme from {@link gradients}.
   * @param totalDuration - Full cycle length in seconds (sum of mode segments).
   * @param textCallback - Updates the on-screen breath instruction text.
   */
  constructor(
    private mode: string,
    currentGradientsSet: BgColorPair,
    private totalDuration: number,
    private textCallback: TextCallback,
  ) {
    this.bgColors = currentGradientsSet[0];
    this.timeline = this.buildTimeline();
    this.keyframesPositions = this.timeline.map((point) => point.positionLabel);
    this.rotationDegrees = this.buildRotationDegrees();

    const { circleContainer, outerCircle, innerCircle, pointerContainer } =
      ANIMATION_PROFILE;

    this.circleContainer = this.buildPropertyKeyframes((index) => ({
      scale: isExpandedKeyframe(index)
        ? circleContainer.expanded
        : circleContainer.collapsed,
    }));

    this.textEl = this.buildTextKeyframes();

    this.outerCircle = this.buildPropertyKeyframes((index) => ({
      boxShadow: isExpandedKeyframe(index)
        ? outerCircle.shadowPeak
        : outerCircle.shadowRest,
    }));

    this.innerCircle = this.buildPropertyKeyframes((index) => ({
      scale: innerScaleAt(index, innerCircle.scales),
      backgroundColor: isExpandedKeyframe(index)
        ? this.bgColors[1]
        : this.bgColors[0],
      ease:
        index === 0 || index === 2
          ? innerCircle.ease.segment
          : innerCircle.ease.transition,
    }));

    this.pointerContainer = this.buildPropertyKeyframes((index) => ({
      rotate: this.rotationDegrees[index],
      ease: this.pointerEaseAt(index, pointerContainer.ease),
    }));

    this.pointer = this.buildPropertyKeyframes((index) => ({
      backgroundColor: isExpandedKeyframe(index)
        ? this.bgColors[0]
        : this.bgColors[1],
    }));
  }

  /**
   * Converts the mode string into cumulative timeline percentages.
   * Each segment length is converted to a share of 100% and summed
   * so keyframes land at 0%, end of inhale, end of hold, and 100%.
   *
   * @returns Ordered timeline points from 0% through the end of the cycle.
   */
  private buildTimeline(): TimelinePoint[] {
    const periods = this.mode.split("-");
    const percents = [0];

    for (const period of periods) {
      const segmentPercent = Math.round(
        (parseInt(period, 10) / this.totalDuration) * 100,
      );

      if (percents.length === 1) {
        percents.push(segmentPercent);
      } else {
        const previous = percents[percents.length - 1];
        percents.push(segmentPercent + previous);
      }
    }

    return percents.map((percent, index) => ({
      index,
      percent,
      positionLabel: `${percent}%`,
    }));
  }

  /**
   * Computes pointer rotation in degrees for each timeline keyframe.
   * Rotation is proportional to cumulative timeline percent (full turn at 100%).
   *
   * @returns Rotation in degrees per keyframe index (starts at 0).
   */
  private buildRotationDegrees(): number[] {
    const rotations = [0];

    for (let i = 1; i < this.timeline.length; i++) {
      if (i === this.timeline.length - 1) {
        rotations.push(360);
      } else {
        const degrees = Math.round((360 / 100) * this.timeline[i].percent);
        rotations.push(degrees);
      }
    }

    return rotations;
  }

  /**
   * Selects easing for the pointer container at a given keyframe.
   * Uses transition easing at the first expansion keyframe and at the last
   * keyframe; linear easing for intermediate segments.
   *
   * @param index - Zero-based keyframe index on the timeline.
   * @param ease - Segment and transition ease names from {@link ANIMATION_PROFILE}.
   * @returns GSAP ease string for this keyframe.
   */
  private pointerEaseAt(
    index: number,
    ease: typeof ANIMATION_PROFILE.pointerContainer.ease,
  ): string {
    const isLastKeyframe = index === this.timeline.length - 1;
    return index === 1 || isLastKeyframe ? ease.transition : ease.segment;
  }

  /**
   * Builds a GSAP keyframes object by mapping each timeline point to tween vars.
   *
   * @param getProps - Returns animation vars for a given keyframe index.
   * @returns {@link ElementKeyframes} ready to pass to `gsap.to()`.
   */
  private buildPropertyKeyframes(
    getProps: (index: number) => gsap.AnimationVars,
  ): ElementKeyframes {
    const keyframes: IKeyframes = {};

    for (const point of this.timeline) {
      keyframes[point.positionLabel] = getProps(point.index);
    }

    return { keyframes };
  }

  /**
   * Builds keyframes for the breath instruction element.
   * Attaches an `onComplete` handler at each segment start (all points except the last)
   * so the label updates when inhale, hold, or exhale begins.
   *
   * @returns {@link ElementKeyframes} with `onComplete` callbacks for {@link textCallback}.
   */
  private buildTextKeyframes(): ElementKeyframes {
    const keyframes: IKeyframes = {};

    for (let i = 0; i < this.timeline.length - 1; i++) {
      const label = breathLabelAtKeyframe(i);
      keyframes[this.timeline[i].positionLabel] = {
        onComplete: () => this.textCallback(label),
      };
    }

    return { keyframes };
  }
}
