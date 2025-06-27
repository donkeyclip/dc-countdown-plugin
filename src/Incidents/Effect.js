import { Effect } from "@donkeyclip/motorcortex";

/**
 * The purpose of Effects is to timely alter the state or value of attributes of
 * selected elements of the context, specified on the "selector"
 * property of theirs.
 *
 * The attributes of the elements that the Effect manipulates are
 * always defined on the attrs.animatedAttrs object, passed to it on its constructor.
 * Each key of this object corresponds to an attribute that the Effect will alter and the value
 * of each specifies the final value to go to.
 * On runtime, each Effect is analysed first by element and secondly
 * by animatedAttr.
 * For example an Effect that has the selector ".my-class",
 * that applies in two elements of the context, and has two animatedAttrs
 * will be analysed into four in total "MonoIncidents" (2 elements * 2 animatedAttrs).
 * Each of these produced MonoIncidents refer to a very specific element and
 * to a very specific animated attribute.
 * The Class that you are defining here extends Effect which represents exactly this MonoIncident.
 *
 * Thus, here you'll find:
 * the following properties:
 * - this.element: provides a reference to the specific element of the MonoIncident
 * - this.attributeKey: the key of the animatedAttr of the MonoIncident
 * - this.targetValue: the final value of the animatedAttr
 * - this.initialValue: the initial value of the animatedAttr
 * and the following methods:
 * - onGetContext
 * - getScratchValue
 * - onProgress
 * which are analysed more inline
 *
 **/
export default class Countdown extends Effect {
  /**
   * the very first MonoIncident of the specific element and the
   * specific attribute that will ever enter a Clip will be asked
   * to provide the initial (the scratch) value of its animatedAttr
   * for its element.
   **/
  getScratchValue() {
    return 0;
  }

  /**
   * The moment the Effect gets applied as MonoIncident to the specific
   * element and for the specific animatedAttr.
   * You can use this method to initialise anything you need to initialise
   * in order to use it on the onProgress method
   **/
  onGetContext() {
    const now = Date.now();
    this.loadTime = now;
    const target = this.targetValue;
    let delta = target - now;
    if (delta < 0) { delta = this.targetValue; }
    delta = Math.floor(delta / 1000); // convert to seconds

    switch (this.attrs.type) {
      case "seconds": {
        this.down = (ms) => {
          const elapsedSeconds = Math.floor(ms / 1000);
          const remainingSeconds = delta - elapsedSeconds;
          return (remainingSeconds % 60);
        };
      }

      case "minutes": {
        this.down = (ms) => {
          const elapsedSeconds = Math.floor(ms / 1000);
          const remainingSeconds = delta - elapsedSeconds;
          const secsInsightHour = remainingSeconds % (60 * 60);
          return Math.floor(secsInsightHour / 60);
        };
      }

      case "hours": {
        this.down = (ms) => {
          const elapsedSeconds = Math.floor(ms / 1000);
          const remainingSeconds = delta - elapsedSeconds;
          const secsInsightDay = remainingSeconds % (60 * 60 * 24);
          return Math.floor(secsInsightDay / (60 * 60));
        };
        return;
      }

      case "days": {
        this.down = (ms) => {
          const elapsedSeconds = Math.floor(ms / 1000);
          const remainingSeconds = delta - elapsedSeconds;
          return Math.floor(remainingSeconds / (60 * 60 * 24));
        }
        return
      }
    }
    throw new Error("Invalid type for countdown effect");

  }

  /**
   * Takes two arguments the "fraction" which is a number from 0 to 1, representing
   * the fraction (the percentage) of the duration that we are in,
   * and the millisecond which defines the absolute millisecond.
   * You can use this method to animate your attribute.
   * Remember that you don't need to worry about easings. Easings are already
   * applied before reaching the execution of this method. This method's
   * arguments have already been re-calculated based on the easing.
   **/
  // eslint-disable-next-line no-unused-vars
  onProgress(millisecond) {
    if (this.attrs.operation === "free") {
      millisecond = Date.now() - this.loadTime;
    }
    let value = this.down(millisecond);
    if (value < 0) {
      value = 0;
    }
    this.element.innerHTML = this.attrs.forceDoubleDigit ? value.toString().padStart(2, "0") : value
  }
}
