# dc-countdown-plutin

# Purpose
Easily turn any element in your html to a countdown slot.

# Logic
Each countdown consists of many fields. More specifically our plugin supports:
- seconds
- minutes
- hours

This plugin allows you to initiate a countdown and pick the elements in your clip that will host each of
the three supported fields.

# Example
```javascript
const secs_countdown = new CountdownPlugin.Countdown(
  {
    type: "minutes", // can be either 'seconds', 'minutes' or 'hours'
    operation: "free", // can be either 'free' or 'fixed'. Default 'fixed'
    forceDoubleDigit: true, // set it to true if you want to see double digits always (e.g. "01" instead of "1")
    animatedAttrs: {
      time: time, // set the target time. Is always in milliseconds and can either be a future uinx timestamp or just the duration of the countdown in milliseconds. Don't worry the plugin will automtically figure out what you meant
    },
  },
  {
    selector: `#your-selector`,
    duration: 1000,
  },
);
```

# Parameters
| Parameter            | Description | Type | Default |
|----------------------|-------------|------|---------|
| `type`               | Define which of the three available fields will be illustrated via this incident | `string` one of `days`, `seconds`, `minutes`, `hours` |`seconds`|
| `operation`          | Define if the countdown will follow the clip's time or it'll operate freely and independently | `string`, one of `fixed` and `free` | `fixed`|
| `forceDoubleDigit`   | Make it true if you want to always have double digits in your fields. E.g. `01` instead of just `1` | `boolean` | `false` |
| `animatedAttrs.time` | Defines the target time of the countdown either via a unix timestamp in milliseconds or via providing the duration of the countdown in milliseconds. You don't need to specify which of the two you want, the plugin will figure it out automatically |`number`, always in milliseconds |         |