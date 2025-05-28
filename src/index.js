import Countdown from './Incidents/Effect';

import {name,version}  from '../package.json'

export default {
  npm_name: name, // don't touch this
  version: version, // don't touch this
  incidents: [
    {
      exportable: Countdown,
      name: "Countdown", // name your Incident any way you want
      attributesValidationRules: {
        forceDoubleDigit: {
          type: "boolean", // if true, the countdown will always be displayed with two digits (e.g. 01 instead of 1)
          default: false
        },
        operation: {
          type: "string",
          enum: ["free", "fixed"], // "free" operation makes the countdown independent of the Clip's execution
          default: "fixed"
        },
        type: {
          type: "string",
          enum: ["seconds", "minutes", "hours", "days"], // the type of the countdown
          default: "seconds"
        },
        animatedAttrs: {
          type: "object",
          props: {
            // it's either a unix timestamp in milliseconds which is the target time for the countdown or a number of milliseconds which defines the countdown duration
            // No need to define which of the two. If the number is less than the current unix time it'll be treated as a duration in milliseconds, otherwise as a unix timestamp in milliseconds
              time: { 
                  type: 'number',
                  positive: true, 
                  integer: true
              }
            // validation rules as per [fastest-validator](https://www.npmjs.com/package/fastest-validator) library
          }
        }
      }
    }
  ]
};