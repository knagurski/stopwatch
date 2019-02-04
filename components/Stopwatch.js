import Stopwatch from "../lib/stopwatch.js";

class StopwatchComponent extends HTMLElement {
  constructor() {
    super();

    this.stopwatch = new Stopwatch();
    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");
    this.wrapper.className = "wrapper";
    this.shadow.appendChild(this.wrapper);

    this.initDisplay();
    this.initLaps();

    this.initResetButton();
    this.initLapButton();
    this.initStartButton();
    this.initStopButton();

    this.manageButtons();
    this.updateDisplay();
    this.updateLaps();
  }

  initDisplay() {
    const styles = document.createElement("link");
    styles.href = "./components/Stopwatch.css";
    styles.rel = "stylesheet";

    this.wrapper.appendChild(styles);

    this.display = document.createElement("div");
    this.display.className = "display";
    this.wrapper.appendChild(this.display);
  }

  initLapButton() {
    const lapButton = document.createElement("button");
    lapButton.innerText = "Lap";
    lapButton.className = "lap";

    lapButton.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      this.stopwatch.lap();
      this.manageButtons();
      this.updateLaps();
    });

    this.wrapper.appendChild(lapButton);
    this.lapButton = lapButton;
  }

  initResetButton() {
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset";
    resetButton.className = "reset";

    resetButton.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      this.stopwatch.reset();
      this.updateDisplay();
      this.manageButtons();
      this.updateLaps();
    });

    this.wrapper.appendChild(resetButton);
    this.resetButton = resetButton;
  }

  initStopButton() {
    const stopButton = document.createElement("button");
    stopButton.innerText = "Stop";
    stopButton.className = "stop";

    stopButton.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      this.stopwatch.stop();
      this.manageButtons();
    });

    this.wrapper.appendChild(stopButton);
    this.stopButton = stopButton;
  }

  initStartButton() {
    const startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.className = "start";

    startButton.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      this.stopwatch.start();
      this.updateDisplay();
      this.manageButtons();
    });

    this.wrapper.appendChild(startButton);
    this.startButton = startButton;
  }

  updateDisplay() {
    this.display.innerText = this.stopwatch.elapsed;

    if (this.stopwatch.isCounting) {
      requestAnimationFrame(() => this.updateDisplay());
    }
  }

  manageButtons() {
    [
      this.startButton,
      this.stopButton,
      this.resetButton,
      this.lapButton
    ].forEach(btn => (btn.style.display = "none"));

    if (this.stopwatch.isCounting) {
      this.lapButton.style.display = "";
      this.lapButton.disabled = false;
      this.stopButton.style.display = "";
    } else if (this.stopwatch.timeElapsed !== 0) {
      this.resetButton.style.display = "";
      this.startButton.style.display = "";
    } else {
      this.lapButton.style.display = "";
      this.lapButton.disabled = true;
      this.startButton.style.display = "";
    }
  }

  initLaps() {
    this.laps = document.createElement("div");
    this.laps.className = "laps";

    this.wrapper.appendChild(this.laps);
  }

  updateLaps() {
    this.wrapper.classList.toggle("has-laps", !!this.stopwatch.laps.length);

    let fastest;
    let slowest;

    if (this.stopwatch.laps.length > 1) {
      const laps = this.stopwatch.laps.slice().sort();
      fastest = laps.shift();
      slowest = laps.pop();
    }

    const getSpeed = lapTime => {
      switch (lapTime) {
        case fastest:
          return "lap__row--fastest";
        case slowest:
          return "lap__row--slowest";
        default:
          return "";
      }
    };

    this.laps.innerHTML = this.stopwatch.laps
      .map((lapTime, lapNumber) => {
        return `
          <div class="lap__row ${getSpeed(lapTime)}">
            <div class="lap__number">Lap ${lapNumber + 1}</div>
            <div class="lap__time">${lapTime}</div>
          </div>
        `;
      })
      .reverse()
      .join("");
  }
}

window.customElements.define("stop-watch", StopwatchComponent);
