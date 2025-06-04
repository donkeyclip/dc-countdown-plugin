import { Effect, loadPlugin } from "@donkeyclip/motorcortex";
import InternalPluginDef from "../internal_plugin/index.js";
const InternalPlugin = loadPlugin(InternalPluginDef);

/**
 * For details of the Combo concept and usage please refer to
 * documentation.
 *
 * As soon as you are familiar with MotorCortex.Combo it's extremely
 * easy to implement your own Incidents by extending it. The only
 * method you need to write is the get incidents where you can
 * define your fix incidents of your Combo. Feel free to use
 * any dynamic value (@stagger, @expression, @attribute) as well as
 * to use this.attrs in order to access your Combo's attrs and produce
 * dynamic results.
 */
export default class GayCD extends Effect {
    onGetContext() {
        const selectors = {
            'hours': '#hours',
            'minutes': '#minutes',
            'seconds': '#seconds',
            'days': '#days'
        }
        Object.keys(selectors).forEach((key) => {
            if (this.attrs[key] && this.attrs[key].selector) {
                selectors[key] = this.attrs[key].selector;
            }
        });
        const elements = {};
        Object.keys(selectors).forEach((key) => {
            const element = this.element.querySelector(selectors[key]);
            if (element) {
                elements[key] = element;
            }
        });
        
  }
}