import { format } from "./TimerFormatter.js";

class Stopwatch {
  constructor() {
    this.timeElapsed = 0;
    this.startTime = null;

    this.laps = [];
  }

  get isCounting() {
    return !!this.startTime;
  }

  get elapsed() {
    if (this.isCounting) {
      this.timeElapsed += Date.now() - this.startTime;
      this.startTime = Date.now();
    }

    return format(this.timeElapsed);
  }

  start() {
    if (!this.isCounting) {
      this.startTime = Date.now();
    }
  }

  stop() {
    this.timeElapsed += Date.now() - this.startTime;
    this.startTime = null;
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
