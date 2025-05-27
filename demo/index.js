import { HTMLClip, loadPlugin } from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import MyPluginDefinition from "../dist/bundle.esm.js";
const MyPlugin = loadPlugin(MyPluginDefinition);

const clip = new HTMLClip({
  html: `<div class="container">
        <div id="secs"></div>
        <div id="mins"></div>
        <div id="hours"></div>
    </div>`,
  css: `
        .container{
            width: 600px;
            height: 300px;
            background-color: #f0f0f0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            border: 1px solid #ccc;
        }
        .container>div{
            width: 200px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2em;
            color: #333;
        }
    `,
  host: document.getElementById("clip"),
  containerParams: {
    width: "600px",
    height: "400px",
  },
});

const newEffect = new MyPlugin.Countdown(
  {
    type: "seconds",
    operation: "free",
    animatedAttrs: {
      time: 2748372018714,
    },
  },
  {
    selector: "#secs",
    duration: 5000,
  },
);

const newEffect2 = new MyPlugin.Countdown(
  {
    type: "minutes",
    operation: "free",
    animatedAttrs: {
      time: 2748372018714,
    },
  },
  {
    selector: "#mins",
    duration: 5000,
  },
);

const newEffect3 = new MyPlugin.Countdown(
  {
    type: "hours",
    operation: "free",
    animatedAttrs: {
      time: 2748372018714,
    },
  },
  {
    selector: "#hours",
    duration: 5000,
  },
);


clip.addIncident(newEffect, 0);
clip.addIncident(newEffect2, 0);
clip.addIncident(newEffect3, 0);

new Player({ clip });
