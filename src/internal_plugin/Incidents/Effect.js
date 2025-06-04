import { Effect } from "@donkeyclip/motorcortex";

const getDividor = (target, context) => {
  if(target === "seconds") {
    if(context === "seconds") {
      return 1; // 1 second in seconds
    } else if(context === "minutes") {
      return 60; // 60 seconds in a minute
    } else if(context === "hours") {
      return 60 * 60; // 3600 seconds in an hour
    } else if(context === "days") {
      return 60 * 60 * 24; // 86400 seconds in a day
    } else return 60;
  } else if(target === "minutes") {
    const minute = 60;
    if(context === "hours") {
      return 60 * minute; // 60 minutes in an hour
    } else if(context === "days") {
      return 60 * 24 * minute; // 1440 minutes in a day
    } else if(context === "minutes") {
      return minute; // 1 minute in minutes
    } else return 60 * minute; // 60 seconds in a minute
  } else if(target === "hours") {
    const hour = 60 * 60;
    if(context === "days") {
      return 24 * hour; // 24 hours in a day
    } else if(context === "hours") {
      return hour; // 1 hour in hours
    } else return 24 * hour; // 24 hours in a day
  } else if(target === "days") {
    return 24 * 60 * 60;
  }
}


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
    const target = this.targetValue;
    let delta = target - now;
    if (delta < 0) {
      delta = this.targetValue
    }
    delta = Math.floor(delta / 1000); // convert to seconds

    if(this.attrs.type === "seconds") {
      this.down = (ms)=> {
        const elapsedSeconds = Math.floor(ms / 1000);
        const remainingSeconds = delta - elapsedSeconds;
        let value = remainingSeconds%getDividor(this.attrs.type, this.attrs.context);

        if(value < 0) value = 0;
        if(this.attrs.forceDoubleDigit) {
          value = value.toString().padStart(2, '0');
        }
        return value;
      }
    } else if(this.attrs.type === "minutes") {
      this.down = (ms)=> {
        const elapsedSeconds = Math.floor(ms / 1000);
        const remainingSeconds = delta - elapsedSeconds;
        const secsInsightHour = remainingSeconds%getDividor(this.attrs.type, this.attrs.context);
        let value = Math.floor(secsInsightHour / 60);
        if(value < 0) value = 0;
        if(this.attrs.forceDoubleDigit) {
          value = value.toString().padStart(2, '0');
        }
        return value;
      }
    } else if(this.attrs.type === "hours") {
      this.down = (ms)=> {
        const elapsedSeconds = Math.floor(ms / 1000);
        const remainingSeconds = delta - elapsedSeconds;
        const secsInsightDay = remainingSeconds%getDividor(this.attrs.type, this.attrs.context);
        let value = Math.floor(secsInsightDay / (60 * 60));
        if(value < 0) value = 0;
        if(this.attrs.forceDoubleDigit) {
          value = value.toString().padStart(2, '0');
        }
        return value;
      }
    } else if (this.attrs.type === "days") {
      this.down = (ms)=> {
        const elapsedSeconds = Math.floor(ms / 1000);
        const remainingSeconds = delta - elapsedSeconds;
        let value = Math.floor(remainingSeconds / (60 * 60 * 24));
        if(value < 0) value = 0;
        if(this.attrs.forceDoubleDigit) {
          value = value.toString().padStart(2, '0');
        }
        return value;
      }
     }  else {
      throw new Error("Invalid type for countdown effect");
    }

    if(this.attrs.operation === "free") {
      const flash = (timestamp) => {      
        // Call animate again on the next frame
        const val = this.down(timestamp);
        this.element.innerHTML = val;
        requestAnimationFrame(flash);
      }
      
      // Start the loop
      requestAnimationFrame(flash);
    }
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
    if(this.attrs.operation === "free"){
      return ;
    }
    let value = this.down(millisecond);
    this.element.innerHTML = value;
  }
}
