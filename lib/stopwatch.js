import { format } from "./TimerFormatter.js";

class Stopwatch {
  constructor() {
    this.precision = 10;

    this.timeElapsed = 0;
    this.interval = null;

    this.laps = [];
  }

  get isCounting() {
    return !!this.interval;
  }

  get elapsed() {
    return format(this.timeElapsed);
  }

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.timeElapsed++;
      }, this.precision);
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.stop();
    this.timeElapsed = 0;
    this.laps = [];
  }

  lap() {
    this.laps.push(this.elapsed);
    this.timeElapsed = 0;
  }
}

export default Stopwatch;
