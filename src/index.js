import Countdown from './Incidents/Effect';

import {name,version}  from '../package.json'

export default {
  npm_name: name, // don't touch this
  version: version, // don't touch this
  incidents: [
    {
      exportable: Countdown,
      name: "Countdown", // name your Incident any way you want
    //   attributesValidationRules: {
    //     // define your attributeValidationRules so MotorCortex can automatically validate them on instantiation 
    //     // also so your Incidents are directly embedable to DonkeyClip
    //     animatedAttrs: {
    //       type: "object",
    //       props: {
    //           attr: {
    //               type: 'string'
    //           }
    //         // validation rules as per [fastest-validator](https://www.npmjs.com/package/fastest-validator) library
    //       }
    //     }
    //   }
    }
  ]
};