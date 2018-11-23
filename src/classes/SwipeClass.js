import { DateClass } from '@Classes';

export default class SwipeClass extends Array {
  constructor() {
    super(...arguments);
  }

  static generateFromString(string) {
    return new SwipeClass(...string
      .split('\n')
      .filter(s => s.trim())
      .map(s => {
        const cols = s.split('\t');
        return {
          '#': cols[0],
          date: new DateClass(cols[1]),
          inout: cols[2],
          door: cols[3]
        }
      })
    )
  }

  getTimeTillLastOut() {
    let timeTillLastOut = 0;

    for (let i = 1; i < this.length; i += 1) {
      const swipe = this[i];
      if (swipe.inout === 'Out') {
        for (let j = i - 1; j >= 0; j -= 1) {
          const swipe2 = this[j];
          if (swipe2 && swipe2.inout === 'In') {
            timeTillLastOut += swipe.date.getTime() - swipe2.date.getTime();
            break;
          }
        }
      }
    }

    return timeTillLastOut;
  }

  getLastInSwipe() {
    let lastInSwipe = null;

    for (let i = this.length - 1; i >= 0; i -= 1) {
      const swipe = this[i];
      if (swipe.inout === 'In') {
        lastInSwipe = Object.assign({}, swipe);
        break;
      }
    }

    return lastInSwipe;
  }

  last() {
    return this[this.length - 1] || null;
  }

  validate() {
    const errors = [];

    if (this.length > 1) {
      for (let i = 1; i <= this.length - 1; i++) {
        if (this[i].inout === this[i - 1].inout) {
          errors.push(i + 1);
        }
      }
    }

    return errors.length ? errors : null;
  }
}