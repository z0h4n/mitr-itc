export default class DateClass extends Date {
  constructor() {
    super(...arguments);
  }

  toLocaleDateString() {
    const localeDateString = super.toLocaleDateString();
    return localeDateString.charAt(1) === '/' ? `0${localeDateString}` : localeDateString;
  }

  toLocaleTimeString() {
    const localeTimeString = super.toLocaleTimeString();
    return localeTimeString.charAt(1) === ':' ? `0${localeTimeString}` : localeTimeString;
  }

  toLocaleString() {
    return `${this.toLocaleDateString()}, ${this.toLocaleTimeString()}`;
  }

  toHHMMSS() {
    return DateClass.msecsToHHMMSS(super.getTime());
  }

  toHHMM() {
    return DateClass.msecsToHHMMSS(super.getTime(), true);
  }

  static msecsToHHMM(time = 0) {
    return DateClass.msecsToHHMMSS(time, true);
  }

  static msecsToHHMMSS(time = 0, hhmm) {
    const hours = time / DateClass.hrsToMsecs(1);
    const mins = (hours - parseInt(hours, 10)) * 60;
    const secs = (mins - parseInt(mins, 10)) * 60;
    return (hhmm ? [hours, mins] : [hours, mins, secs])
      .map(v => parseInt(v, 10).toString())
      .map(v => v.length < 2 ? `0${v}` : v)
      .join(':');
  }

  static hrsToMsecs(hrs) {
    return hrs * 60 * 60 * 1000;
  }
}