import { HTMLClip, loadPlugin } from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import MyPluginDefinition from "../dist/bundle.esm.js";
const MyPlugin = loadPlugin(MyPluginDefinition);

const clip = new HTMLClip({
  html: `<div class="container">
  <div class="row">
    <h2>Free countdown</h2>
    <div class="timer">
      <div class="col">
        <div class="label">Hours</div>
        <div class="value" id="free-hours">01</div>
        <div class="bubble">type: 'hours'<br>operation: 'free'<br>forceDoubleDigit: true</div>
      </div>
      <div class="col">
        <div class="label">Minutes</div>
        <div class="value" id="free-minutes">30</div>
        <div class="bubble">type: 'minutes'<br>operation: 'free'<br>forceDoubleDigit: true</div>
      </div>
      <div class="col">
        <div class="label">Seconds</div>
        <div class="value" id="free-seconds">45</div>
        <div class="bubble">type: 'seconds'<br>operation: 'free'<br>forceDoubleDigit: true</div>
      </div>
    </div>
  </div>

  <div class="row">
    <h2>Fixed countdown</h2>
    <div class="timer">
      <div class="col">
        <div class="label">Hours</div>
        <div class="value" id="fixed-hours">00</div>
        <div class="bubble">type: 'hours'<br>operation: 'fixed'<br>forceDoubleDigit: true</div>
      </div>
      <div class="col">
        <div class="label">Minutes</div>
        <div class="value" id="fixed-minutes">12</div>
        <div class="bubble">type: 'minutes'<br>operation: 'fixed'<br>forceDoubleDigit: true</div>
      </div>
      <div class="col">
        <div class="label">Seconds</div>
        <div class="value" id="fixed-seconds">59</div>
        <div class="bubble">type: 'seconds'<br>operation: 'fixed'<br>forceDoubleDigit: true</div>
      </div>
    </div>
  </div>

  <div class="row">
    <h2>Free ending 3 days and 15 seconds from now</h2>
    <div class="timer">
      <div class="col">
        <div class="label">Days</div>
        <div class="value" id="free2-days">00</div>
        <div class="bubble">type: 'days'<br>operation: 'free'<br>forceDoubleDigit: false</div>
      </div>
      <div class="col">
        <div class="label">Hours</div>
        <div class="value" id="free2-hours">00</div>
        <div class="bubble">type: 'hours'<br>operation: 'free'<br>forceDoubleDigit: false</div>
      </div>
      <div class="col">
        <div class="label">Minutes</div>
        <div class="value" id="free2-minutes">12</div>
        <div class="bubble">type: 'minutes'<br>operation: 'free'<br>forceDoubleDigit: false</div>
      </div>
      <div class="col">
        <div class="label">Seconds</div>
        <div class="value" id="free2-seconds">59</div>
        <div class="bubble">type: 'seconds'<br>operation: 'free'<br>forceDoubleDigit: false</div>
      </div>
    </div>
  </div>
</div>`,
css: `
  .container {
    width: 600px;
    height: 380px;
    background-color: #f0f0f0;
  }

  .row {
    margin-bottom: 1rem; /* was 3rem */
  }

  h2 {
    text-align: center;
    margin-bottom: 0.3rem; /* was 1rem */
  }

  .timer {
    display: flex;
    justify-content: center;
    gap: 3rem;
    text-align: center;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .label {
    font-size: 0.4rem;
    margin-bottom: 0.15rem; /* was 0.5rem */
    font-weight: 600;
    text-transform: uppercase;
  }

  .value {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }

  .bubble {
    margin-top: 0.1rem; /* was 0.3rem */
    font-size: 0.3rem;
    background-color: #fff7e6;
    color: #cc5500;
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    line-height: 0.5rem;
    font-family: monospace;
  }
`

,
  host: document.getElementById("clip"),
  containerParams: {
    width: "600px",
    height: "400px",
  },
});

const closeFutureUnixTime = Date.now() + 70000; // 70 seconds from now
const threeDaysAndTenSecs = 3 * 24 * 60 * 60 * 1000 + 15000; // in milliseconds
function getIncidents(operation, time, selectorPrefix, forceDoubleDigit) {
  const newEffect = new MyPlugin.Countdown(
    {
      type: "seconds",
      forceDoubleDigit,
      operation,
      animatedAttrs: {
        time: time,
      },
    },
    {
      selector: `#${selectorPrefix}-seconds`,
      duration: 20000,
    },
  );
  
  const newEffect2 = new MyPlugin.Countdown(
    {
      type: "minutes",
      operation,
      forceDoubleDigit,
      animatedAttrs: {
        time: time,
      },
    },
    {
      selector: `#${selectorPrefix}-minutes`,
      duration: 20000,
    },
  );
  
  const newEffect3 = new MyPlugin.Countdown(
    {
      type: "hours",
      context: "hours",
      operation,
      forceDoubleDigit,
      animatedAttrs: {
        time: time,
      },
    },
    {
      selector: `#${selectorPrefix}-hours`,
      duration: 20000,
    },
  );

  return [newEffect, newEffect2, newEffect3];
}


const freeIncidents = getIncidents("free", closeFutureUnixTime, "free", true);
const fixedIncidents = getIncidents("fixed", closeFutureUnixTime, "fixed", true);
const freeIncidents2 = getIncidents("free", threeDaysAndTenSecs, "free2", false, true);


clip.addIncident(freeIncidents[0], 0);
clip.addIncident(fixedIncidents[0], 0);
clip.addIncident(freeIncidents2[0], 0);

clip.addIncident(freeIncidents[1], 0);
clip.addIncident(fixedIncidents[1], 0);
clip.addIncident(freeIncidents2[1], 0);

clip.addIncident(freeIncidents[2], 0);
clip.addIncident(fixedIncidents[2], 0);
clip.addIncident(freeIncidents2[2], 0);

const newEffect = new MyPlugin.Countdown(
  {
    type: "days",
    forceDoubleDigit: false,
    operation: "free",
    animatedAttrs: {
      time: threeDaysAndTenSecs,
    },
  },
  {
    selector: `#free2-days`,
    duration: 20000,
  },
);

clip.addIncident(newEffect, 0);

const gayCD = new MyPlugin.GayCD(
  {
    hours: { selector: "#free2-hours" },
  }, 
  {
    selector: ".row",
    duration: 20000,
  }
);

console.log(clip.addIncident(gayCD, 0));

new Player({ clip });
