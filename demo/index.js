import { HTMLClip, loadPlugin } from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import MyPluginDefinition from "../dist/dc-countdown-plugin.esm.js";
const MyPlugin = loadPlugin(MyPluginDefinition);

const clip = new HTMLClip({
  html: `
  <div class="container">
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


<div class="row">
<h2>Free ending with init params</h2>
<div class="timer">
  <div class="col">
    <div class="label">Days</div>
    <div class="value" id="freeInit-days">00</div>
    <div class="bubble">type: 'days'<br>operation: 'free'<br>forceDoubleDigit: false</div>
  </div>
  <div class="col">
    <div class="label">Hours</div>
    <div class="value" id="freeInit-hours">00</div>
    <div class="bubble">type: 'hours'<br>operation: 'free'<br>forceDoubleDigit: false</div>
  </div>
  <div class="col">
    <div class="label">Minutes</div>
    <div class="value" id="freeInit-minutes">12</div>
    <div class="bubble">type: 'minutes'<br>operation: 'free'<br>forceDoubleDigit: false</div>
  </div>
  <div class="col">
    <div class="label">Seconds</div>
    <div class="value" id="freeInit-seconds">59</div>
    <div class="bubble">type: 'seconds'<br>operation: 'free'<br>forceDoubleDigit: false</div>
  </div>
</div>
</div>
</div>`,
  css: `
  .container {
    width: 600px;
    height: 480px;
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
`,

  host: document.getElementById("clip"),
  containerParams: {
    width: "600px",
    height: "500px",
  },
  initParams: {
    countdownMilliseconds: 24 * 60 * 60 * 1000,
  },
});

const closeFutureUnixTime = Date.now() + 70000; // 70 seconds from now
const threeDaysAndTenSecs = 3 * 24 * 60 * 60 * 1000 + 15000; // in milliseconds
function createIncidents(operation, time, selectorPrefix, forceDoubleDigit, includeDays = false) {
  [
    new MyPlugin.Countdown(
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
      }
    ),
    new MyPlugin.Countdown(
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
      }
    ), new MyPlugin.Countdown(
      {
        type: "hours",
        operation,
        forceDoubleDigit,
        animatedAttrs: {
          time: time,
        },
      },
      {
        selector: `#${selectorPrefix}-hours`,
        duration: 20000,
      }
    )].forEach((incident) => {
      clip.addIncident(incident, 0);
    });


  if (!includeDays) return;

  clip.addIncident(
    new MyPlugin.Countdown(
      {
        type: "days",
        forceDoubleDigit,
        operation,
        animatedAttrs: {
          time: time,
        },
      },
      {
        selector: `#${selectorPrefix}-days`,
        duration: 20000,
      }
    )
    , 0)
}


createIncidents("free", closeFutureUnixTime, "free", true)
createIncidents("fixed", closeFutureUnixTime, "fixed", true)
createIncidents("free", threeDaysAndTenSecs, "free2", false, true)
createIncidents(
  "free",
  "@initParams.countdownMilliseconds",
  "freeInit",
  false,
  true
)


new Player({ clip });
