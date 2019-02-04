export function extractMinutes(time) {
  return Math.floor(time / 100 / 60);
}

export function extractSeconds(time) {
  const minutes = extractMinutes(time) * 100 * 60;

  return Math.floor((time - minutes) / 100);
}

export function extractMilliseconds(time) {
  const minutes = extractMinutes(time) * 100 * 60;
  const seconds = extractSeconds(time) * 100;

  return time - minutes - seconds;
}

export function format(time) {
  const minutes = (extractMinutes(time) + "").padStart(2, "0");
  const seconds = (extractSeconds(time) + "").padStart(2, "0");
  const milliseconds = (extractMilliseconds(time) + "").padStart(2, "0");

  return `${minutes}:${seconds}.${milliseconds}`;
}
